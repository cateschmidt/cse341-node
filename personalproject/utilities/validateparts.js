// Parts Validation/error handling

const partsRules = () => {
    return [
        body("name").trim().escape().isLength({min:1}).withMessage("Error, please enter part name"),
        body("quantity").trim().escape().isLength({min:1}).withMessage("Error, please enter a quantity"),
        body("system").trim().escape().isLength({min:1}).withMessage("Error, please enter a valid system"),
        body("upc").trim().escape().isLength({min:1}).withMessage("Error, please enter a upc")
    ]
}

const partsValidate = (req, res, next) => {
    let errors = [];
    errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
        return
    }
    else {
        res.json(errors);
    }
}

module.exports = {partsRules, partsValidate};
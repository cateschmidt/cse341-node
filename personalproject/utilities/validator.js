const {body, validationResult} = require("express-validator");

// Boats validation and error handling

const boatsRules = () => {
    return [
        body("vesselName").trim().escape().isLength({min:1}).withMessage("Error, please enter vessel name"),
        body("vesselType").trim().escape().isLength({min:1}).withMessage("Error, please enter vessel type"),
        body("color").trim().escape().isLength({min:1}).withMessage("Error, please enter a color"),
        body("hin").trim().escape().isLength({min:1}).withMessage("Error, please enter a hin"),
        body("service").trim().escape().isLength({min:1}).withMessage("Error, please enter a service"),
        body("ownerEmail").trim().isEmail().withMessage("Error, please enter a valid email"),
        body("ownerName").trim().escape().isLength({min:1}).withMessage("Error, please enter a valid owner name")
    ]
}

const boatsValidate = (req, res, next) => {
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

module.exports = {boatsRules, boatsValidate,};

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

module.exports = {partsRules, partsValidate,};

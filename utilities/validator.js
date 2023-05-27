const {body, validationResult} = require("express-validator");

const contactsRules = () => {
    return [
        body("firstName").trim().escape().isLength({min:1}).withMessage("Error, please enter first name"),
        body("lastName").trim().escape().isLength({min:1}).withMessage("Error, please enter last name"),
        body("email").trim().isEmail().withMessage("Error, please enter a valid email"),
        body("favoriteColor").trim().escape().isLength({min:1}).withMessage("Error, please enter a valid color"),
        body("birthday").trim().escape().isLength({min:1}).withMessage("Error, please enter a valid birthday")
    ]
}

const contactsValidate = (req, res, next) => {
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

module.exports = {contactsRules, contactsValidate};
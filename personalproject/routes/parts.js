
const express = require('express');

const partsController = require('../controllers/parts');

const router = express.Router();

const {handleErrors} = require("../utilities/utilities.js");
const {partsValidate, partsRules} = require("../utilities/validator.js");

// GET /feed/posts
router.get('/', handleErrors(partsController.getAll));

router.get('/:id', handleErrors(partsController.getSingle));

router.post('/', partsRules(), partsValidate, partsController.createPart);

router.put('/:id', partsRules(), partsValidate, partsController.updatePart);

router.delete('/:id', handleErrors(partsController.deletePart));

// localhost:8080/professional/
module.exports = router;
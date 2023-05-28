
const express = require('express');

const boatsController = require('../controllers/boats');

const router = express.Router();

const {handleErrors} = require("../utilities/utilities.js");
const {boatsValidate, boatsRules} = require("../utilities/validator.js");

// GET /feed/posts
router.get('/', handleErrors(boatsController.getAll));

router.get('/:id', handleErrors(boatsController.getSingle));

router.post('/', boatsRules(), boatsValidate, boatsController.createBoat);

router.put('/:id', boatsRules(), boatsValidate, boatsController.updateBoat);

router.delete('/:id', handleErrors(boatsController.deleteBoat));

// localhost:8080/professional/
module.exports = router;

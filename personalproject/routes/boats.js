
const express = require('express');

const boatsController = require('../controllers/boats');

const router = express.Router();

// week 8
function isAuthenticated(req, res, next) {
    try {
      if (req.session.token) {
        next();
      } else {
        throw new Error("Please login");
      }
    } catch (error) {
      res.status(400).json({message: "Please login"});
    }
  }
//   Week 8

const {handleErrors} = require("../utilities/utilities.js");
const {boatsValidate, boatsRules} = require("../utilities/validator.js");

// GET /feed/posts
router.get('/', handleErrors(boatsController.getAll));

router.get('/:id', handleErrors(boatsController.getSingle));

router.post('/', isAuthenticated, boatsRules(), boatsValidate, boatsController.createBoat);

router.put('/:id', isAuthenticated, boatsRules(), boatsValidate, boatsController.updateBoat);

router.delete('/:id', isAuthenticated, handleErrors(boatsController.deleteBoat));

// localhost:8080/professional/
module.exports = router;


const express = require('express');

const partsController = require('../controllers/parts');

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
// week 8

const {handleErrors} = require("../utilities/utilities.js");
const {partsValidate} = require("../utilities/validateparts.js");

// GET /feed/posts
router.get('/', isAuthenticated, handleErrors(partsController.getAll));

router.get('/:id', isAuthenticated, handleErrors(partsController.getSingle));

router.post('/', isAuthenticated, partsValidate, partsController.createPart);

router.put('/:id', isAuthenticated, partsValidate, partsController.updatePart);

router.delete('/:id', isAuthenticated, handleErrors(partsController.deletePart));

// localhost:8080/professional/
module.exports = router;

const express = require('express');

const contactsController = require('../controllers/contacts');

const router = express.Router();

const {handleErrors} = require("../utilities/utilities.js");
const {contactsValidate, contactsRules} = require("../utilities/validator.js");

// GET /feed/posts
router.get('/', handleErrors(contactsController.getAll));

router.get('/:id', handleErrors(contactsController.getSingle));

router.post('/', contactsRules(), contactsValidate, handleErrors(contactsController.createContact));

router.put('/:id', handleErrors(contactsController.updateContact));

router.delete('/:id', handleErrors(contactsController.deleteContact));

// localhost:8080/professional/
module.exports = router;

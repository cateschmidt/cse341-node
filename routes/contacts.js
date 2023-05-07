const express = require('express');

const contactsController = require('../controllers/contacts');

const router = express.Router();

// GET /feed/posts
router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createContact);

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

// localhost:8080/professional/
module.exports = router;

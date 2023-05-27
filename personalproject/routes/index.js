const express = require('express');

const router = express.Router();
router.use('/', require('./swagger'))
router.use( '/boats', require('./boats'))
module.exports = router;
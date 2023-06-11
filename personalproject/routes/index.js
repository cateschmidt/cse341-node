const express = require('express');

const router = express.Router();
router.use('/', require('./swagger'))
router.use( '/boats', require('./boats'))
// Week 8
router.use('/inventory', require('./parts'));
// Week 8
module.exports = router;
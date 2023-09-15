// External dependencies
const express = require('express');

const router = express.Router();

// Discovery
router.use('/discovery', require('./views/discovery/_routes'));


module.exports = router;
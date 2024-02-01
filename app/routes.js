// External dependencies
const express = require('express');

const router = express.Router();

// Alpha

router.use('/mvp', require('./views/mvp/_routes'));
router.use('/mvp/file-upload', require('./views/mvp/file-upload/_routes'));
router.use('/mvp/download', require('./views/mvp/download/_routes'));

// router.use('/current', require('./views/current/_routes'));

router.use('/discovery', require('./views/discovery/_routes'));

module.exports = router;
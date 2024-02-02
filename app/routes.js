// External dependencies
const express = require('express');

const router = express.Router();

// Alpha

// router.use('/current', require('./views/current/_routes'));

router.use('/mvp', require('./views/mvp/_routes'));
router.use('/mvp/file-upload', require('./views/mvp/file-upload/_routes'));
router.use('/mvp/download-succes', require('./views/mvp/download-success/_routes'));
router.use('/mvp/download-unsucces', require('./views/mvp/download-unsuccess/_routes'));

router.use('/discovery', require('./views/discovery/_routes'));

module.exports = router;
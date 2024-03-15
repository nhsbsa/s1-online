// External dependencies
const express = require('express');

const router = express.Router();

// Alpha

// router.use('/current', require('./views/current/_routes'));

router.use('/mvp', require('./views/mvp/_routes'));
router.use('/v1/apply', require('./views/v1/apply/_routes'));
router.use('/v1/upload', require('./views/v1/upload/_routes'));

router.use('/v2/apply', require('./views/v2/apply/_routes'));
router.use('/v2/upload', require('./views/v2/upload/_routes'));


router.use('/mvp/file-upload', require('./views/mvp/file-upload/_routes'));
router.use('/mvp/download-success', require('./views/mvp/download-success/_routes'));
router.use('/mvp/download-unsuccess', require('./views/mvp/download-unsuccess/_routes'));

router.use('/discovery', require('./views/discovery/_routes'));

router.get('/data', function (req, res) {
    console.log(req.session.data);
    return res.render('data', {data: req.session.data});
})



module.exports = router;
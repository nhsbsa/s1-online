const express = require('express')
const router = express.Router()

// const axios = require('axios');


//// Alpha S1 V.2 /////
//////////////////////

//// Evidence File Upload

// What is your OHS reference number?
router.post([/ohs-number/, /ohs-number-error/, /ohs-number-invalid/], function (req, res) {
    var ohs = req.session.data['ohs'];
    const ohsRegEx = /^[0-9]{8}$/;

    if (ohs == '') {
        res.redirect('ohs-number-error');
    }
    else if (ohs != '' && !ohsRegEx.test(ohs)){
        res.redirect('ohs-number-invalid');
    }
    else if (ohs != '' && ohsRegEx.test(ohs)) {
        res.redirect('full-name');
    }
})

// What is your name?
router.post([/full-name/, /full-name-first-error/, /full-name-last-error/, /full-name-error/], function (req, res) {
    var first = req.session.data['upload-firstname'];
    var last = req.session.data['upload-lastname'];

    if (first != '' && last != '') {
        res.redirect('../download/upload-dob');
    }
    else if (first == '' && last != ''){
        res.redirect('full-name-first-error');
    }
    else if (first != '' && last == ''){
        res.redirect('full-name-last-error');
    }
    else if (first == '' && last == ''){
        res.redirect('full-name-error');
    }
})

// What is your date of birth?
router.post([/upload-dob/, /upload-dob-error/, /upload-dob-day-error/, /upload-dob-day-month-error/, /upload-dob-month-error/, /upload-dob-month-year-error/, /upload-dob-day-year-error/, /upload-dob-year-error/], function (req, res) {
    const day = req.session.data['upload-day'];
    const month = req.session.data['upload-month'];
    const year =req.session.data['upload-year'];

    var yearRegEx = /^(19[1-9][0-9])$/;            ///< Allows a number between 1910 and 1999
    var monthRegEx = /^(0?[1-9]|1[0-2])$/;               ///< Allows a number between 00 and 12
    var dayRegEx = /^(0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/;   ///< Allows a number between 00 and 31

    if(day === '' && month === '' && year === '') {
        res.redirect('upload-dob-error');
    } else if(day === '' && month !== '' && year !== ''){
        res.redirect('upload-dob-day-error');
    } else if(day === '' && month === '' && year !== ''){
        res.redirect('upload-dob-day-month-error');
    } else if(day === '' && month !== '' && year === ''){
        res.redirect('upload-dob-day-year-error');
    } else if(day !== '' && month !== '' && year === ''){
        res.redirect('upload-dob-year-error');
    } else if(day !== '' && !dayRegEx.test(day) && month !== '' && !monthRegEx.test(month) && year !== '' && !yearRegEx.test(year)) {
        res.redirect('upload-dob-error');
    } else if(day !== '' && !dayRegEx.test(day) && month !== '' && monthRegEx.test(month) && year !== '' && yearRegEx.test(year)) {
        res.redirect('upload-dob-day-error');
    } else if(day !== '' && !dayRegEx.test(day) && month !== '' && !monthRegEx.test(month) && year !== '' && yearRegEx.test(year)) {
        res.redirect('upload-dob-day-month-error');
    } else if(day !== '' && dayRegEx.test(day) && month !== '' && !monthRegEx.test(month) && year !== '' && yearRegEx.test(year)) {
        res.redirect('upload-dob-month-error');
    } else if(day !== '' && dayRegEx.test(day) && month !== '' && !monthRegEx.test(month) && year !== '' && !yearRegEx.test(year)) {
        res.redirect('upload-dob-month-year-error');
    } else if(day !== '' && !dayRegEx.test(day) && month !== '' && monthRegEx.test(month) && year !== '' && !yearRegEx.test(year)) {
        res.redirect('upload-dob-day-year-error');
    } else if(day !== '' && dayRegEx.test(day) && month !== '' && monthRegEx.test(month) && year !== '' && !yearRegEx.test(year)) {
        res.redirect('upload-dob-year-error');
    } else if(req.body.dateOfBirth !== '' && dayRegEx.test(day) && monthRegEx.test(month) && yearRegEx.test(year)) {
        res.redirect('../download/nino');
    }   
})

// What is your National Insurance number? 

router.post([/nino/, /nino-error/], function (req,res) {

    const ninoRegEx = /^(?!BG)(?!GB)(?!NK)(?!KN)(?!TN)(?!NT)(?!ZZ)(?:[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z])(?:\s*\d\s*){6}([A-D]|\s)$/;

    if (req.body.nino == ''){
        res.redirect('nino-error');
    } else if(req.body.nino !== '' && !ninoRegEx.test(req.body.nino)) {
        res.redirect('nino-error');
    } else if (req.body.nino !== '' && ninoRegEx.test(req.body.nino)){
        res.redirect('../download/application-outcome-found');
    } 
})

module.exports = router;
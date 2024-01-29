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
        res.redirect('dob');
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
router.post([/dob/, /dob-error/, /dob-day-error/, /dob-day-month-error/, /dob-month-error/, /dob-month-year-error/, /dob-day-year-error/, /dob-year-error/], function (req, res) {
    const day = req.session.data['upload-day'];
    const month = req.session.data['upload-month'];
    const year =req.session.data['upload-year'];

    var yearRegEx = /^(19[1-9][0-9])$/;            ///< Allows a number between 1910 and 1999
    var monthRegEx = /^(0?[1-9]|1[0-2])$/;               ///< Allows a number between 00 and 12
    var dayRegEx = /^(0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/;   ///< Allows a number between 00 and 31

    if(day === '' && month === '' && year === '') {
        res.redirect('dob-error');
    } else if(day === '' && month !== '' && year !== ''){
        res.redirect('dob-day-error');
    } else if(day === '' && month === '' && year !== ''){
        res.redirect('dob-day-month-error');
    } else if(day === '' && month !== '' && year === ''){
        res.redirect('dob-day-year-error');
    } else if(day !== '' && month !== '' && year === ''){
        res.redirect('dob-year-error');
    } else if(day !== '' && !dayRegEx.test(day) && month !== '' && !monthRegEx.test(month) && year !== '' && !yearRegEx.test(year)) {
        res.redirect('dob-error');
    } else if(day !== '' && !dayRegEx.test(day) && month !== '' && monthRegEx.test(month) && year !== '' && yearRegEx.test(year)) {
        res.redirect('dob-day-error');
    } else if(day !== '' && !dayRegEx.test(day) && month !== '' && !monthRegEx.test(month) && year !== '' && yearRegEx.test(year)) {
        res.redirect('dob-day-month-error');
    } else if(day !== '' && dayRegEx.test(day) && month !== '' && !monthRegEx.test(month) && year !== '' && yearRegEx.test(year)) {
        res.redirect('dob-month-error');
    } else if(day !== '' && dayRegEx.test(day) && month !== '' && !monthRegEx.test(month) && year !== '' && !yearRegEx.test(year)) {
        res.redirect('dob-month-year-error');
    } else if(day !== '' && !dayRegEx.test(day) && month !== '' && monthRegEx.test(month) && year !== '' && !yearRegEx.test(year)) {
        res.redirect('dob-day-year-error');
    } else if(day !== '' && dayRegEx.test(day) && month !== '' && monthRegEx.test(month) && year !== '' && !yearRegEx.test(year)) {
        res.redirect('dob-year-error');
    } else if(req.body.dateOfBirth !== '' && dayRegEx.test(day) && monthRegEx.test(month) && yearRegEx.test(year)) {
        res.redirect('evidence');
    }   
})

// // Do you live in the UK? - uk-address.html
// router.post(/uk-address/, function (req, res) {
//     var ukAddress = req.session.data['ukAddress']

//     if (ukAddress == "Yes") {
//       res.redirect('address-lookup')
//     }
//     else if (ukAddress == "No") {
//       res.redirect('address-eu')
//     }
//     else {
//       res.redirect('uk-address')
//     }
//   })

// Do you have the evidence we asked for? - evidence.html
router.post([/evidence/, /evidence-error/], function (req, res) {
    var evidenceYN = req.session.data['evidenceYn'];

    if (evidenceYN == "Yes") {
        res.redirect('provide-eea-pension-evid');
    }
    else if (evidenceYN == "No") {
        res.redirect('additional-info');
    }
    else if (evidenceYN == '') {
        res.redirect('evidence-error');
    }
})

// If you cannot provide the evidence we asked for, tell us why
router.post([/additional-info/, /additional-info-error/], function (req, res) {
    var addInfo = req.session.data['addInfo'];

    if (addInfo == '') {
        res.redirect('additional-info-error');
    }
    else if (addInfo != '') {
        res.redirect('cya-1');
    }
})

router.get(/cya-1/, function (req, res) {

    //Date of birth
    const year = req.session.data['upload-year'];
    const month = req.session.data['upload-month'];
    const day = req.session.data['upload-day'];
    const formatDob = day + '/' + month + '/' + year;

    console.log(formatDob);

    if(year){
        console.log(formatDob);

        var dobDate = new Date(formatDob.split('/')[2], formatDob.split('/')[1] - 1, formatDob.split('/')[0]);
        console.log(dobDate);

        // Convert format
        const dobOptions = { year: 'numeric', month: 'long', day: 'numeric' };

        const dobDateTimeFormat = new Intl.DateTimeFormat('en-GB', dobOptions);
        var uploadDobDateFormatted = dobDateTimeFormat.format(dobDate);
        console.log(uploadDobDateFormatted);
    }

    res.render('mvp/file-upload/cya-1', { uploadDobDateFormatted: uploadDobDateFormatted });
})

router.get(/cya-eea/, function (req, res) {

    //Date of birth
    const year = req.session.data['upload-year'];
    const month = req.session.data['upload-month'];
    const day = req.session.data['upload-day'];
    const formatDob = day + '/' + month + '/' + year;

    if(year){
        console.log(formatDob);

        var dobDate = new Date(formatDob.split('/')[2], formatDob.split('/')[1] - 1, formatDob.split('/')[0]);
        console.log(dobDate);

        // Convert format
        const dobOptions = { year: 'numeric', month: 'long', day: 'numeric' };

        const dobDateTimeFormat = new Intl.DateTimeFormat('en-GB', dobOptions);
        var uploadDobDateFormatted = dobDateTimeFormat.format(dobDate);
        console.log(uploadDobDateFormatted);
    }

    res.render('mvp/file-upload/cya-eea', { uploadDobDateFormatted: uploadDobDateFormatted });
})

router.get(/cya-uk/, function (req, res) {

    //Date of birth
    const year = req.session.data['upload-year'];
    const month = req.session.data['upload-month'];
    const day = req.session.data['upload-day'];
    const formatDob = day + '/' + month + '/' + year;

    console.log(formatDob);

    if(year){
        console.log(formatDob);

        var dobDate = new Date(formatDob.split('/')[2], formatDob.split('/')[1] - 1, formatDob.split('/')[0]);
        console.log(dobDate);

        // Convert format
        const dobOptions = { year: 'numeric', month: 'long', day: 'numeric' };

        const dobDateTimeFormat = new Intl.DateTimeFormat('en-GB', dobOptions);
        var uploadDobDateFormatted = dobDateTimeFormat.format(dobDate);
        console.log(uploadDobDateFormatted);
    }

    res.render('mvp/file-upload/cya-uk', { uploadDobDateFormatted: uploadDobDateFormatted });
})

// Have you been asked to give evidence for the years you paid pension contributions to the UK or to other countries?
router.post([/provide-eea-pension-evid/, /provide-eea-pension-evid-error/], function (req, res) {
    var provideEEAPensEvid = req.session.data['provideEEAPensEvid'];

    if (provideEEAPensEvid == "Yes") {
        res.redirect('eea-countries');
    } else if (provideEEAPensEvid == "No") {
        res.redirect('provide-uk-pension-evid');
    } else if (provideEEAPensEvid == "") {
        res.redirect('provide-eea-pension-evid-error');
    }
})

// Which countries have you been asked to give evidence for, other than the UK?
router.post([/eea-countries/, /eea-countries-error/], function (req, res) {
    var eeaCountries = req.session.data['eeaCountries'];
    console.log(eeaCountries);

    if (eeaCountries == 'Iceland' || eeaCountries == 'Liechtenstein' || eeaCountries == 'Norway' || eeaCountries == 'Switzerland') {
        res.redirect('upload-eea-evidence');
    } else if (eeaCountries == 'Austria' || eeaCountries == 'Belgium' || eeaCountries == 'Bulgaria' || eeaCountries == 'Denmark') {
        res.redirect('upload-eea-evidence');
    } else if (eeaCountries == 'Czech Republic' || eeaCountries == 'Estonia' || eeaCountries == 'Finland' || eeaCountries == 'France') {
        res.redirect('upload-eea-evidence');
    } else if (eeaCountries == 'Germany' || eeaCountries == 'Greece' || eeaCountries == 'Hungary' || eeaCountries == 'Ireland' || eeaCountries == 'Italy') {
        res.redirect('upload-eea-evidence');
    } else if (eeaCountries == 'Latvia' || eeaCountries == 'Lithuania' || eeaCountries == 'Luxemburg' || eeaCountries == 'Malta' || eeaCountries == 'Montenegro') {
        res.redirect('upload-eea-evidence');
    } else if (eeaCountries == 'Netherlands' || eeaCountries == 'Poland' || eeaCountries == 'Portugal' || eeaCountries == 'Romania' || eeaCountries == 'Slovakia') {
        res.redirect('upload-eea-evidence');
    } else if (eeaCountries == 'Slovenia' || eeaCountries == 'Spain' || eeaCountries == 'Sweden') {
        res.redirect('upload-eea-evidence');
    } else if (eeaCountries == '') {
        res.redirect('eea-countries-error');
    } 
})

// Have you been asked to give evidence that you paid a UK State Pension?
router.post([/provide-uk-pension-evid/, /provide-uk-pension-evid-error/], function (req, res) {
    var provideUKPensEvid = req.session.data['provideUKPensEvid'];

    if (provideUKPensEvid == "Yes") {
        res.redirect('upload-uk-evidence');
    } else if (provideUKPensEvid == "No") {
        res.redirect('cya-uk');
    } else if (provideUKPensEvid == '') {
        res.redirect('provide-uk-pension-evid-error');
    }
})

//    // Do you need to add more evidence for [first name]'s paid State Pension contributions in EEA countries or Switzerland?
// router.post([/upload-eea-evidence/, /upload-eea-evidence-error/], function (req, res) {
//     var addEvidEEA = req.session.data['addEvidEEA'];

//     if (addEvidEEA == "Yes") {
//       res.redirect('upload-eea-evidence-another');
//     } else if (addEvidEEA == "No") {
//       res.redirect('cya')
//     } else if (addEvidEEA == "") {
//       res.redirect('upload-eea-evidence-another-error');
//     }
//   })


//   // Do you need to add more evidence for [first name]'s paid UK State Pension contributions?
// router.post([/upload-uk-evidence-another/,/upload-uk-evidence-another-error/], function (req, res) {
//     var addEvidUK = req.session.data['addEvidUK'];

//     if (addEvidUK == "Yes") {
//       res.redirect('upload-uk-evidence-another-two');
//     } else if (addEvidUK == "No") {
//       res.redirect('cya')
//     } else if (addEvidUK == ""){
//       res.redirect('upload-uk-evidence-another-error');
//     }
//   })

// // Do you need to add more evidence for [first name]'s paid UK State Pension contributions?
// router.post([/upload-uk-evidence-another-two/, /upload-uk-evidence-another-two-error/], function (req, res) {
//     var addEvidUKTwo = req.session.data['addEvidUKTwo'];

//     if (addEvidUKTwo == "Yes") {
//       res.redirect('upload-uk-evidence-another-two');
//     } else if (addEvidUKTwo == "No") {
//       res.redirect('cya');
//     } else if (addEvidUKTwo == "") {
//       res.redirect('upload-uk-evidence-another-two-error');
//     }
//   })

//  // Do you need to add more evidence for [first name]'s paid State Pension contributions in EEA countries or Switzerland?
// router.post([/upload-eea-evidence-another/, /upload-eea-evidence-another-error/], function (req, res) {
//     var addEvidEEA = req.session.data['addEvidEEA'];

//     if (addEvidEEA == "Yes") {
//       // res.redirect('upload-reside')
//       res.redirect('upload-eea-evidence-another-two')
//     } else if (addEvidEEA == "No") {
//       res.redirect('cya')
//     } else if (addEvidEEA == "") {
//       res.redirect('upload-eea-evidence-another-error')
//     }
//   })

//    // Do you need to add more evidence for [first name]'s paid State Pension contributions in EEA countries or Switzerland?
// router.post([/upload-eea-evidence-another-two/, /upload-eea-evidence-another-two-error/], function (req, res) {
//     var addEvidEEATwo = req.session.data['addEvidEEATwo'];

//     if (addEvidEEATwo == "Yes") {
//       res.redirect('upload-eea-evidence-another-two');
//     } else if (addEvidEEATwo == "No") {
//       res.redirect('cya')
//     } else if (addEvidEEATwo == "") {
//       res.redirect('upload-eea-evidence-another-two-error');
//     }
//   })



////////////////////// 

// //Do you receive your UK State pension, or will you receive this within the next 90 days?
// router.post('/route-uk-state-pension', function(req,res){
//     var answer = req.session.data['uk-state-pension']
//     if (answer == "yes"){
//         res.redirect('/discovery/apply/eligibility-other-state-pension')
//     }
//     else if (answer == "no"){
//         res.redirect('/discovery/apply/eligibility-kick-out')
//     }
//     else {
//         res.redirect('/discovery/apply/eligibility-uk-state-pension')
//     }

// })

// //Do you get a state pension from a EEA country or Switzerland?
// router.post('/route-other-state-pension', function(req,res){
//     var answer = req.session.data['other-state-pension']
//     if (answer == "yes"){
//         res.redirect('/discovery/apply/eligibility-other-state-pension-amount')
//     }
//     else if (answer == "no"){
//         res.redirect('/discovery/apply/eligibility-country')
//     }
//     else {
//         res.redirect('/discovery/apply/eligibility-other-state-pension')
//     }

// })

// //Is this pension more than that state pension received from the UK?
// router.post('/route-other-state-pension-amount', function(req,res){
//     var answer = req.session.data['other-state-pension-amount']
//     if (answer == "yes"){
//         res.redirect('/discovery/apply/eligibility-kick-out')
//     }
//     else if (answer == "no"){
//         res.redirect('/discovery/apply/eligibility-country')
//     }
//     else {
//         res.redirect('/discovery/apply/eligibility-other-state-pension-amount')
//     }

// })

// //Have you already moved to country?
// router.post('/route-move-check', function(req,res){
//     var answer = req.session.data['move-check']
//     if (answer == "yes"){
//         res.redirect('/discovery/apply/eligibility-move-date')
//     }
//     else if (answer == "no"){
//         res.redirect('/discovery/apply/eligibility-move-date-plan')
//     }
//     else {
//         res.redirect('/discovery/apply/eligibility-move-check')
//     }

// })

// //Is this the applicants correspondence address?
// router.post('/route-applicant-correspondence-address', function(req,res){
//     var answer = req.session.data['correspondence-address']
//     if (answer == "yes"){
//         res.redirect('/discovery/apply/applicant-email')
//     }
//     else if (answer == "no"){
//         res.redirect('/discovery/apply/applicant-correspondence-address')
//     }
//     else {
//         res.redirect('/discovery/apply/applicant-correspondence-address-check')
//     }

// })

// //Does the applicant want to add any dependants?
// router.post('/route-dependants-check', function(req,res){
//     var answer = req.session.data['dependants-check']
//     if (answer == "yes"){
//         res.redirect('/discovery/apply/dependant-name')
//     }
//     else if (answer == "no"){
//         res.redirect('/discovery/apply/physical-copy')
//     }
//     else {
//         res.redirect('/discovery/apply/dependant-check')
//     }

// })

// //Does the dependant live at the same address as the applicant?
// router.post('/route-dependant-addres-check', function(req,res){
//     var answer = req.session.data['depenant-address-check']
//     if (answer == "yes"){
//         res.redirect('/discovery/apply/dependant-check-more')
//     }
//     else if (answer == "no"){
//         res.redirect('/discovery/apply/dependant-address')
//     }
//     else {
//         res.redirect('/discovery/apply/dependant-address-check')
//     }

// })

// //Does the applicant want to add another dependant?
// router.post('/route-dependant-check-more', function(req,res){
//     var answer = req.session.data['dependants-check']
//     if (answer == "yes"){
//         res.redirect('/discovery/apply/dependant-name')
//     }
//     else if (answer == "no"){
//         res.redirect('/discovery/apply/dependant-cya')
//     }
//     else {
//         res.redirect('/discovery/apply/dependant-check-more')
//     }

// })

module.exports = router
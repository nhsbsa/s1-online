const express = require('express')
const router = express.Router()



//// Evidence File Upload

/// start of upload journey
router.post([/start-page/], function (req,res) {
    res.redirect('ohs-number') 
})

// What is your OHS reference number?

router.post([/ohs-number/], function (req,res) {
    
    var ohsNumber = req.session.data['ohsNumber'];
    const data = req.session.data;


    if(ohsNumber != '' ) {
        data.error = 'false';
        res.redirect('full-name');
    } else if(ohsNumber == '') {
        data.error = 'true';
        res.redirect('ohs-number');
    }
})


// What is your name?
router.post([/full-name/], function (req, res) {
    var first = req.session.data['upload-firstname'];
    var last = req.session.data['upload-lastname'];
    const data = req.session.data;

    if (first != '' && last != '') {
        data.applicantName = `${req.body['upload-firstname']} ${req.body['upload-lastname']}`
        data.error = 'false';
        res.redirect('dob');
    }
 
    else if (first == '' && last == ''){
        data.error = 'true';
        res.redirect('full-name');
    }
})

// What is your date of birth?
router.post([/dob/], function (req, res) {
    const day = req.session.data['upload-day'];
    const month = req.session.data['upload-month'];
    const year =req.session.data['upload-year']; 
    const data = req.session.data;
    data.applicantDob =  `${req.body['upload-day']} ${req.body['upload-month']}  ${req.body['upload-year']}`

    // Convert numerical month to letters
    const monthInLetters = getMonthInLetters(month);

    // Set the applicantDob in the desired format
    req.session.data['applicantDob'] = `${day} ${monthInLetters} ${year}`;

    if(day === '' && month === '' && year === '') {
        data.error = 'true';
        res.redirect('dob');
    } else if (parseInt(year) > 1975) { // Check if dateOfBirth is after 1975
        res.redirect('nino');
    } else if(req.body.dateOfBirth !== '' ) {
        data.error = 'false';
        res.redirect('nino');
    }   
}) 

// Function to convert numerical month to letters
function getMonthInLetters(month) {
    const monthsInLetters = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Ensure the month is a valid number between 1 and 12
    const numericMonth = parseInt(month, 10);
    if (numericMonth >= 1 && numericMonth <= 12) {
        return monthsInLetters[numericMonth - 1];
    }

    // If the month is not valid, return an empty string or handle accordingly
    return '';
}

router.post([/nino/], function (req,res) {
    res.redirect('split-check-your-answers') 
})

router.post([/split-check-your-answers/], function (req,res) {
    const day = req.session.data['upload-day'];
    const month = req.session.data['upload-month'];
    const year =req.session.data['upload-year']; 
    var split = req.session.data['split-check-your-answers'];
    const data = req.session.data;
    data.applicantDob =  `${req.body['upload-day']} ${req.body['upload-month']}  ${req.body['upload-year']}`
    const monthInLetters = getMonthInLetters(month);

    req.session.data['applicantDob'] = `${day} ${monthInLetters} ${year}`;
   
    if (parseInt(year) > 1975) { // Check if dateOfBirth is after 1975
        res.redirect('split-record-not-found');
    } else if(split != '' ) {
        data.error = 'false';
        res.redirect('upload-file');
    } else if(split == '') {
        data.error = 'true';
        res.redirect('split-check-your-answers');
    }
})


router.post([/record-found/], function (req,res) {
    res.redirect('upload-file') 
})
router.post([/upload-file/], function(req, res) {
    const data = req.session.data;

    const file = req.session.data['hiddenFileChosen1'];

    if(file != '' ) {
        data.error = 'false';
        res.redirect('review-file');
    } else if(file == '') {
        data.error = 'true';
        res.redirect('upload-file');
    }
});
router.post([/upload-another-file/], function(req, res) {
    res.redirect('review-file');
});

router.post([/review-file/], function (req,res) {
    
    var moreEvidence = req.session.data['moreEvidenceCheck'];
    const data = req.session.data;


    if (moreEvidence == 'Yes'){
        data.error = 'false';
        res.redirect('upload-another-file');
    } else if (moreEvidence == 'No'){
        data.error = 'false';
        res.redirect('check-your-answers');
    } else if (!moreEvidence ){
        data.error = 'true';
        res.redirect('review-file');
    }
})

router.post([/upload-evidence/], function (req,res) {
    res.redirect('check-your-answers') 
})

router.post([/check-your-answers/], function (req,res) {
    res.redirect('confirmation') 
})

module.exports = router
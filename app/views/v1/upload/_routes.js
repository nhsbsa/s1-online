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

    } else if(req.body.dateOfBirth !== '' ) {
        data.error = 'false';
        res.redirect('have-evidence');
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


// Do you have the evidence we asked for? - evidence.html
router.post([/have-evidence/], function (req, res) {
    var evidence = req.session.data['evidence'];
    const data = req.session.data;

    if(evidence == 'Yes') {
        data.error = 'false';
        res.redirect('provide-eea-pension-evid');
    } else if(evidence == 'No') {
        data.error = 'false';
        res.redirect('additional-info');
    } else {
        data.error = 'true';
        res.redirect('evidence');
    }
})
 
// If you cannot provide the evidence we asked for, tell us why
router.post([/additional-info/], function (req, res) {
    var addInfo = req.session.data['addInfo'];
    const data = req.session.data;

    if (addInfo == '') {
        data.error = 'true';
        res.redirect('additional-info');
    }
    else if (addInfo != '') {
        data.error = 'false';
        res.redirect('check-your-answers');
    }
})




// Have you been asked to give evidence for the years you paid pension contributions to the UK or to other countries?
router.post([/provide-eea-pension-evid/], function (req, res) {
    var provideEEAPensEvid = req.session.data['provideEEPensEvid'];
    const data = req.session.data;

    if(provideEEAPensEvid == 'Yes') {
        data.error = 'false';
        res.redirect('eea-countries');
    } else if(provideEEAPensEvid == 'No') {
        data.error = 'false';
        res.redirect('provide-uk-pension-evid');
    } else {
        data.error = 'true';
        res.redirect('provide-eea-pension-evid');
    }
})

// // Which countries have you been asked to give evidence for, other than the UK?
// router.post([/eea-countries/, /eea-countries-error/], function (req, res) {
//     var eeaCountries = req.session.data['eeaCountries'];
//     console.log(eeaCountries);

//     if (eeaCountries == 'Iceland' || eeaCountries == 'Liechtenstein' || eeaCountries == 'Norway' || eeaCountries == 'Switzerland') {
//         res.redirect('upload-eea-evidence');
//     } else if (eeaCountries == 'Austria' || eeaCountries == 'Belgium' || eeaCountries == 'Bulgaria' || eeaCountries == 'Denmark') {
//         res.redirect('upload-eea-evidence');
//     } else if (eeaCountries == 'Czech Republic' || eeaCountries == 'Estonia' || eeaCountries == 'Finland' || eeaCountries == 'France') {
//         res.redirect('upload-eea-evidence');
//     } else if (eeaCountries == 'Germany' || eeaCountries == 'Greece' || eeaCountries == 'Hungary' || eeaCountries == 'Ireland' || eeaCountries == 'Italy') {
//         res.redirect('upload-eea-evidence');
//     } else if (eeaCountries == 'Latvia' || eeaCountries == 'Lithuania' || eeaCountries == 'Luxemburg' || eeaCountries == 'Malta' || eeaCountries == 'Montenegro') {
//         res.redirect('upload-eea-evidence');
//     } else if (eeaCountries == 'Netherlands' || eeaCountries == 'Poland' || eeaCountries == 'Portugal' || eeaCountries == 'Romania' || eeaCountries == 'Slovakia') {
//         res.redirect('upload-eea-evidence');
//     } else if (eeaCountries == 'Slovenia' || eeaCountries == 'Spain' || eeaCountries == 'Sweden') {
//         res.redirect('upload-eea-evidence');
//     } else if (eeaCountries == '') {
//         res.redirect('eea-countries-error');
//     } 
// })

// Have you been asked to give evidence that you paid a UK State Pension?
router.post([/provide-uk-pension-evid/], function (req, res) {

var provideUKPensEvid = req.session.data['provideUKPensEvid'];
const data = req.session.data;

if(provideUKPensEvid == 'Yes') {
    data.error = 'false';
    res.redirect('upload-uk-evidence');
} else if(provideUKPensEvid == 'No') {
    data.error = 'false';
    res.redirect('check-your-answers');
} else {
    data.error = 'true';
    res.redirect('provide-uk-pension-evid');
}
})

// Upload evidence that you are being paid a UK State Pension
router.post([/upload-uk-evidence/], function (req,res) {
    res.redirect('check-your-answers') 
})
// Upload evidence that you are being paid a UK State Pension
router.post([/eea-countries/], function (req,res) {
    res.redirect('upload-ee-evidence') 
})
// Upload evidence that you are being paid a UK State Pension
router.post([/upload-ee-evidence/], function (req,res) {
    res.redirect('check-your-answers') 
})


router.post([/check-your-answers/], function (req,res) {
    res.redirect('confirmation') 
})
module.exports = router
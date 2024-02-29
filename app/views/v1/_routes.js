const express = require('express')
const router = express.Router()

// const axios = require('axios');


//// Alpha S1 V.2 /////
//////////////////////



// 	Are you permanently living or moving outside the UK?
router.post([/eligibility-country-check/], function(req, res){
    var liveEU = req.session.data['liveEU'];
    const data = req.session.data
    
    if (liveEU == 'Yes'){
        data.error = 'false'
        res.redirect('eligibility-country');
    } else if (liveEU == 'No'){
        data.error = 'false'
        data.ineligible = 'country-check-fail'
        res.redirect('ineligible');
    } else {
        data.error = 'true'
        res.redirect('eligibility-country-check');
    }
})




//  Which country do you need an S1 for?

router.post([/eligibility-country/], function (req, res){
    var countrySOne = req.session.data['countrySOne'];
    console.log(countrySOne);
    const data = req.session.data

    if (countrySOne == 'Iceland' || countrySOne == 'Liechtenstein' || countrySOne == 'Norway' || countrySOne == 'Switzerland') {
        data.error = 'false';
        res.redirect('kickout/ineligible-efta-country-kickout');
    } if (countrySOne == 'Austria' || countrySOne == 'Belgium' || countrySOne == 'Bulgaria' || countrySOne == 'Denmark') {
        data.error = 'false';
        res.redirect('eligibility-move-check');
    } if (countrySOne == 'Czech Republic' || countrySOne == 'Estonia' || countrySOne == 'Finland' || countrySOne == 'France') {
        data.error = 'false'; 
        res.redirect('eligibility-move-check');
    } if (countrySOne == 'Germany' || countrySOne == 'Greece' || countrySOne == 'Hungary' || countrySOne == 'Ireland' || countrySOne == 'Italy') {
        data.error = 'false';
        res.redirect('eligibility-move-check');
    } if (countrySOne == 'Latvia' || countrySOne == 'Lithuania' || countrySOne == 'Luxemburg' || countrySOne == 'Malta' || countrySOne == 'Montenegro') {
        data.error = 'false';
        res.redirect('eligibility-move-check');
    }  if (countrySOne == 'Netherlands' || countrySOne == 'Poland' || countrySOne == 'Portugal' || countrySOne == 'Romania' || countrySOne == 'Slovakia') {
        data.error = 'false';
        res.redirect('eligibility-move-check');
    }  if (countrySOne == 'Slovenia' || countrySOne == 'Spain' || countrySOne == 'Sweden') {
        data.error = 'false';
        res.redirect('eligibility-move-check');
    }  if (countrySOne == '') {
        data.error = 'true',
        res.redirect('eligibility-country');
    } else {
         data.error = 'false';
        data.ineligible = 'country-fail'
       res.redirect('ineligible');
    }
})

// Do you already live in [Country]?

router.post([/eligibility-move-check/], function(req, res){
    var moveCheck = req.session.data['moveCheck'];
    const data = req.session.data

    if (moveCheck == 'Yes') {
        data.error = 'false'
        res.redirect('eligibility-move-date');
    } else if (moveCheck == 'No') {
        data.error = 'false'
        res.redirect('eligibility-move-date-plan');
    } else if (!moveCheck){
        data.error = 'true'
        res.redirect('eligibility-move-check');
    }
})

// When will you move to [Country] ?

router.post([/eligibility-move-date-plan/], function (req, res){
    const data = req.session.data

    // Get the Move Date values from the (dd / mm / yyyy) separate date inputs 
    var day = req.session.data['futureDay'];
    var month = req.session.data['futureMonth'];
    var year = req.session.data['futureYear'];

    req.session.data['futureDate'] = `${req.body['futureDay']} ${req.body['futureMonth']} ${req.body['futureYear']}`

    // Convert numerical month to letters
    const monthInLetters = getMonthInLetters(month);

    // Set the applicantDob in the desired format
    req.session.data['futureDate'] = `${day} ${monthInLetters} ${year}`;

    if (day == '' && month == '' && year == '' ) {
        data.error = 'true'
        res.redirect('eligibility-move-date-plan');
    } else { 
        data.error = 'false'
        res.redirect('eligibility-uk-state-pension');
    }

})





router.post([/eligibility-move-date/], function (req, res){

    // Get the Move Date values from the (dd / mm / yyyy) separate date inputs 
    var day = req.session.data['moveDay'];
    var month = req.session.data['moveMonth'];
    var year = req.session.data['moveYear'];
    const data = req.session.data
    req.session.data['moveDate'] = `${req.body['moveDay']} ${req.body['moveMonth']} ${req.body['moveYear']}`
    // Convert numerical month to letters
    const monthInLetters = getMonthInLetters(month);

    // Set the applicantDob in the desired format
    req.session.data['moveDate'] = `${day} ${monthInLetters} ${year}`;

 
    if (day == '' && month == '' && year == '') {
        data.error = 'true';
        res.redirect('eligibility-move-date');
    } else {
        data.error = 'false';
        res.redirect('eligibility-uk-state-pension');
    }
})
 


// Are you already living in [Country]?

router.post([/eligibility-move-check/], function (req, res){
    var moveCheck = req.session.data['moveCheck'];

    if (moveCheck == 'Yes') {
        res.redirect('eligibility-move-date');
    } if (moveCheck == 'No') {
        res.redirect('eligibility-move-date-plan');
    } else {
        res.redirect('eligibility-move-check-error');
    }

})



// Are you being paid a UK State Pension, or will you be paid your UK State Pension before [90 days from today]?

router.post([/eligibility-uk-state-pension/], function(req, res){
    var ukStatePension = req.session.data['ukStatePension'];
    const data = req.session.data

    if (ukStatePension == 'Yes'){
        data.error = 'false';
        res.redirect('eligibility-check-state-pension');
    } else if (ukStatePension == 'No'){
        data.error = 'false';
        data.ineligible = 'uk-state-pension-fail'
        res.redirect('ineligible');
    } else if (!ukStatePension){
        data.error = 'true';

        res.redirect('eligibility-uk-state-pension');
    }
})



// Do you get a State Pension from country you’re moving to?

router.post([/eligibility-check-state-pension/], function(req, res){
    var statePensionCheck = req.session.data['statePensionCheck'];
    var countrySOne = req.session.data['countrySOne'];
    const data = req.session.data;


    if (statePensionCheck == 'Yes'){
        data.error = 'false';
        data.ineligible = 'check-state-pension-fail'
        res.redirect('ineligible');
    } else if (statePensionCheck == 'No' && countrySOne == 'Germany'){
        data.error = 'false';
        res.redirect('eligibility-germany-contributions');
    } else if (statePensionCheck == 'No' && countrySOne != 'Germany'){
        data.error = 'false';
        res.redirect('eligibility-other-eu-state-pension');
    } if (!statePensionCheck){
        data.error = 'true';
        res.redirect('eligibility-check-state-pension');
    }
})



// Have you paid Statutory Health Contributions to Germany?

router.post([/eligibility-germany-contributions/], function(req, res) {
    var germanyCountributions = req.session.data['germanyContributions'];
    const data = req.session.data;

    if (germanyCountributions == 'Yes'){
        data.error = 'false';
        data.ineligible = 'check-state-pension-fail'
        res.redirect('ineligible');
    } if (germanyCountributions == 'No') {
        data.error = 'false';
        res.redirect('eligibility-other-eu-state-pension');
    } else if (!germanyCountributions) {
        data.error = 'true';
        res.redirect('eligibility-germany-contributions');
    }
})


// Do you also get a State Pension from an EU or EFTA country?

router.post([/eligibility-other-eu-state-pension/], function (req, res){
    var euStatePension = req.session.data['euStatePension'];
    var moveCheck = req.session.data['moveCheck'];
    const data = req.session.data;

    if (!euStatePension){
        data.error = 'true';
        return res.redirect('eligibility-other-eu-state-pension');
    } else if (euStatePension == 'Yes'){
        data.error = 'false';
        return res.redirect('eligibility-eu-country-state-pension');
    } else if (euStatePension == 'No' && moveCheck == 'No'){
        data.error = 'false';
        return res.redirect('check-your-answers-eligibility');
    } else if (euStatePension == 'No' && moveCheck == 'Yes'){
        data.error = 'false';
        return res.redirect('check-your-answers-eligibility');
    }
})


// End of eligibility
router.post([/check-your-answers-eligibility/], function (req,res) {
    const data = req.session.data;
    res.redirect('../apply/applicant-name') 
})


router.post([/applicant-name/], function (req,res) {
    console.log(req.body.firstName);
    console.log(req.body.lastName);
    const data = req.session.data;
    req.session.data['applicantName'] = `${req.body['firstName']} ${req.body['lastName']}`

    if(req.body.firstName === '' && req.body.lastName === '') {
        data.error = 'true';
        res.redirect('applicant-name');
    } else if(req.body.firstName !== '' && req.body.lastName !== '') {
        data.error = 'false';
        res.redirect('applicant-dob');
    } 
})


// What is your date of birth?

router.post([/applicant-dob/], function (req, res) {
    const day = req.session.data['example-day'];
    const month = req.session.data['example-month'];
    const year =req.session.data['example-year']; 
    const data = req.session.data;
    req.session.data['applicantDob'] = `${req.body['example-day']} ${req.body['example-month']}  ${req.body['example-year']}`
    // Convert numerical month to letters
    const monthInLetters = getMonthInLetters(month);

    // Set the applicantDob in the desired format
    req.session.data['applicantDob'] = `${day} ${monthInLetters} ${year}`;

    if(day === '' && month === '' && year === '') {
        data.error = 'true';
        res.redirect('applicant-dob');

    } else if(req.body.dateOfBirth !== '' ) {
        data.error = 'false';
        res.redirect('applicant-nino');
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


// What is your National Insurance number? 

router.post([/applicant-nino/], function (req,res) {
    var nino = req.session.data['nino'];
    const data = req.session.data;

    if (nino == ''){
        data.error = 'true';

        return res.redirect('applicant-nino');
    } else if (nino !== '' ){
        data.error = 'false';
        return res.redirect('applicant-residential-address');
    }
})


// Residential address (in S1 country)
,
router.post([/applicant-residential-address/], function (req,res) {
    var addressLineOne = req.session.data['addressLineOne']
    var city = req.session.data['city']
    var postcode = req.session.data['postcode']
    var country = req.session.data['country']
    const data = req.session.data;

    if(addressLineOne != '' && city != '' && postcode != '' && country != '') {
        data.error = 'false';
        return res.redirect('applicant-correspondence-address-check');
    } else if(addressLineOne == '' && city == '' && postcode == '' && country == '') {
        data.error = 'true';
        return res.redirect('applicant-residential-address');
    } 
})
 


// Is this also your correspondence address?

router.post([/applicant-correspondence-address-check/], function (req,res) {
    var correspondenceAddressCheck = req.session.data['correspondenceAddressCheck']
    const data = req.session.data;

    if(correspondenceAddressCheck == 'Yes') {
        data.error = 'false';
        res.redirect('applicant-email');
    } else if(correspondenceAddressCheck == 'No') {
        data.error = 'false';
        res.redirect('applicant-correspondence-address');
    } else {
        data.error = 'true';
        res.redirect('applicant-correspondence-address-check');
    }
})

// Correspondence address

router.post([/applicant-correspondence-address/], function (req,res) {
    var corrAddressLineOne = req.session.data['corrAddressLineOne'];
    var corrCity = req.session.data['corrCity'];
    var corrPostcode = req.session.data['corrPostcode'];
    var corrCountry = req.session.data['corrCountry'];
    const data = req.session.data;


    if(corrAddressLineOne != '' && corrCity != '' && corrPostcode != '' && corrCountry != '') {
        data.error = 'false';
        return res.redirect('applicant-email');
    } else if (corrAddressLineOne == '' && corrCity == '' && corrPostcode == '' && corrCountry == '') {
        data.error = 'true';
        return res.redirect('applicant-correspondence-address');
    }
})

// Email

router.post([/applicant-email/], function (req,res) {
    
    var email = req.session.data['email'];
    const data = req.session.data;


    if(email != '' ) {
        data.error = 'false';
        res.redirect('applicant-phone');
    } else if(email == '') {
        data.error = 'true';
        res.redirect('applicant-email');
    }
})

// Phone

router.post([/applicant-phone/], function (req,res) {
    console.log(req.body.phone);
    const data = req.session.data;


    if(req.body.phone !== '' ) {
        data.error = 'false';
        res.redirect('applicant-send-letter-check');
    } else if(req.body.phone == '') {
        data.error = 'true';
        res.redirect('applicant-phone');
    } 
})

// Do you want a copy of your S1 certificate to be sent by letter?

router.post([/applicant-send-letter-check/], function (req,res) {
    var sendCopyLetter = req.session.data['sendCopyLetter'];
    const data = req.session.data;

    if(sendCopyLetter == 'Yes') {
        data.error = 'false';
        res.redirect('check-your-answers-applicant');
    } else if(sendCopyLetter == 'No') {
        data.error = 'false';
        res.redirect('check-your-answers-applicant');
    } else {
        data.error = 'true';
        res.redirect('applicant-send-letter-check');
    }
})
/// end of main applicant journey

router.post([/check-your-answers-applicant/], function (req,res) {
    const data = req.session.data;
    res.redirect('dependant-check') 
})


/// ../upload/index-1

// Upload evidence
router.post(/index-1/, function(req,res){
    const checked = req.session.data['noEvidence'];
    
    if (!checked) {
        res.redirect('../upload/additional-file-1');
    } else if (checked) {
        res.redirect('../apply/dependant-check');
    }
})

// Upload evidence
router.post(/index-2/, function(req,res){
    const checked = req.session.data['noEvidence'];
    
    if (!checked) {
        res.redirect('../upload/additional-file-2');
    } else if (checked) {
        res.redirect('../apply/dependant-check');
    }
})

// Upload additional evidence (check)
router.post(/additional-file-1/, function(req,res){
    const additionalUpload = req.session.data['additionalUpload'];

    if (additionalUpload == 'Yes') {
        res.redirect('../upload/index-2');
    } else if (additionalUpload == "No" ) {
        res.redirect('../upload/cya');
    } else {
        res.redirect('../apply/dependant-check');
    }
})


// Upload additional evidence 2
router.post(/additional-file-2/, function(req,res){
    const additionalUploadTwo = req.session.data['additionalUploadTwo'];

    if (additionalUploadTwo == 'Yes') {
        res.redirect('../upload/index');
    } else if (additionalUploadTwo == "No" ) {
        res.redirect('../upload/cya');
    } else {
        res.redirect('../apply/dependant-check');
    }
})

// Check your details - main applicant
// applicant-cya-personal

// Do you want to add any family members to your S1 application?
// dependantCheck

router.post([/dependant-check/], function (req,res) {
    var dependantCheck = req.session.data['dependantCheck'];
    const data = req.session.data;

    if(dependantCheck == 'Yes') {
        data.error = 'false';
        res.redirect('dependant-name');
    } else if(dependantCheck == 'No') {
        data.error = 'false';
        res.redirect('check-your-answers-all');
    } else {
        data.error = 'true';
        res.redirect('dependant-check');
    }
})

// Who do you want to add to your application?

router.post([/dependant-name/], function (req,res) {
    console.log(req.body.dependantFirstName);
    console.log(req.body.dependantSurname);
    const data = req.session.data;
    req.session.data['dependantName'] = `${req.body['dependantFirstName']} ${req.body['dependantSurname']} `

    if(req.body.dependantFirstName === '' && req.body.dependantSurname === '') {
        data.error = 'true';
        res.redirect('dependant-name');
    } else if(req.body.dependantFirstName !== '' && req.body.dependantSurname !== '') {
        data.error = 'false';
        res.redirect('dependant-dob');
    } 
})

// What is [dependant name]'s date of birth?
 
router.post([/dependant-dob/], function (req, res) {
    const day = req.session.data['dependant-day']
    const month = req.session.data['dependant-month']
    const year =req.session.data['dependant-year']
    const data = req.session.data;
    req.session.data['dependantDob'] = `${req.body['dependant-day']} ${req.body['dependant-month']}  ${req.body['dependant-year']}`
    // Convert numerical month to letters
    const monthInLetters = getMonthInLetters(month);

    // Set the applicantDob in the desired format
    req.session.data['dependantDob'] = `${day} ${monthInLetters} ${year}`;
  
    if(day === '' && month === '' && year === '') {
        data.error = 'true';
        res.redirect('dependant-dob');

    } else {
        data.error = 'false';
        res.redirect('dependant-address-check');
    }  
 

})

// Does [dependant name] live at the same address as you?

router.post([/dependant-address-check/], function (req,res) {
    var dependantAddressCheck = req.session.data['dependantAddressCheck'];
    const data = req.session.data;

    if(dependantAddressCheck == 'Yes') {
        data.error = 'false';
        res.redirect('more-dependants-check');
    } else if(dependantAddressCheck == 'No') {
        data.error = 'false';
        res.redirect('dependant-address');
    } else {
        data.error = 'true';
        res.redirect('dependant-address-check');
    }
})

// Dependant address

router.post([/dependant-address/], function (req,res) {
    var addressLineOne = req.session.data['dependantAddressLine'];
    var city = req.session.data['dependantCity'];
    var postcode = req.session.data['dependantPostcode'];
    var country = req.session.data['dependantCountry'];
    const data = req.session.data;

    if(addressLineOne != '' && city != '' && postcode != '' && country != '') {
        data.error = 'false';
        res.redirect('more-dependants-check');
    } else {
        data.error = 'true';
        res.redirect('dependant-address-check');
    }
}) 

// Add more dependants?

router.post([/more-dependants-check/], function(req, res){
    var moreDependantsCheck = req.session.data['moreDependantsCheck'];
    const data = req.session.data;

    if(moreDependantsCheck == 'No') {
        data.error = 'false';
        res.redirect('check-your-answers-dependant');
    } else if (moreDependantsCheck == 'Yes') {
        data.error = 'false';
        res.redirect('dependant-name');
    } else {
        data.error = 'true';
        res.redirect('more-dependants-check');
    }
})



/// end of dependant journey 

router.post([/check-your-answers-dependant/], function (req,res) {
    res.redirect('check-your-answers-all') 
})

router.post([/check-your-answers-all/], function (req,res) {
    res.redirect('confirmation') 
})


module.exports = router;
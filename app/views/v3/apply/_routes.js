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

router.post([/eligibility-country/], function (req, res) {
    const countrySOne = req.session.data['countrySOne'];
    const data = req.session.data;

    const eftaCountries = ['Iceland', 'Liechtenstein', 'Norway', 'Switzerland'];
    const moveCheckCountries = [
        'Austria', 'Belgium', 'Bulgaria', 'Denmark', 'Czech Republic', 'Estonia',
        'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy',
        'Latvia', 'Lithuania', 'Luxemburg', 'Malta', 'Montenegro', 'Netherlands',
        'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden'
    ];

    if (eftaCountries.includes(countrySOne)) {
        data.error = 'false';
        data.ineligible = 'country-fail-efta';
        res.redirect('ineligible');
    } else if (moveCheckCountries.includes(countrySOne)) {
        data.error = 'false';
        req.session.data['country'] = `${req.body['countrySOne']}`;
        req.session.data['dependantCountry'] = `${req.body['countrySOne']}`;
        req.session.data['dependantCountry2'] = `${req.body['countrySOne']}`;

        res.redirect('eligibility-move-check');
    } else if (countrySOne === '') {
        data.error = 'true';
        res.redirect('eligibility-country');
    } else {
        data.error = 'false';
        data.ineligible = 'country-fail';
        res.redirect('ineligible');
    }
});


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


router.post([/eligibility-move-date-plan/], function (req, res){
    const data = req.session.data;

    // Get the Move Date values from the (dd / mm / yyyy) separate date inputs 
    var day = req.session.data['futureDay'];
    var month = req.session.data['futureMonth'];
    var year = req.session.data['futureYear'];

    // Store the futureDate in the session data
    req.session.data['futureDate'] = `${req.body['futureDay']} ${req.body['futureMonth']} ${req.body['futureYear']}`;

    // Convert numerical month to letters
    const monthInLetters = getMonthInLetters(month);

    // Set the futureDate in the desired format
    req.session.data['futureDate'] = `${day} ${monthInLetters} ${year}`;

    // Check if day, month, and year are empty
    if (day == '' && month == '' && year == '') {
        data.error = 'true';
        data.errortype = 'empty';
        res.redirect('eligibility-move-date-plan');
    } else {
        // Check if the selected date is more than 90 days in the future
        const selectedDate = new Date(`${month} ${day} ${year}`);
        const today = new Date();
        const ninetyDaysFromNow = new Date(today.setDate(today.getDate() + 90));

        if (selectedDate > ninetyDaysFromNow) {
            // Date is more than 90 days in the future
            data.error = 'true';
            data.errortype = '90days';

            data.ineligible = 'date-future'
            res.redirect('eligibility-move-date-plan');
        } else {
            // Date is not more than 90 days in the future
            data.error = 'false';
            res.redirect('eligibility-uk-state-pension');
        }
    }
});




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


    if (statePensionCheck == 'Yes' && countrySOne != 'Germany'){
        data.error = 'false';
        data.ineligible = 'check-state-pension-fail'
        res.redirect('ineligible');
    } else if (statePensionCheck == 'Yes' && countrySOne == 'Germany'){
        data.error = 'false';
        res.redirect('eligibility-germany-contributions');
    } else if (statePensionCheck == 'No' && countrySOne == 'Germany'){
        data.error = 'false';
        res.redirect('eligibility-other-eu-state-pension');
    } else if (statePensionCheck == 'No' && countrySOne != 'Germany'){
        data.error = 'false';
        res.redirect('eligibility-other-eu-state-pension');
    } if (!statePensionCheck){
        data.error = 'true';
        res.redirect('eligibility-other-eu-state-pension');
    }
})



// Have you paid Statutory Health Contributions to Germany?

router.post([/eligibility-germany-contributions/], function(req, res) {
    var germanyCountributions = req.session.data['germanyContributions'];
    const data = req.session.data;

    if (germanyCountributions == 'Yes'){
        data.error = 'false';
        data.ineligible = 'check-state-contributions-fail'
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
    const data = req.session.data;

    if (!euStatePension){
        data.error = 'true';
        return res.redirect('eligibility-other-eu-state-pension');
    } else if (euStatePension == 'Yes'){
        data.error = 'false';
        return res.redirect('eligibility-eu-country-state-pension');
    } else if (euStatePension == 'No' ){
        data.error = 'false';
        return res.redirect('check-your-answers-eligibility');
    } 
})

// Which countries do you get a State Pension from, other than the UK?

router.post([/eligibility-eu-country-state-pension/], function(req, res) {
    console.log(req.session.data);
    const data = req.session.data;

    var euCountryPension = req.session.data['myInputsEUSP'];
   
    if (euCountryPension == ''){
        data.error = 'true';
        return res.redirect('eligibility-eu-country-state-pension');
    } else {
        data.error = 'false';
        return res.redirect('check-your-answers-eligibility');
    }
})  

// End of eligibility
router.post([/check-your-answers-eligibility/], function (req,res) {
    res.redirect('applicant-name') 
})

 
router.post([/applicant-name/], function (req,res) {
    console.log(req.body.firstName);
    console.log(req.body.lastName);
    const data = req.session.data;

    if(req.body.firstName === '' && req.body.lastName === '') {
        data.error = 'true';
        res.redirect('applicant-name');
    } else if(req.body.firstName !== '' && req.body.lastName !== '') {
        data.applicantName = `${req.body['firstName']} ${req.body['lastName']}`
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
    data.applicantDob =  `${req.body['example-day']} ${req.body['example-month']}  ${req.body['example-year']}`

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



router.post([/applicant-residential-address/], function (req, res) {
    var addressLineOne = req.session.data['addressLineOne'];
    var addressLineTwo = req.session.data['addressLineTwo'];
    var city = req.session.data['city'];
    var postcode = req.session.data['postcode'];
    var county = req.session.data['county'];
    var country = req.session.data['country'];
    const data = req.session.data;

    if (addressLineOne !== '' && city !== '' && country !== '') {
        data.error = 'false';
        return res.redirect('applicant-correspondence-address-check');
    } else if (addressLineOne === '' && city === '' && country === '') {
        data.error = 'true';
        return res.redirect('applicant-residential-address');
    }
});




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
    var corrAddressLineTwo = req.session.data['corrAddressLineTwo'];
    var corrCity = req.session.data['corrCity'];
    var corrPostcode = req.session.data['corrPostcode'];
    var corrCountry = req.session.data['corrCountry'];
    var corrCounty = req.session.data['corrCounty'];
    const data = req.session.data;

    if (corrAddressLineOne !== '' && corrCity !== '' && corrCountry !== '') {
        // Combine correspondence address elements with HTML line breaks
        data.corrFullAddress = `<ul class="nhsuk-list"><li>${corrAddressLineOne}</li><li>${corrAddressLineTwo}</li><li>${corrCity}</li><li>${corrPostcode}</li><li>${corrCounty}</li><li>${corrCountry}</li></ul>`;

        data.error = 'false';
        return res.redirect('applicant-email');
    } else if (corrAddressLineOne === '' && corrCity === '' && corrCountry === '') {
        data.error = 'true';
        return res.redirect('applicant-correspondence-address');
    }
});

// Email

router.post([/applicant-email/], function (req,res) {
    
    var email = req.session.data['email'];
    const data = req.session.data;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        // Case 1: Email is empty
        data.error = 'true';
        data.errorMessage = 'You must enter an email address';
        res.redirect('applicant-email');
    } else if (!emailRegex.test(email)) {
        // Case 2: Email format is invalid
        data.error = 'true';
        data.errorMessage = 'Enter an email address in the correct format, like name@example.com';
        res.redirect('applicant-email');
    } else {
        // Case 3: Email is valid
        data.error = 'false';
        res.redirect('applicant-phone');
    }
})

// Phone

router.post([/applicant-phone/], function (req, res) {
    const phone = req.body.phone;
    const data = req.session.data;

    // Regular expression to match digits and optional international dialing code with spaces
    const phoneRegex = /^(\+\d{1,4})?(\s?\d)+$/;

    if (phone === '' || phoneRegex.test(phone.replace(/\s/g, ''))) {
        data.error = 'false';
        res.redirect('applicant-send-letter-check');
    } else {
        data.error = 'true';
        res.redirect('applicant-phone');
    }
});


// Do you want a copy of your S1 certificate to be sent by letter?

router.post([/applicant-send-letter-check/], function (req,res) {
    var sendCopyLetter = req.session.data['sendCopyLetter'];
    const data = req.session.data;

    if(sendCopyLetter == 'Yes') {
        data.error = 'false';
        res.redirect('dependant-check');
    } else if(sendCopyLetter == 'No') {
        data.error = 'false';
        res.redirect('dependant-check');
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

    const data = req.session.data;

    if(req.body.dependantFirstName === '' && req.body.dependantSurname === '') {
        data.error = 'true';
        res.redirect('dependant-name');
    } else if(req.body.dependantFirstName !== '' && req.body.dependantSurname !== '') {
        data.dependantName = `${req.body['dependantFirstName']} ${req.body['dependantSurname']}`
        data.error = 'false';
        res.redirect('dependant-dob');
    } 
})
// Who do you want to add to your application?

router.post([/dependant-2-name/], function (req,res) {

    const data = req.session.data;

    if(req.body.dependantFirstName2 === '' && req.body.dependantSurname2 === '') {
        data.error = 'true';
        res.redirect('dependant-2-name');
    } else if(req.body.dependantFirstName2 !== '' && req.body.dependantSurname2 !== '') {
        data.dependantName2 = `${req.body['dependantFirstName2']} ${req.body['dependantSurname2']}`
        data.error = 'false';
        res.redirect('dependant-2-dob');
    } 
})

// What is [dependant name]'s date of birth?
 
router.post([/dependant-dob/], function (req, res) {
    const day = req.session.data['dependant-day']
    const month = req.session.data['dependant-month']
    const year =req.session.data['dependant-year']
    const data = req.session.data;
    data.dependantDob = `${req.body['dependant-day']} ${req.body['dependant-month']}  ${req.body['dependant-year']}`

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

 
router.post([/dependant-2-dob/], function (req, res) {
    const day = req.session.data['dependant-day2']
    const month = req.session.data['dependant-month2']
    const year =req.session.data['dependant-year2']
    const data = req.session.data;
    data.dependantDob2 = `${req.body['dependant-day2']} ${req.body['dependant-month2']}  ${req.body['dependant-year2']}`

    // Convert numerical month to letters
    const monthInLetters = getMonthInLetters(month);

    // Set the applicantDob in the desired format
    req.session.data['dependantDob2'] = `${day} ${monthInLetters} ${year}`;
  
    if(day === '' && month === '' && year === '') {
        data.error = 'true';
        res.redirect('dependant-2-dob');

    } else {
        data.error = 'false';
        res.redirect('dependant-2-address-check');
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
router.post([/dependant-2-address-check/], function (req,res) {
    var dependantAddressCheck = req.session.data['dependantAddressCheck2'];
    const data = req.session.data;

    if(dependantAddressCheck == 'Yes') {
        data.error = 'false';
        res.redirect('more-dependants-check');
    } else if(dependantAddressCheck == 'No') {
        data.error = 'false';
        res.redirect('dependant-2-address');
    } else {
        data.error = 'true';
        res.redirect('dependant-2-address-check');
    }
})
// Dependant address

router.post([/dependant-address/], function (req, res) {
    var dependantAddressLineOne = req.session.data['dependantAddressLineOne'];
    var dependantAddressLineTwo = req.session.data['dependantAddressLineTwo'];
    var dependantCity = req.session.data['dependantCity'];
    var dependantPostcode = req.session.data['dependantPostcode'];
    var dependantCounty = req.session.data['dependantCounty'];
    var dependantCountry = req.session.data['dependantCountry'];
    const data = req.session.data;

    if (dependantAddressLineOne !== '' && dependantCity !== '' && dependantCountry !== '') {
        // Combine dependent address elements with HTML line breaks
        data.dependantFullAddress = `<ul class="nhsuk-list"><li>${dependantAddressLineOne}</li><li>${dependantAddressLineTwo}</li><li>${dependantCity}</li><li>${dependantPostcode}</li><li>${dependantCounty}</li><li>${dependantCountry}</li></ul>`;

        data.error = 'false';
        return res.redirect('more-dependants-check');
    } else {
        data.error = 'true';
        return res.redirect('dependant-address');
    }
});
router.post([/dependant-2-address/], function (req, res) {
    var dependantAddressLineOne2 = req.session.data['dependantAddressLineOne2'];
    var dependantAddressLineTwo2 = req.session.data['dependantAddressLineTwo2'];
    var dependantCity2 = req.session.data['dependantCity2'];
    var dependantPostcode2 = req.session.data['dependantPostcode2'];
    var dependantCounty2 = req.session.data['dependantCounty2'];
    var dependantCountry2 = req.session.data['dependantCountry2'];
    const data = req.session.data;

    if (dependantAddressLineOne2 !== '' && dependantCity2 !== '' && dependantCountry2 !== '') {
        // Combine dependent address elements with HTML line breaks
        data.dependantFullAddress2 = `<ul class="nhsuk-list"><li>${dependantAddressLineOne2}</li><li>${dependantAddressLineTwo2}</li><li>${dependantCity2}</li><li>${dependantPostcode2}</li><li>${dependantCounty2}</li><li>${dependantCountry2}</li></ul>`;

        data.error = 'false';
        return res.redirect('more-dependants-check');
    } else {
        data.error = 'true';
        return res.redirect('dependant-2-address');
    }
});

// Add more dependants?

router.post([/more-dependants-check/], function(req, res){
    var moreDependantsCheck = req.session.data['moreDependantsCheck'];
    var dependant2 = req.session.data['dependant2'];
    const data = req.session.data;

    if(moreDependantsCheck == 'No') {
        data.error = 'false';
        res.redirect('check-your-answers-all');
    } else if (moreDependantsCheck == 'Yes') {
        data.error = 'false';
        data.dependant2 = 'true';
        res.redirect('dependant-2-name');
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
    res.redirect('submit-application') 
})

router.post([/submit-application/], function (req,res) {
    const data = req.session.data;
    var evidenceNeeded = req.session.data['evidenceNeeded'];

    if(evidenceNeeded == 'Yes') {
        res.redirect('confirmation');
    } else {
        res.redirect('confirmation-evidence') 
    }
})

module.exports = router;
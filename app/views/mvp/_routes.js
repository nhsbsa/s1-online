const express = require('express')
const router = express.Router()

const axios = require('axios');


//// Alpha S1 V.2 /////
//////////////////////


// 	Are you permanently living or moving outside the UK?

router.post([/eligibility-country-check/, /eligibility-country-check-error/], function(req, res){
    var liveEU = req.session.data['liveEU'];
    console.log(liveEU);

    if (liveEU == 'Yes'){
        res.redirect('eligibility-country');
    } if (liveEU == 'No'){
        res.redirect('kickout/ineligible-country-check-kickout');
    } else {
        res.redirect('eligibility-country-check-error');
    }
})


//  Which country do you need an S1 for?

router.post([/eligibility-country/, /eligibility-country-error/], function (req, res){
    var countrySOne = req.session.data['countrySOne'];
    console.log(countrySOne);

    if (countrySOne == 'Iceland' || countrySOne == 'Liechtenstein' || countrySOne == 'Norway') {
        res.redirect('eligibility-move-before-check')
    } if (countrySOne == 'Austria' || countrySOne == 'Belgium' || countrySOne == 'Bulgaria' || countrySOne == 'Denmark') {
        res.redirect('eligibility-move-check')
    } if (countrySOne == 'Czech Republic' || countrySOne == 'Estonia' || countrySOne == 'Finland' || countrySOne == 'France') {
        res.redirect('eligibility-move-check')
    } if (countrySOne == 'Germany' || countrySOne == 'Greece' || countrySOne == 'Hungary' || countrySOne == 'Ireland' || countrySOne == 'Italy') {
        res.redirect('eligibility-move-check')
    } if (countrySOne == 'Latvia' || countrySOne == 'Lithuania' || countrySOne == 'Luxemburg' || countrySOne == 'Malta' || countrySOne == 'Montenegro') {
        res.redirect('eligibility-move-check')
    }  if (countrySOne == 'Netherlands' || countrySOne == 'Poland' || countrySOne == 'Portugal' || countrySOne == 'Romania' || countrySOne == 'Slovakia') {
        res.redirect('eligibility-move-check')
    }  if (countrySOne == 'Slovenia' || countrySOne == 'Spain' || countrySOne == 'Sweden' || countrySOne == 'Switzerland') {
        res.redirect('eligibility-move-check')
    }  if (countrySOne == '') {
        res.redirect('eligibility-country-error')
    } else {
        res.redirect('kickout/ineligible-country-kickout')
    }

})

// When will you move to [Country] ?

router.post([/eligibility-move-date-plan/, /eligibility-move-date-plan-day-error/, /eligibility-move-date-plan-month-error/, /eligibility-move-date-plan-year-error/, /eligibility-move-date-plan-month-year-error/, /eligibility-move-date-plan-day-year-error/, /eligibility-move-date-plan-error/, /eligibility-move-date-plan-invalid-error/], function (req, res){

    // Get the Move Date values from the (dd / mm / yyyy) separate date inputs 
    var futureDay = req.session.data['futureDay'];
    var futureMonth = req.session.data['futureMonth'];
    var futureYear = req.session.data['futureYear'];

    // Join the Move Date input values into one string date
    const futureDate = futureDay + '/' + futureMonth + '/' + futureYear;

    // Convert the string date into a Date value format that is recognised by JS, 
        // ready to use in logic for comparing dates
    var fullFutureDate = new Date(futureDate.split('/')[2], futureDate.split('/')[1] - 1, futureDate.split('/')[0]);


    //Today's date
    const now = new Date();
    const yyyy = now.getFullYear();
    let mm = now.getMonth() + 1; 
    const dd = now.getDate();
    const formatToday = dd + '/' + mm + '/' + yyyy;

    console.log(formatToday);

    var todayDate = new Date(formatToday.split('/')[2], formatToday.split('/')[1] - 1, formatToday.split('/')[0]);
    console.log(todayDate);

    // 90 days from today 
    var ninetyDaysFromNow = new Date(todayDate.getTime() + (92 * 86400000));
    console.log(ninetyDaysFromNow);


    ///// Validate date input values using regular expressions
    var yearReg = /^(202[3-4])$/;            ///< Allows a number between 2023 and 2024
    var monthReg = /^(0?[1-9]|1[0-2])$/;               ///< Allows a number between 00 and 12
    var dayReg = /^([1-9]|1[0-9]|2[0-9]|3[0-1])$/;   ///< Allows a number between 00 and 31


    if (dayReg.test(futureDay) && monthReg.test(futureMonth) && yearReg.test(futureYear) && fullFutureDate < ninetyDaysFromNow) {
        res.redirect('eligibility-uk-state-pension');
    } if (dayReg.test(futureDay) && monthReg.test(futureMonth) && yearReg.test(futureYear) && fullFutureDate > ninetyDaysFromNow) {
        res.redirect('kickout/ineligible-date-kickout');
    } if (futureDay == '' && monthReg.test(futureMonth) && yearReg.test(futureYear)) {
        res.redirect('eligibility-move-date-plan-day-error')
    } if (dayReg.test(futureDay) && futureMonth == '' && yearReg.test(futureYear)) {
        res.redirect('eligibility-move-date-plan-month-error')
    } if (dayReg.test(futureDay) && monthReg.test(futureMonth) && futureYear == '') {
        res.redirect('eligibility-move-date-plan-year-error')
    } if (futureDay == '' && futureMonth == '' && yearReg.test(futureYear)) {
        res.redirect('eligibility-move-date-plan-day-month-error')
    } if (dayReg.test(futureDay) && futureMonth == '' && futureYear == '') {
        res.redirect('eligibility-move-date-plan-month-year-error')
    } if (futureDay == '' && monthReg.test(futureMonth) && futureYear == '') {
        res.redirect('eligibility-move-date-plan-day-year-error')
    } if (futureDay == '' && futureMonth == '' && futureYear == '') {
        res.redirect('eligibility-move-date-plan-error')
    } if (!dayReg.test(futureDay) || !monthReg.test(futureMonth) || !yearReg.test(futureYear)) {
        res.redirect('eligibility-move-date-plan-invalid-error')
    }
})


// Are you currently living in [S1 country]?

router.post([/eligibility-currently-living/, /eligibility-currently-living-error/], function (req, res) {
    var currentlyLiving = req.session.data['currentlyLiving']
    console.log(currentlyLiving);

    if (currentlyLiving == 'Yes') {
        res.redirect('eligibility-move-date')
    } if (currentlyLiving == 'No') {
        res.redirect('ineligible-country-kickout')
    } else {
        res.redirect('eligibility-currently-living-error')
    }

})


// When did you move to [Country] ?

router.post([/eligibility-move-date/, /eligibility-move-date-day-error/, /eligibility-move-date-month-error/, /eligibility-move-date-plan-year-error/, /eligibility-move-date-day-month-error/, /eligibility-move-date-month-year-error/, /eligibility-move-date-day-year-error/, /eligibility-move-date-error/, /eligibility-move-date-invalid-error/], function (req, res){

    // Get the Move Date values from the (dd / mm / yyyy) separate date inputs 
    var moveDay = req.session.data['moveDay'];
    var moveMonth = req.session.data['moveMonth'];
    var moveYear = req.session.data['moveYear'];

    // Join the Move Date input values into one string date
    const moveDate = moveDay + '/' + moveMonth + '/' + moveYear;

    // Convert the string date into a Date value format that is recognised by JS, 
        // ready to use in logic for comparing dates
    var fullMoveDate = new Date(moveDate.split('/')[2], moveDate.split('/')[1] - 1, moveDate.split('/')[0]);


    //Today's date
    const now = new Date();
    const yyyy = now.getFullYear();
    let mm = now.getMonth() + 1; 
    const dd = now.getDate();
    const formatToday = dd + '/' + mm + '/' + yyyy;

    console.log(formatToday);

    var todayDate = new Date(formatToday.split('/')[2], formatToday.split('/')[1] - 1, formatToday.split('/')[0]);
    console.log(todayDate);

    // 90 days from today 
    var ninetyDaysFromNow = new Date(todayDate.getTime() + (92 * 86400000));
    console.log(ninetyDaysFromNow);


    ///// Validate date input values using regular expressions
    var yearReg = /^(200[0-9]|201[0-9]|202[0-4])$/;     ///< Allows a number between 2000 and 2024
    var monthReg = /^(0?[1-9]|1[0-2])$/;               ///< Allows a number between 00 and 12
    var dayReg = /^([1-9]|1[0-9]|2[0-9]|3[0-1])$/;   ///< Allows a number between 00 and 31

    var firstJan = new Date("1/1/2021");
    console.log(firstJan);
    var thirtyOneOct = new Date("10/31/2021");
    console.log(thirtyOneOct);
    var firstNov = new Date("11/1/2021");
    console.log(firstNov);

    var countrySOne = req.session.data['countrySOne'];


    if (dayReg.test(moveDay) && monthReg.test(moveMonth) && yearReg.test(moveYear) && countrySOne == 'Norway' || countrySOne == 'Iceland' || countrySOne == 'Liechtenstein' && fullMoveDate >= firstJan) {
        res.redirect('nationality');
    } if (dayReg.test(moveDay) && monthReg.test(moveMonth) && yearReg.test(moveYear) && countrySOne == 'Norway' || countrySOne == 'Iceland' || countrySOne == 'Liechtenstein' && fullMoveDate < firstJan) {
        res.redirect('eligibility-uk-state-pension');
    } if (dayReg.test(moveDay) && monthReg.test(moveMonth) && yearReg.test(moveYear) && countrySOne == 'Switzerland' && fullMoveDate > firstJan) {
        res.redirect('nationality-status');
    } if (dayReg.test(moveDay) && monthReg.test(moveMonth) && yearReg.test(moveYear) && countrySOne == 'Switzerland' && thirtyOneOct > fullMoveDate >= firstJan) {
        res.redirect('nationality-status');
    } if (dayReg.test(moveDay) && monthReg.test(moveMonth) && yearReg.test(moveYear) && countrySOne == 'Switzerland' && fullMoveDate >= firstNov) {
        res.redirect('nationality-status');
    } if (dayReg.test(moveDay) && monthReg.test(moveMonth) && yearReg.test(moveYear) && fullMoveDate <= firstJan) {
        res.redirect('nationality');
    } if (dayReg.test(moveDay) && monthReg.test(moveMonth) && yearReg.test(moveYear) && fullMoveDate > firstJan) {
        res.redirect('kickout/ineligible-date-kickout');
        } if (dayReg.test(moveDay) && monthReg.test(moveMonth) && yearReg.test(moveYear) && fullMoveDate > firstJan) {
        res.redirect('kickout/ineligible-date-kickout');
    } if (moveDay == '' && monthReg.test(moveMonth) && yearReg.test(moveYear)) {
        res.redirect('eligibility-move-date-day-error')
    } if (dayReg.test(moveDay) && moveMonth == '' && yearReg.test(moveYear)) {
        res.redirect('eligibility-move-date-month-error')
    } if (dayReg.test(moveDay) && monthReg.test(moveMonth) && moveYear == '') {
        res.redirect('eligibility-move-date-year-error')
    } if (moveDay == '' && moveMonth == '' && yearReg.test(moveYear)) {
        res.redirect('eligibility-move-date-day-month-error')
    } if (dayReg.test(moveDay) && moveMonth == '' && moveYear == '') {
        res.redirect('eligibility-move-date-month-year-error')
    } if (moveDay == '' && monthReg.test(moveMonth) && moveYear == '') {
        res.redirect('eligibility-move-date-day-year-error')
    } if (moveDay == '' && moveMonth == '' && moveYear == '') {
        res.redirect('eligibility-move-date-error')
    } if (!dayReg.test(moveDay) || !monthReg.test(moveMonth) || !yearReg.test(moveYear)) {
        res.redirect('eligibility-move-date-invalid-error')
    }
})

// What is your nationality? - nationality.html

// Nationality Checkboxes

function arraysContainSame(a, b) {
    a = Array.isArray(a) ? a : [];
    b = Array.isArray(b) ? b : [];
    return a.length === b.length && a.every(el => b.includes(el));
  }
  
  router.post(/nationality/, function (req, res) {

    var permanentCountry = req.session.data['permanentCountry'];
    var countrySOne = req.session.data['countrySOne']; 
  
    var nationality = req.session.data['nationality'];
    console.log(nationality);
    
    if (permanentCountry == 'Norway' || permanentCountry == 'Iceland' || permanentCountry == 'Liechtenstein' && arraysContainSame(nationality, ['UK', 'Other']) == true) {
        res.redirect('kickout/ineligible-eea-nationality-kickout')
    } if (countrySOne == 'Norway' || countrySOne == 'Iceland' || countrySOne == 'Liechtenstein' && arraysContainSame(nationality, ['UK', 'Other']) == true) {
      res.redirect('kickout/ineligible-eea-nationality-kickout')
    } if (permanentCountry == 'Norway' || permanentCountry == 'Iceland' || permanentCountry == 'Liechtenstein' && nationality == 'UK') {
        res.redirect('kickout/ineligible-eea-nationality-kickout')
    } if (countrySOne == 'Norway' || countrySOne == 'Iceland' || countrySOne == 'Liechtenstein' && nationality == 'UK') {
      res.redirect('kickout/ineligible-eea-nationality-kickout')
    } if (permanentCountry == 'Norway' || permanentCountry == 'Iceland' || permanentCountry == 'Liechtenstein' && nationality == 'Other') {
        res.redirect('kickout/ineligible-eea-nationality-kickout')
    } if (countrySOne == 'Norway' || countrySOne == 'Iceland' || countrySOne == 'Liechtenstein' && nationality == 'Other') {
      res.redirect('kickout/ineligible-eea-nationality-kickout')
    }
    else if (nationality == 'UK') {
      res.redirect('eligibility-uk-state-pension')
    }
    else if (arraysContainSame(nationality, ['UK', 'EU, EEA or Swiss', 'Other']) == true) {
      res.redirect('eligibility-uk-state-pension')
    }
    else if (arraysContainSame(nationality, ['EU, EEA or Swiss', 'Other']) == true) {
      res.redirect('eligibility-national-before-wa-check')
    }
    else if (nationality == 'EU, EEA or Swiss') {
      res.redirect('eligibility-national-before-wa-check')
    }
    else if (nationality == 'Other') {
      res.redirect('kickout/ineligible-nationality-kickout')
    }
    else if (arraysContainSame(nationality, ['UK', 'EU, EEA or Swiss']) == true) {
      res.redirect('eligibility-uk-state-pension')
    }
    else {
      res.redirect('nationality')
    }
  })

  // What is your nationality status? - nationality-status.html

//Version 2: Nationality Checkboxes

function arraysContainSame(a, b) {
    a = Array.isArray(a) ? a : [];
    b = Array.isArray(b) ? b : [];
    return a.length === b.length && a.every(el => b.includes(el));
  }
  
  router.post(/nationality-status/, function (req, res) {
  
    var nationalityStatus = req.session.data['nationalityStatus'];
    console.log(nationalityStatus);
  
    if (arraysContainSame(nationalityStatus, ['UK', 'Other']) == true) {
      res.redirect('studying-uk-citizen')
    }
    else if (nationalityStatus == 'UK') {
      res.redirect('studying-uk-citizen')
    }
    else if (arraysContainSame(nationalityStatus, ['UK', 'EU, EEA or Swiss', 'Other']) == true) {
      res.redirect('birth-country-uk')
    }
    else if (arraysContainSame(nationalityStatus, ['EU, EEA or Swiss', 'Other']) == true) {
      res.redirect('uk-citizenship')
    }
    else if (nationality == 'EU, EEA or Swiss') {
      res.redirect('uk-citizenship')
    }
    else if (nationality == 'Other') {
      res.redirect('uk-citizenship')
    }
    else if (arraysContainSame(nationalityStatus, ['UK', 'EU, EEA or Swiss']) == true) {
      res.redirect('birth-country-uk')
    }
    else {
      res.redirect('nationality')
    }
  })
  


// Did you move in [Country] before 1 January 2021?

router.post([/eligibility-move-before-check/, /eligibility-move-before-check-error/], function (req, res) {
    var moveBeforeCheck = req.session.data['moveBeforeCheck'];

    if (moveBeforeCheck == 'Yes') {
        res.redirect('eligibility-uk-state-pension');
    } if (moveBeforeCheck == 'No') {
        res.redirect('kickout/ineligible-country-kickout');
    } else {
        res.redirect('eligibility-move-before-check-error');
    }
})


// Are you already living in [Country]?

router.post([/eligibility-move-check/, /eligibility-move-check-error/], function (req, res){
    var moveCheck = req.session.data['moveCheck'];

    if (moveCheck == 'Yes') {
        res.redirect('eligibility-move-date');
    } if (moveCheck == 'No') {
        res.redirect('eligibility-move-date-plan');
    } else {
        res.redirect('eligibility-move-check-error');
    }

})


/// TO DO: work out separate input dates ///

router.get(/eligibility-uk-state-pension/, function (req, res) {
    
    //Today's date
    const now = new Date();
    const yyyy = now.getFullYear();
    let mm = now.getMonth() + 1; 
    const dd = now.getDate();
    const formatToday = dd + '/' + mm + '/' + yyyy;

    console.log(formatToday);

    var todayDate = new Date(formatToday.split('/')[2], formatToday.split('/')[1] - 1, formatToday.split('/')[0]);
    console.log(todayDate);

    // 90 days from today 
    var ninetyDays = new Date(todayDate.getTime() + (92 * 86400000));
    console.log(ninetyDays);

    // Convert format
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
    var ninetyDaysFromNow = dateTimeFormat.format(ninetyDays);
    console.log(ninetyDaysFromNow);
    
    res.render('mvp/apply/eligibility-uk-state-pension', {ninetyDaysFromNow: ninetyDaysFromNow});
})

router.get(/cya/, function (req, res) {

    //Today's date
    const now = new Date();
    const yyyy = now.getFullYear();
    let mm = now.getMonth() + 1; 
    const dd = now.getDate();
    const formatToday = dd + '/' + mm + '/' + yyyy;

    console.log(formatToday);

    var todayDate = new Date(formatToday.split('/')[2], formatToday.split('/')[1] - 1, formatToday.split('/')[0]);
    console.log(todayDate);

    // 90 days from today 
    var ninetyDays = new Date(todayDate.getTime() + (92 * 86400000));
    console.log(ninetyDays);

    // Convert format
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
    var ninetyDaysFromNow = dateTimeFormat.format(ninetyDays);
    console.log(ninetyDaysFromNow);
  
    res.render('mvp/apply/cya', {ninetyDaysFromNow: ninetyDaysFromNow});
})
  
router.get(/eligibility-cya/, function (req, res) {

    //Today's date
    const now = new Date();
    const yyyy = now.getFullYear();
    let mm = now.getMonth() + 1; 
    const dd = now.getDate();
    const formatToday = dd + '/' + mm + '/' + yyyy;

    console.log(formatToday);

    var todayDate = new Date(formatToday.split('/')[2], formatToday.split('/')[1] - 1, formatToday.split('/')[0]);
    console.log(todayDate);

    // 90 days from today 
    var ninetyDays = new Date(todayDate.getTime() + (92 * 86400000));
    console.log(ninetyDays);

    // Convert format
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
    var ninetyDaysFromNow = dateTimeFormat.format(ninetyDays);
    console.log(ninetyDaysFromNow);
  
    res.render('mvp/apply/eligibility-cya', {ninetyDaysFromNow: ninetyDaysFromNow});
})

// Are you being paid a UK State Pension, or will you be paid your UK State Pension before [90 days from today]?

router.post([/eligibility-uk-state-pension/, /eligibility-uk-state-pension-error/], function(req, res){
    var ukStatePension = req.session.data['ukStatePension'];

    if (ukStatePension == 'Yes'){
        res.redirect('eligibility-other-state-pension');
    } if (ukStatePension == 'No'){
        res.redirect('kickout/ineligible-date-kickout');
    } else {
        res.redirect('eligibility-uk-state-pension-error');
    }
})


// Do you get a State Pension from another country?

router.post([/eligibility-other-state-pension/, /eligibility-other-state-pension-error/], function (req, res){
    var otherStatePension = req.session.data['otherStatePension'];

    if (otherStatePension == 'Yes'){
        res.redirect('eligibility-eu-country-state-pension');
    } if (otherStatePension == 'No'){
        res.redirect('applicant-name');
    } else {
        res.redirect('eligibility-other-state-pension-error');
    }
})

// Which other countries do you get a State Pension from?

router.post([/eligibility-eu-country-state-pension/, /eligibility-eu-country-state-pension-error/], function(req, res) {
    var euCountryPension = req.session.data['euCountryPension'];
    var countrySOne = req.session.data['countrySOne'];

    if (euCountryPension == countrySOne){
        res.redirect('kickout/ineligible-country-kickout');
    } if (euCountryPension != countrySOne && (euCountryPension == 'Iceland' || euCountryPension == 'Liechtenstein' || euCountryPension == 'Norway')){
        res.redirect('eligibility-eu-state-pension-amount');
    } if (euCountryPension != countrySOne && (euCountryPension == 'Austria' || euCountryPension == 'Belgium' || euCountryPension == 'Bulgaria' || euCountryPension == 'Denmark' )){
        res.redirect('eligibility-eu-state-pension-amount');
    } if (euCountryPension == ''){
        res.redirect('eligibility-eu-country-state-pension-error');
    } else {
        res.redirect('applicant-name');
    }
})

// Is your State Pension from [country] more than your UK State Pension? 

router.post([/eligibility-eu-state-pension-amount/, /eligibility-eu-state-pension-amount-error/], function(req, res){
    var euPensionAmount = req.session.data['euPensionAmount'];

    if (euPensionAmount == 'Yes'){
        res.redirect('kickout/ineligible-other-pension-amount');
    } if (euPensionAmount == 'No'){
        res.redirect('eligibility-other-state-pension-two');
    } else {
        res.redirect('eligibility-eu-state-pension-amount-error');
    }
})

// Do you get a State Pension from another country? (2)

router.post([/eligibility-other-state-pension-two/, /eligibility-other-state-pension-two-error/], function (req, res){
    var otherStatePensionTwo = req.session.data['otherStatePensionTwo'];

    if (otherStatePensionTwo == 'Yes'){
        res.redirect('eligibility-eu-country-state-pension-two');
    } if (otherStatePensionTwo == 'No'){
        res.redirect('applicant-name');
    } else {
        res.redirect('eligibility-other-state-pension-two-error');
    }
})

// // Which other countries do you get a State Pension from? (2)

router.post([/eligibility-eu-country-state-pension-two/, /eligibility-eu-country-state-pension-two-error/], function(req, res) {
    var euCountryPensionTwo = req.session.data['euCountryPensionTwo'];
    var countrySOne = req.session.data['countrySOne'];

    if (euCountryPensionTwo == countrySOne){
        res.redirect('kickout/ineligible-country-kickout');
    } if (euCountryPensionTwo != countrySOne && (euCountryPensionTwo == 'Iceland' || euCountryPensionTwo == 'Liechtenstein' || euCountryPensionTwo == 'Norway')){
        res.redirect('eligibility-eu-state-pension-amount');
    } if (euCountryPensionTwo != countrySOne && (euCountryPensionTwo == 'Austria' || euCountryPensionTwo == 'Belgium' || euCountryPensionTwo == 'Bulgaria' || euCountryPensionTwo == 'Denmark' )){
        res.redirect('eligibility-eu-state-pension-amount');
    } if (euCountryPensionTwo == ''){
        res.redirect('eligibility-eu-country-state-pension-error');
    } else {
        res.redirect('applicant-name');
    }
})

// Is your State Pension from [country] more than your UK State Pension? (2)

router.post([/eligibility-eu-state-pension-amount-two/, /eligibility-eu-state-pension-amount-two-error/], function(req, res){
    var euPensionAmountTwo = req.session.data['euPensionAmountTwo'];

    if (euPensionAmountTwo == 'Yes'){
        res.redirect('kickout/ineligible-other-pension-amount');
    } if (euPensionAmountTwo == 'No'){
        res.redirect('cya-pension-countries');
    } else {
        res.redirect('eligibility-eu-state-pension-amount-two-error');
    }
})

//

// What is your name?

router.post([/full-name/, /full-name-error/], function (req,res) {
    console.log(req.body.fullName);
  
    if(req.body.fullName === '') {
      res.redirect('full-name-error');
    } else if(req.body.fullName !== '') {
      res.redirect('dob');
    } 
  })


// What is your date of birth?

router.post([/date-of-birth/, /date-of-birth-error/, /date-of-birth-invalid/], function (req,res) {
    console.log(req.body.dateOfBirth);
    
    const dobRegEx = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/](\d{4})$/;
  
    if(req.body.dateOfBirth === '') {
      res.redirect('dob-error');
    } else if(req.body.dateOfBirth !== '' && !dobRegEx.test(req.body.dateOfBirth)) {
      res.redirect('dob-invalid');
    } else if(req.body.dateOfBirth !== '' && dobRegEx.test(req.body.dateOfBirth)) {
      res.redirect('check-your-answers');
    } 
  })

// What is your nationality?


// What is your National Insurance number? 

router.post([/national-insurance/, /national-insurance-invalid/], function (req,res) {
    console.log(req.body.nino);
  
    const ninoRegEx = /^(?!BG)(?!GB)(?!NK)(?!KN)(?!TN)(?!NT)(?!ZZ)(?:[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z])(?:\s*\d\s*){6}([A-D]|\s)$/;
  
    if(req.body.nino !== '' && !ninoRegEx.test(req.body.nino)) {
      res.redirect('nino-invalid');
    } else {
      res.redirect('nhs-number');
    }
  })

// Address

router.post([/address-details/, /address-details-postcode/], function (req,res) {
    console.log(req.body.addressPostcode);
    const postcodeRegEx = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/;
    const startsWithRegEx = /^[GX][JE][GY][IM]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/;
  
    if(req.body.addressPostcode === '') {
      res.redirect('full-name');
    } else if(req.body.addressPostcode !== '' && !startsWithRegEx.test(req.body.addressPostcode) && postcodeRegEx.test(req.body.addressPostcode)) {
      res.redirect('full-name');
    } else if(req.body.addressPostcode !== '' && !startsWithRegEx.test(req.body.addressPostcode) && !postcodeRegEx.test(req.body.addressPostcode)) {
      res.redirect('address-details-postcode');
    } else if(req.body.addressPostcode !== '' && startsWithRegEx.test(req.body.addressPostcode)) {
      res.redirect('kickouts/ineligible-postcode');
    } else {
      res.redirect('address-details');
    }
  })


// Phone & email

router.post([/contact-details/, /contact-details-error/, /contact-details-email/, /contact-details-phone/], function (req,res) {
    console.log(req.body.phoneNumber);
    console.log(req.body.emailAddress);
    
    const phoneRegEx = /^0([1-6][0-9]{8,10}|7[0-9]{9})$/;
    const emailRegEx = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  
    if(req.body.phoneNumber === '' && req.body.emailAddress === '') {
      res.redirect('address-details');
    } else if(req.body.phoneNumber !== '' && phoneRegEx.test(req.body.phoneNumber) && req.body.emailAddress !== '' && emailRegEx.test(req.body.emailAddress)) {
      res.redirect('address-details');
    } else if(req.body.phoneNumber !== '' && !phoneRegEx.test(req.body.phoneNumber) && req.body.emailAddress !== '' && !emailRegEx.test(req.body.emailAddress)) {
      res.redirect('contact-details-error');
    } else if(req.body.phoneNumber !== '' && !phoneRegEx.test(req.body.phoneNumber) && req.body.emailAddress !== '' && emailRegEx.test(req.body.emailAddress)) {
      res.redirect('contact-details-phone-error');
    } else if(req.body.phoneNumber !== '' && phoneRegEx.test(req.body.phoneNumber) && req.body.emailAddress !== '' && !emailRegEx.test(req.body.emailAddress)) {
      res.redirect('contact-details-email-error');
    } else {
      res.redirect('address-details');
    }
  })
  
///







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
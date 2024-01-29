const express = require('express')
const router = express.Router()

// const axios = require('axios');


//// Alpha S1 V.2 /////
//////////////////////


// 	Are you permanently living or moving outside the UK?

router.post([/eligibility-country-check/, /eligibility-country-check-error/], function(req, res){
    var liveEU = req.session.data['liveEU'];

    if (liveEU == 'Yes'){
        res.redirect('eligibility-country');
    } else if (liveEU == 'No'){
        res.redirect('kickout/ineligible-country-check-kickout');
    } else {
        res.redirect('eligibility-country-check-error');
    }
})


//  Which country do you need an S1 for?

router.post([/eligibility-country/, /eligibility-country-error/], function (req, res){
    var countrySOne = req.session.data['countrySOne'];
    console.log(countrySOne);

    if (countrySOne == 'Iceland' || countrySOne == 'Liechtenstein' || countrySOne == 'Norway' || countrySOne == 'Switzerland') {
        res.redirect('kickout/ineligible-efta-country-kickout');
    } if (countrySOne == 'Austria' || countrySOne == 'Belgium' || countrySOne == 'Bulgaria' || countrySOne == 'Denmark') {
        res.redirect('eligibility-move-check');
    } if (countrySOne == 'Czech Republic' || countrySOne == 'Estonia' || countrySOne == 'Finland' || countrySOne == 'France') {
        res.redirect('eligibility-move-check');
    } if (countrySOne == 'Germany' || countrySOne == 'Greece' || countrySOne == 'Hungary' || countrySOne == 'Ireland' || countrySOne == 'Italy') {
        res.redirect('eligibility-move-check');
    } if (countrySOne == 'Latvia' || countrySOne == 'Lithuania' || countrySOne == 'Luxemburg' || countrySOne == 'Malta' || countrySOne == 'Montenegro') {
        res.redirect('eligibility-move-check');
    }  if (countrySOne == 'Netherlands' || countrySOne == 'Poland' || countrySOne == 'Portugal' || countrySOne == 'Romania' || countrySOne == 'Slovakia') {
        res.redirect('eligibility-move-check');
    }  if (countrySOne == 'Slovenia' || countrySOne == 'Spain' || countrySOne == 'Sweden') {
        res.redirect('eligibility-move-check');
    }  if (countrySOne == '') {
        res.redirect('eligibility-country-error');
    } else {
        res.redirect('kickout/ineligible-country-kickout');
    }
})

// Do you already live in [Country]?

router.post([/eligibility-move-check/, /eligibility-move-check-error/], function(req, res){
    var moveCheck = req.session.data['moveCheck'];

    if (moveCheck == 'Yes') {
        res.redirect('eligibility-move-date');
    } if (moveCheck == 'No') {
        res.redirect('eligibility-move-date-plan');
    } else {
        res.redirect('eligibility-move-check-error');
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
    console.log(futureDate);
    console.log(fullFutureDate);


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
    var ninetyDaysFromNow = new Date(todayDate.getTime() + (90 * 24 * 60 * 60 * 1000));
    console.log(ninetyDaysFromNow);


    ///// Validate date input values using regular expressions
    var yearReg = /^(202[3-4])$/;            ///< Allows a number between 2023 and 2024
    var monthReg = /^(0?[1-9]|1[0-2])$/;               ///< Allows a number between 00 and 12
    var dayReg = /^(0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/;   ///< Allows a number between 00 and 31

    if (dayReg.test(futureDay) && monthReg.test(futureMonth) && yearReg.test(futureYear) && fullFutureDate > ninetyDaysFromNow) {
      res.redirect('kickout/ineligible-ninety-date-kickout');
    } else if (dayReg.test(futureDay) && monthReg.test(futureMonth) && yearReg.test(futureYear) && fullFutureDate <= ninetyDaysFromNow) {
        res.redirect('eligibility-uk-state-pension');
    } else if (futureDay == '' && monthReg.test(futureMonth) && yearReg.test(futureYear)) {
        res.redirect('eligibility-move-date-plan-day-error');
    } else if (dayReg.test(futureDay) && futureMonth == '' && yearReg.test(futureYear)) {
        res.redirect('eligibility-move-date-plan-month-error');
    } else if (dayReg.test(futureDay) && monthReg.test(futureMonth) && futureYear == '') {
        res.redirect('eligibility-move-date-plan-year-error');
    } else if (futureDay == '' && futureMonth == '' && yearReg.test(futureYear)) {
        res.redirect('eligibility-move-date-plan-day-month-error');
    } else if (dayReg.test(futureDay) && futureMonth == '' && futureYear == '') {
        res.redirect('eligibility-move-date-plan-month-year-error');
    } else if (futureDay == '' && monthReg.test(futureMonth) && futureYear == '') {
        res.redirect('eligibility-move-date-plan-day-year-error');
    } else if (futureDay == '' && futureMonth == '' && futureYear == '') {
        res.redirect('eligibility-move-date-plan-error');
    } else {
        res.redirect('eligibility-move-date-plan-invalid-error');
    }

    // Eligibility Check Your Answers
    router.get(/eligibility-cya-1/, function (req, res) {

        //Today's date
        const now = new Date();
        const yyyy = now.getFullYear();
        let mm = now.getMonth() + 1; 
        const dd = now.getDate();
        const formatToday = dd + '/' + mm + '/' + yyyy;

        // console.log(formatToday);

        var todayDate = new Date(formatToday.split('/')[2], formatToday.split('/')[1] - 1, formatToday.split('/')[0]);
        // console.log(todayDate);

        // 90 days from today 
        var ninetyDays = new Date(todayDate.getTime() + (90 * 24 * 60 * 60 * 1000));
        // console.log(ninetyDays);

        // Convert format
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
        var ninetyDaysFromNow = dateTimeFormat.format(ninetyDays);
        console.log(ninetyDaysFromNow);

        const futureYear = req.session.data['futureYear'];
        console.log(futureYear);
        const futureMonth = req.session.data['futureMonth'];
        const futureDay = req.session.data['futureDay'];
        //When did you start living in S1 country?
                
        const formatLiveDate = futureDay + '/' + futureMonth + '/' + futureYear;

        console.log(formatLiveDate);

        var liveDate = new Date(formatLiveDate.split('/')[2], formatLiveDate.split('/')[1] - 1, formatLiveDate.split('/')[0]);
        console.log(liveDate);

        //Convert format
        const liveOptions = { year: 'numeric', month: 'long', day: 'numeric' };

        const liveDateTimeFormat = new Intl.DateTimeFormat('en-GB', liveOptions);
        var liveDateFormatted = liveDateTimeFormat.format(liveDate);
        // var liveDateFormatted = "1 March 2021"
        console.log(liveDateFormatted);

        res.render('mvp/eligibility/eligibility-cya-1', {liveDateFormatted: liveDateFormatted, ninetyDaysFromNow: ninetyDaysFromNow});
    })
})

// When did you move to [Country] ?

router.post([/eligibility-move-date/, /eligibility-move-date-day-error/, /eligibility-move-date-month-error/, /eligibility-move-date-plan-year-error/, /eligibility-move-date-day-month-error/, /eligibility-move-date-month-year-error/, /eligibility-move-date-day-year-error/, /eligibility-move-date-error/, /eligibility-move-date-invalid-error/], function (req, res){

    // Get the Move Date values from the (dd / mm / yyyy) separate date inputs 
    var moveDay = req.session.data['moveDay'];
    var moveMonth = req.session.data['moveMonth'];
    var moveYear = req.session.data['moveYear'];

    // // Join the Move Date input values into one string date
    // const moveDate = moveDay + '/' + moveMonth + '/' + moveYear;

    // // Convert the string date into a Date value format that is recognised by JS, 
    //     // ready to use in logic for comparing dates
    // var fullMoveDate = new Date(moveDate.split('/')[2], moveDate.split('/')[1] - 1, moveDate.split('/')[0]);

    // //Today's date
    // const now = new Date();
    // const yyyy = now.getFullYear();
    // let mm = now.getMonth() + 1; 
    // const dd = now.getDate();
    // const formatToday = dd + '/' + mm + '/' + yyyy;

    // console.log(formatToday);

    // var todayDate = new Date(formatToday.split('/')[2], formatToday.split('/')[1] - 1, formatToday.split('/')[0]);
    // console.log(todayDate);

    // // 90 days from today 
    // var ninetyDaysFromNow = new Date(todayDate.getTime() + (92 * 86400000));
    // console.log(ninetyDaysFromNow);


    ///// Validate date input values using regular expressions
    var yearReg = /^(200[0-9]|201[0-9]|202[0-4])$/;     ///< Allows a number between 2000 and 2024
    var monthReg = /^(0?[1-9]|1[0-2])$/;               ///< Allows a number between 00 and 12
    var dayReg = /^(0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/;   ///< Allows a number between 00 and 31

    // var firstJan = new Date("1/1/2021");
    // console.log(firstJan);
    // var thirtyOneOct = new Date("10/31/2021");
    // console.log(thirtyOneOct);
    // var firstNov = new Date("11/1/2021");
    // console.log(firstNov);

    if (dayReg.test(moveDay) && monthReg.test(moveMonth) && yearReg.test(moveYear)) {
        res.redirect('eligibility-uk-state-pension');
    } if (moveDay == '' && monthReg.test(moveMonth) && yearReg.test(moveYear)) {
        res.redirect('eligibility-move-date-day-error');
    } if (dayReg.test(moveDay) && moveMonth == '' && yearReg.test(moveYear)) {
        res.redirect('eligibility-move-date-month-error');
    } if (dayReg.test(moveDay) && monthReg.test(moveMonth) && moveYear == '') {
        res.redirect('eligibility-move-date-year-error');
    } if (moveDay == '' && moveMonth == '' && yearReg.test(moveYear)) {
        res.redirect('eligibility-move-date-day-month-error');
    } if (dayReg.test(moveDay) && moveMonth == '' && moveYear == '') {
        res.redirect('eligibility-move-date-month-year-error');
    } if (moveDay == '' && monthReg.test(moveMonth) && moveYear == '') {
        res.redirect('eligibility-move-date-day-year-error');
    } if (moveDay == '' && moveMonth == '' && moveYear == '') {
        res.redirect('eligibility-move-date-error');
    } if (!dayReg.test(moveDay) || !monthReg.test(moveMonth) || !yearReg.test(moveYear)) {
        res.redirect('eligibility-move-date-invalid-error');
    }

    router.get(/eligibility-cya-2/, function (req, res) {

        //Today's date
        const now = new Date();
        const yyyy = now.getFullYear();
        let mm = now.getMonth() + 1; 
        const dd = now.getDate();
        const formatToday = dd + '/' + mm + '/' + yyyy;
    
        // console.log(formatToday);
    
        var todayDate = new Date(formatToday.split('/')[2], formatToday.split('/')[1] - 1, formatToday.split('/')[0]);
        // console.log(todayDate);
    
        // 90 days from today 
        var ninetyDays = new Date(todayDate.getTime() + (90 * 24 * 60 * 60 * 1000));
        // console.log(ninetyDays);
    
        // Convert format
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
        const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
        var ninetyDaysFromNow = dateTimeFormat.format(ninetyDays);
        console.log(ninetyDaysFromNow);
    
        const moveYear = req.session.data['moveYear'];
        console.log(moveYear);
        const moveMonth = req.session.data['moveMonth'];
        const moveDay = req.session.data['moveDay'];
        const formatMoveDate = moveDay + '/' + moveMonth + '/' + moveYear;
        console.log(formatMoveDate);
    
        var moveDate = new Date(formatMoveDate.split('/')[2], formatMoveDate.split('/')[1] - 1, formatMoveDate.split('/')[0]);
        console.log(moveDate);
    
        // Convert format
        const moveOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    
        const moveDateTimeFormat = new Intl.DateTimeFormat('en-GB', moveOptions);
        var moveDateFormatted = moveDateTimeFormat.format(moveDate);
        // var moveDateFormatted = "1 February 2024"
        console.log(moveDateFormatted);
    
        res.render('mvp/eligibility/eligibility-cya-2', { moveDateFormatted: moveDateFormatted, ninetyDaysFromNow: ninetyDaysFromNow});
    })
})


// What is your nationality status? - nationality-status.html

//Version 2: Nationality Checkboxes

// function arraysContainSame(a, b) {
//     a = Array.isArray(a) ? a : [];
//     b = Array.isArray(b) ? b : [];
//     return a.length === b.length && a.every(el => b.includes(el));
//   }

//   router.post(/nationality-status/, function (req, res) {

//     var nationalityStatus = req.session.data['nationalityStatus'];
//     console.log(nationalityStatus);

//     if (arraysContainSame(nationalityStatus, ['UK', 'Other']) == true) {
//       res.redirect('studying-uk-citizen')
//     }
//     else if (nationalityStatus == 'UK') {
//       res.redirect('studying-uk-citizen')
//     }
//     else if (arraysContainSame(nationalityStatus, ['UK', 'EU, EEA or Swiss', 'Other']) == true) {
//       res.redirect('birth-country-uk')
//     }
//     else if (arraysContainSame(nationalityStatus, ['EU, EEA or Swiss', 'Other']) == true) {
//       res.redirect('uk-citizenship')
//     }
//     else if (nationality == 'EU, EEA or Swiss') {
//       res.redirect('uk-citizenship')
//     }
//     else if (nationality == 'Other') {
//       res.redirect('uk-citizenship')
//     }
//     else if (arraysContainSame(nationalityStatus, ['UK', 'EU, EEA or Swiss']) == true) {
//       res.redirect('birth-country-uk')
//     }
//     else {
//       res.redirect('nationality')
//     }
//   })


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
    //var ninetyDays = new Date(todayDate.getTime() + (92 * 86400000));
    var ninetyDays = new Date(todayDate.getTime() + ( 90 * 24 * 60 * 60 * 1000));
    console.log(ninetyDays);

    // Code to add 90 days to input Time
    // let ut = document.getElementById("updatedTime")
    // function add() {
    //    setInterval(() => {
    //       let currentTime = new Date().getTime();
    //       let updatedTIme = new Date(currentTime + 2 * 24 * 60 * 60 * 1000);
    //       ut.innerText = "Updated Date : " + updatedTIme.toLocaleDateString()
    //    }, 1000)
    // }

    // Convert format
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
    var ninetyDaysFromNow = dateTimeFormat.format(ninetyDays);
    console.log(ninetyDaysFromNow);
    
    res.render('mvp/eligibility/eligibility-uk-state-pension', {ninetyDaysFromNow: ninetyDaysFromNow});
})


router.get(/dependant-cya/, function (req, res) {

    //Today's date
    const year = req.session.data['dependant-year'];
    const month = req.session.data['dependant-month'];
    const day = req.session.data['dependant-day'];
    const formatDob = day + '/' + month + '/' + year;

    console.log(formatDob);

    var depDobDate = new Date(formatDob.split('/')[2], formatDob.split('/')[1] - 1, formatDob.split('/')[0]);
    console.log(depDobDate);

    // Convert format
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    var dependantCheck = req.session.data['dependantCheck'];
    if (dependantCheck == 'Yes'){
    const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
    var depDobDateFormatted = dateTimeFormat.format(depDobDate);
    console.log(depDobDateFormatted);
    }
    
    res.render('mvp/apply/dependant-cya', {depDobDateFormatted: depDobDateFormatted});
})

// Are you being paid a UK State Pension, or will you be paid your UK State Pension before [90 days from today]?

router.post([/eligibility-uk-state-pension/, /eligibility-uk-state-pension-error/], function(req, res){
    var ukStatePension = req.session.data['ukStatePension'];

    if (ukStatePension == 'Yes'){
        res.redirect('eligibility-state-pension-check');
    } if (ukStatePension == 'No'){
        res.redirect('kickout/ineligible-no-uk-state-pension');
    } else {
        res.redirect('eligibility-uk-state-pension-error');
    }
})


// Do you get a State Pension from country you’re moving to?

router.post([/eligibility-state-pension-check/, /eligibility-state-pension-check-error/], function(req, res){
    var statePensionCheck = req.session.data['statePensionCheck'];
    var countrySOne = req.session.data['countrySOne'];

    if (!statePensionCheck) {
        res.redirect('eligibility-state-pension-check-error');
    } else if (statePensionCheck == 'Yes'){
        res.redirect('kickout/ineligible-sone-state-pension');
    } else if (statePensionCheck == 'No' && countrySOne == 'Germany'){
        res.redirect('eligibility-germany-contributions');
    } else if (statePensionCheck == 'No' && countrySOne != 'Germany'){
        res.redirect('eligibility-other-eu-state-pension');
    }
})


// Have you paid Statutory Health Contributions to Germany?

router.post([/eligibility-germany-contributions/, /eligibility-germany-contributions-error/], function(req, res) {
    var germanyCountributions = req.session.data['germanyContributions'];

    if (germanyCountributions == 'Yes'){
        res.redirect('kickout/ineligible-germany-contributions');
    } if (germanyCountributions == 'No') {
        res.redirect('eligibility-other-eu-state-pension');
    } else if (!germanyCountributions) {
        res.redirect('eligibility-germany-contributions-error');
    }
})


// Do you also get a State Pension from an EU or EFTA country?

router.post([/eligibility-other-eu-state-pension/, /eligibility-other-eu-state-pension-error/], function (req, res){
    var euStatePension = req.session.data['euStatePension'];
    var moveCheck = req.session.data['moveCheck'];

    if (euStatePension == 'Yes'){
        res.redirect('eligibility-eu-country-state-pension');
    } if (euStatePension == 'No' && moveCheck == 'No'){
        res.redirect('eligibility-cya-1');
    } if (euStatePension == 'No' && moveCheck == 'Yes'){
        res.redirect('eligibility-cya-2');
    } else {
        res.redirect('eligibility-other-eu-state-pension-error');
    }
})


// Which countries do you get a State Pension from, other than the UK?

router.post([/eligibility-eu-country-state-pension/, /eligibility-eu-country-state-pension-error/, /eligibility-eu-country-state-pension-other-error/], function(req, res) {
    console.log(req.session.data);

    var euCountryPension = req.session.data['myInputsEUSP'];
    var countrySOne = req.session.data['countrySOne'];
    var moveCheck = req.session.data['moveCheck'];

    // arraysContainSame(req.body.nationality, ['UK', 'EU, EEA', 'Other']) === true
    // arraysContainSame(euCountryPension, ['Iceland']) === true

    // if (euCountryPension == countrySOne){
    //     return res.redirect('kickout/ineligible-sone-state-pension');
    // } else if (euCountryPension == 'Iceland' || euCountryPension == 'Liechtenstein' || euCountryPension == 'Norway'){
    //     return res.redirect('eligibility-eu-state-pension-amount');
    // } else if (euCountryPension == 'Austria' || euCountryPension == 'Belgium' || euCountryPension == 'Bulgaria' || euCountryPension == 'Denmark'){
    //     return res.redirect('eligibility-eu-state-pension-amount');
    // } else if (euCountryPension == 'Czech Republic' || euCountryPension == 'Estonia' || euCountryPension == 'Finland' || euCountryPension == 'France') {
    //     return res.redirect('eligibility-eu-state-pension-amount');
    // } else if (euCountryPension == 'Germany' || euCountryPension == 'Greece' || euCountryPension == 'Hungary' || euCountryPension == 'Ireland' || euCountryPension == 'Italy') {
    //     return res.redirect('eligibility-eu-state-pension-amount');
    // } else if (euCountryPension == 'Latvia' || euCountryPension == 'Lithuania' || euCountryPension == 'Luxemburg' || euCountryPension == 'Malta' || euCountryPension == 'Montenegro') {
    //     return res.redirect('eligibility-eu-state-pension-amount');
    // } else if (euCountryPension == 'Netherlands' || euCountryPension == 'Poland' || euCountryPension == 'Portugal' || euCountryPension == 'Romania' || euCountryPension == 'Slovakia' || euCountryPension == 'Switzerland') {
    //     return res.redirect('eligibility-eu-state-pension-amount');
    // } else if (euCountryPension == 'Slovenia' || euCountryPension == 'Spain' || euCountryPension == 'Sweden') {
    //     return res.redirect('eligibility-eu-state-pension-amount');
    // } else if (euCountryPension == ''){
    //     return res.redirect('eligibility-eu-country-state-pension-error');
    // } else {
    //     return res.redirect('eligibility-eu-country-state-pension-other-error');
    // }


    // if (euCountryPension == countrySOne){
    //     return res.redirect('kickout/ineligible-sone-state-pension');
    // } else if (arraysContainSame(euCountryPension, ['Iceland']) === true || arraysContainSame(euCountryPension, ['Liechtenstein']) === true  || arraysContainSame(euCountryPension, ['Norway']) === true) {
    //     return res.redirect('eligibility-eu-state-pension-amount');
    // } else if (arraysContainSame(euCountryPension, ['Austria']) === true || arraysContainSame(euCountryPension, ['Belgium']) === true || arraysContainSame(euCountryPension, ['Bulgaria']) === true || arraysContainSame(euCountryPension, ['Denmark']) === true){
    //     return res.redirect('eligibility-eu-state-pension-amount');
    // } else if (arraysContainSame(euCountryPension, ['Czech Republic']) === true || arraysContainSame(euCountryPension, ['Estonia']) === true || arraysContainSame(euCountryPension, ['Finland']) === true || arraysContainSame(euCountryPension, ['France']) === true) {
    //     return res.redirect('eligibility-eu-state-pension-amount');
    // } else if (arraysContainSame(euCountryPension, ['Germany']) === true || arraysContainSame(euCountryPension, ['Greece']) === true || arraysContainSame(euCountryPension, ['Hungary']) === true || arraysContainSame(euCountryPension, ['Ireland']) === true || arraysContainSame(euCountryPension, ['Italy']) === true) {
    //     return res.redirect('eligibility-eu-state-pension-amount');
    // } else if (arraysContainSame(euCountryPension, ['Latvia']) === true || arraysContainSame(euCountryPension, ['Lithuania']) === true || arraysContainSame(euCountryPension, ['Luxemburg']) === true || arraysContainSame(euCountryPension, ['Malta']) === true || arraysContainSame(euCountryPension, ['Montenegro']) === true) {
    //     return res.redirect('eligibility-eu-state-pension-amount');
    // } else if (arraysContainSame(euCountryPension, ['Netherlands']) === true || arraysContainSame(euCountryPension, ['Poland']) === true || arraysContainSame(euCountryPension, ['Portugal']) === true || arraysContainSame(euCountryPension, ['Romania']) === true || arraysContainSame(euCountryPension, ['Slovakia']) === true || arraysContainSame(euCountryPension, ['Switzerland']) === true) {
    //     return res.redirect('eligibility-eu-state-pension-amount');
    // } else if (arraysContainSame(euCountryPension, ['Slovenia']) === true || arraysContainSame(euCountryPension, ['Spain']) === true || arraysContainSame(euCountryPension, ['Sweden']) === true) {
    //     return res.redirect('eligibility-eu-state-pension-amount');
    // } else if (euCountryPension == ''){
    //     return res.redirect('eligibility-eu-country-state-pension-error');
    // } else {
    //     return res.redirect('eligibility-eu-country-state-pension-other-error');
    // }

    if (euCountryPension.includes(countrySOne) === true ){
        return res.redirect('kickout/ineligible-sone-state-pension');
    } else if (moveCheck == 'No' && (euCountryPension.includes('Iceland') === true || euCountryPension.includes('Liechtenstein') === true  || euCountryPension.includes('Norway') === true)) {
        return res.redirect('../eligibility/eligibility-cya-1');
    } else if (moveCheck == 'Yes' && (euCountryPension.includes('Iceland') === true || euCountryPension.includes('Liechtenstein') === true  || euCountryPension.includes('Norway') === true)) {
        return res.redirect('../eligibility/eligibility-cya-2');
    } else if (moveCheck == 'No' && (euCountryPension.includes('Austria') === true || euCountryPension.includes('Belgium') === true || euCountryPension.includes('Bulgaria') === true || euCountryPension.includes('Denmark') === true)){
        return res.redirect('../eligibility/eligibility-cya-1');
    } else if (moveCheck == 'Yes' && (euCountryPension.includes('Austria') === true || euCountryPension.includes('Belgium') === true || euCountryPension.includes('Bulgaria') === true || euCountryPension.includes('Denmark') === true)){
        return res.redirect('../eligibility/eligibility-cya-2');
    } else if (moveCheck == 'No' && (euCountryPension.includes('Czech Republic') === true || euCountryPension.includes('Estonia') === true || euCountryPension.includes('Finland') === true || euCountryPension.includes('France') === true)) {
        return res.redirect('../eligibility/eligibility-cya-1');
    } else if (moveCheck == 'Yes' && (euCountryPension.includes('Czech Republic') === true || euCountryPension.includes('Estonia') === true || euCountryPension.includes('Finland') === true || euCountryPension.includes('France') === true)) {
        return res.redirect('../eligibility/eligibility-cya-2');
    } else if (moveCheck == 'No' && (euCountryPension.includes('Germany') === true || euCountryPension.includes('Greece') === true || euCountryPension.includes('Hungary') === true || euCountryPension.includes('Ireland') === true || euCountryPension.includes('Italy') === true)) {
        return res.redirect('../eligibility/eligibility-cya-1');
    } else if (moveCheck == 'Yes' && (euCountryPension.includes('Germany') === true || euCountryPension.includes('Greece') === true || euCountryPension.includes('Hungary') === true || euCountryPension.includes('Ireland') === true || euCountryPension.includes('Italy') === true)) {
        return res.redirect('../eligibility/eligibility-cya-2');
    } else if (moveCheck == 'No' && (euCountryPension.includes('Latvia') === true || euCountryPension.includes('Lithuania') === true || euCountryPension.includes('Luxemburg') === true || euCountryPension.includes('Malta') === true || euCountryPension.includes('Montenegro') === true)) {
        return res.redirect('../eligibility/eligibility-cya-1');
    } else if (moveCheck == 'Yes' && (euCountryPension.includes('Latvia') === true || euCountryPension.includes('Lithuania') === true || euCountryPension.includes('Luxemburg') === true || euCountryPension.includes('Malta') === true || euCountryPension.includes('Montenegro') === true)) {
        return res.redirect('../eligibility/eligibility-cya-2');
    } else if (moveCheck == 'No' && (euCountryPension.includes('Netherlands') === true || euCountryPension.includes('Poland') === true || euCountryPension.includes('Portugal') === true || euCountryPension.includes('Romania') === true || euCountryPension.includes('Slovakia') === true || euCountryPension.includes('Switzerland') === true)) {
        return res.redirect('../eligibility/eligibility-cya-1');
    } else if (moveCheck == 'Yes' && (euCountryPension.includes('Netherlands') === true || euCountryPension.includes('Poland') === true || euCountryPension.includes('Portugal') === true || euCountryPension.includes('Romania') === true || euCountryPension.includes('Slovakia') === true || euCountryPension.includes('Switzerland') === true)) {
        return res.redirect('../eligibility/eligibility-cya-2');
    } else if (moveCheck == 'No' && (euCountryPension.includes('Slovenia') === true || euCountryPension.includes('Spain') === true || euCountryPension.includes('Sweden') === true)) {
        return res.redirect('../eligibility/eligibility-cya-1');
    } else if (moveCheck == 'Yes' && (euCountryPension.includes('Slovenia') === true || euCountryPension.includes('Spain') === true || euCountryPension.includes('Sweden') === true)) {
        return res.redirect('../eligibility/eligibility-cya-2');
    } else if (euCountryPension == ''){
        return res.redirect('eligibility-eu-country-state-pension-error');
    } else {
        return res.redirect('eligibility-eu-country-state-pension-other-error');
    }
})

// Is your State Pension from [country] more than your UK State Pension? 

router.post([/eligibility-eu-state-pension-amount/, /eligibility-eu-state-pension-amount-error/], function(req, res){
    var euPensionAmount = req.session.data['euPensionAmount'];
    var moveCheck = req.session.data['moveCheck'];

    if (euPensionAmount == 'Yes'){
        res.redirect('kickout/ineligible-other-pension-amount');
    } else if (euPensionAmount == 'No' && moveCheck == 'No') {
        res.redirect('../eligibility/eligibility-cya-1');
    } else if (euPensionAmount == 'No' && moveCheck == 'Yes') {
        res.redirect('../eligibility/eligibility-cya-2');
    } else {
        res.redirect('eligibility-eu-state-pension-amount-error');
    }
})

// Check Your Answers
router.post(/cya/, function(req, res){
    var moveCheck = req.session.data['moveCheck'];

    if (moveCheck == 'No') {
        res.redirect('../eligibility/eligibility-cya-1');
    } else if (moveCheck == 'Yes') {
        res.redirect('../eligibility/eligibility-cya-2');
    }
})

// Eligibility Check Your Answers
// router.get(/eligibility-cya-2/, function (req, res) {

//     //Today's date
//     const now = new Date();
//     const yyyy = now.getFullYear();
//     let mm = now.getMonth() + 1; 
//     const dd = now.getDate();
//     const formatToday = dd + '/' + mm + '/' + yyyy;

//     // console.log(formatToday);

//     var todayDate = new Date(formatToday.split('/')[2], formatToday.split('/')[1] - 1, formatToday.split('/')[0]);
//     // console.log(todayDate);

//     // 90 days from today 
//     var ninetyDays = new Date(todayDate.getTime() + (90 * 24 * 60 * 60 * 1000));
//     // console.log(ninetyDays);

//     // Convert format
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };

//     const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
//     var ninetyDaysFromNow = dateTimeFormat.format(ninetyDays);
//     console.log(ninetyDaysFromNow);

//     const futureYear = req.session.data['futureYear'];
//     console.log(futureYear);
//     const futureMonth = req.session.data['futureMonth'];
//     const futureDay = req.session.data['futureDay'];
//     //When did you start living in S1 country?
            
//     const formatLiveDate = futureDay + '/' + futureMonth + '/' + futureYear;

//     console.log(formatLiveDate);

//     var liveDate = new Date(formatLiveDate.split('/')[2], formatLiveDate.split('/')[1] - 1, formatLiveDate.split('/')[0]);
//     console.log(liveDate);

//     //Convert format
//     const liveOptions = { year: 'numeric', month: 'long', day: 'numeric' };

//     const liveDateTimeFormat = new Intl.DateTimeFormat('en-GB', liveOptions);
//     var liveDateFormatted = liveDateTimeFormat.format(liveDate);
//     // var liveDateFormatted = "1 March 2021"
//     console.log(liveDateFormatted);

//     res.render('mvp/eligibility/eligibility-cya-2', {liveDateFormatted: liveDateFormatted, ninetyDaysFromNow: ninetyDaysFromNow});
// })

// router.get(/eligibility-cya-1/, function (req, res) {

//     //Today's date
//     const now = new Date();
//     const yyyy = now.getFullYear();
//     let mm = now.getMonth() + 1; 
//     const dd = now.getDate();
//     const formatToday = dd + '/' + mm + '/' + yyyy;

//     // console.log(formatToday);

//     var todayDate = new Date(formatToday.split('/')[2], formatToday.split('/')[1] - 1, formatToday.split('/')[0]);
//     // console.log(todayDate);

//     // 90 days from today 
//     var ninetyDays = new Date(todayDate.getTime() + (90 * 24 * 60 * 60 * 1000));
//     // console.log(ninetyDays);

//     // Convert format
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };

//     const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
//     var ninetyDaysFromNow = dateTimeFormat.format(ninetyDays);
//     console.log(ninetyDaysFromNow);

//     const moveYear = req.session.data['moveYear'];
//     console.log(moveYear);
//     const moveMonth = req.session.data['moveMonth'];
//     const moveDay = req.session.data['moveDay'];
//     const formatMoveDate = moveDay + '/' + moveMonth + '/' + moveYear;
//     console.log(formatMoveDate);

//     var moveDate = new Date(formatMoveDate.split('/')[2], formatMoveDate.split('/')[1] - 1, formatMoveDate.split('/')[0]);
//     console.log(moveDate);

//     // Convert format
//     const moveOptions = { year: 'numeric', month: 'long', day: 'numeric' };

//     const moveDateTimeFormat = new Intl.DateTimeFormat('en-GB', moveOptions);
//     var moveDateFormatted = moveDateTimeFormat.format(moveDate);
//     // var moveDateFormatted = "1 February 2024"
//     console.log(moveDateFormatted);

//     res.render('mvp/eligibility/eligibility-cya-1', { moveDateFormatted: moveDateFormatted, ninetyDaysFromNow: ninetyDaysFromNow});
// })

// Check Your Answers
router.get(/application-dependant-cya/, function(req, res){
    //Today's date
    const now = new Date();
    const yyyy = now.getFullYear();
    let mm = now.getMonth() + 1; 
    const dd = now.getDate();
    const formatToday = dd + '/' + mm + '/' + yyyy;

    // console.log(formatToday);

    var todayDate = new Date(formatToday.split('/')[2], formatToday.split('/')[1] - 1, formatToday.split('/')[0]);
    // console.log(todayDate);

    // 90 days from today 
    var ninetyDays = new Date(todayDate.getTime() + (90 * 24 * 60 * 60 * 1000));
    // console.log(ninetyDays);

    // Convert format
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
    var ninetyDaysFromNow = dateTimeFormat.format(ninetyDays);
    // console.log(ninetyDaysFromNow);

    const futureDay = req.session.data['futureDay'];
    
    if(!futureDay){
        var moveDateFormatted = "1 February 2024"
        console.log(moveDateFormatted);
    }

    const moveDay = req.session.data['moveDay'];

    if(!moveDay){
        var liveDateFormatted = "1 March 2021"
        console.log(liveDateFormatted);
    }

    //Today's date
    const year = req.session.data['dependant-year'];
    const month = req.session.data['dependant-month'];
    const day = req.session.data['dependant-day'];
    const formatDob = day + '/' + month + '/' + year;

    console.log(formatDob);

    var depDobDate = new Date(formatDob.split('/')[2], formatDob.split('/')[1] - 1, formatDob.split('/')[0]);
    console.log(depDobDate);

    // Convert format
    const depDobOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    const depDobDateTimeFormat = new Intl.DateTimeFormat('en-GB', depDobOptions);
    var depDobDateFormatted = depDobDateTimeFormat.format(depDobDate);
    console.log(depDobDateFormatted);

    res.render('mvp/apply/application-dependant-cya', { moveDateFormatted: moveDateFormatted, liveDateFormatted: liveDateFormatted, ninetyDaysFromNow: ninetyDaysFromNow, depDobDateFormatted: depDobDateFormatted});
})

router.get(/application-nodependant-cya/, function(req, res){
    //Today's date
    const now = new Date();
    const yyyy = now.getFullYear();
    let mm = now.getMonth() + 1; 
    const dd = now.getDate();
    const formatToday = dd + '/' + mm + '/' + yyyy;

    // console.log(formatToday);

    var todayDate = new Date(formatToday.split('/')[2], formatToday.split('/')[1] - 1, formatToday.split('/')[0]);
    // console.log(todayDate);

    // 90 days from today 
    var ninetyDays = new Date(todayDate.getTime() + (90 * 24 * 60 * 60 * 1000));
    // console.log(ninetyDays);

    // Convert format
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
    var ninetyDaysFromNow = dateTimeFormat.format(ninetyDays);
    // console.log(ninetyDaysFromNow);

    const futureDay = req.session.data['futureDay'];
    
    if(!futureDay){
        var moveDateFormatted = "1 February 2024"
        console.log(moveDateFormatted);
    }

    const moveDay = req.session.data['moveDay'];

    if(!moveDay){
        var liveDateFormatted = "1 March 2021"
        console.log(liveDateFormatted);
    }
    res.render('mvp/apply/application-nodependant-cya', { moveDateFormatted: moveDateFormatted, liveDateFormatted: liveDateFormatted, ninetyDaysFromNow: ninetyDaysFromNow});
})

// // Do you get a State Pension from another country? (2)

// router.post([/eligibility-other-state-pension-two/, /eligibility-other-state-pension-two-error/], function (req, res){
//     var otherStatePensionTwo = req.session.data['otherStatePensionTwo'];

//     if (otherStatePensionTwo == 'Yes'){
//         res.redirect('eligibility-eu-country-state-pension-two');
//     } if (otherStatePensionTwo == 'No'){
//         res.redirect('applicant-name');
//     } else {
//         res.redirect('eligibility-other-state-pension-two-error');
//     }
// })

// // // Which other countries do you get a State Pension from? (2)

// router.post([/eligibility-eu-country-state-pension-two/, /eligibility-eu-country-state-pension-two-error/], function(req, res) {
//     var euCountryPensionTwo = req.session.data['euCountryPensionTwo'];
//     var countrySOne = req.session.data['countrySOne'];

//     if (euCountryPensionTwo == countrySOne){
//         res.redirect('kickout/ineligible-sone-state-pensiont');
//     } if (euCountryPensionTwo == 'Iceland' || euCountryPensionTwo == 'Liechtenstein' || euCountryPensionTwo == 'Norway'){
//         res.redirect('eligibility-eu-state-pension-amount-two');
//     } if (euCountryPensionTwo == 'Austria' || euCountryPensionTwo == 'Belgium' || euCountryPensionTwo == 'Bulgaria' || euCountryPensionTwo == 'Denmark' ){
//         res.redirect('eligibility-eu-state-pension-amountt-two');
//     } if (euCountryPensionTwo == 'Czech Republic' || euCountryPensionTwo == 'Estonia' || euCountryPensionTwo == 'Finland' || euCountryPensionTwo == 'France') {
//         res.redirect('eligibility-eu-state-pension-amountt-two');
//     } if (euCountryPensionTwo == 'Germany' || euCountryPensionTwo == 'Greece' || euCountryPensionTwo == 'Hungary' || euCountryPensionTwo == 'Ireland' || euCountryPensionTwo == 'Italy') {
//         res.redirect('eligibility-eu-state-pension-amountt-two');
//     } if (euCountryPensionTwo == 'Latvia' || euCountryPensionTwo == 'Lithuania' || euCountryPensionTwo == 'Luxemburg' || euCountryPensionTwo == 'Malta' || euCountryPensionTwo == 'Montenegro') {
//         res.redirect('eligibility-eu-state-pension-amountt-two');
//     }  if (euCountryPensionTwo == 'Netherlands' || euCountryPensionTwo == 'Poland' || euCountryPensionTwo == 'Portugal' || euCountryPensionTwo == 'Romania' || euCountryPensionTwo == 'Slovakia' || euCountryPensionTwo == 'Switzerland') {
//         res.redirect('eligibility-eu-state-pension-amountt-two');
//     }  if (euCountryPensionTwo == 'Slovenia' || euCountryPensionTwo == 'Spain' || euCountryPensionTwo == 'Sweden') {
//         res.redirect('eligibility-eu-state-pension-amountt-two');
//     } if (euCountryPensionTwo == ''){
//         res.redirect('eligibility-eu-country-state-pension-two-error');
//     } else {
//         res.redirect('eligibility-eu-state-pension-amount-two');
//     }
// })

// // Is your State Pension from [country] more than your UK State Pension? (2)

// router.post([/eligibility-eu-state-pension-amount-two/, /eligibility-eu-state-pension-amount-two-error/], function(req, res){
//     var euPensionAmountTwo = req.session.data['euPensionAmountTwo'];

//     if (euPensionAmountTwo == 'Yes'){
//         res.redirect('kickout/ineligible-other-pension-amount');
//     } if (euPensionAmountTwo == 'No'){
//         res.redirect('cya-pension-countries');
//     } else {
//         res.redirect('eligibility-eu-state-pension-amount-two-error');
//     }
// })

//

// What is your name?

router.post([/applicant-name/, /applicant-firstname-error/, /applicant-surname-error/, /applicant-name-error/], function (req,res) {
    console.log(req.body.firstName);
    console.log(req.body.surname);

    if(req.body.firstName === '' && req.body.surname === '') {
        res.redirect('applicant-name-error');
    } else if (req.body.firstName !== '' && req.body.surname === '') {
        res.redirect('applicant-firstname-error');
    } else if (req.body.firstName === '' && req.body.surname !== '') {
        res.redirect('applicant-surname-error');
    } else if(req.body.firstName !== '' && req.body.surname !== '') {
        res.redirect('applicant-dob');
    } 
})


// What is your date of birth?

router.post([/applicant-dob/, /applicant-dob-error/, /applicant-dob-day-error/, /applicant-dob-day-month-error/, /applicant-dob-month-error/, /applicant-dob-month-year-error/, /applicant-dob-day-year-error/, /applicant-dob-year-error/], function (req, res) {
    const day = req.session.data['example-day'];
    const month = req.session.data['example-month'];
    const year =req.session.data['example-year'];

    const formatDob = day + '/' + month + '/' + year;
    var dobDate = new Date(formatDob.split('/')[2], formatDob.split('/')[1] - 1, formatDob.split('/')[0]);
    
    var yearRegEx = /^(19[1-9][0-9])$/;            ///< Allows a number between 2021 and 2022
    var monthRegEx = /^(0?[1-9]|1[0-2])$/;               ///< Allows a number between 00 and 12
    var dayRegEx = /^(0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/;   ///< Allows a number between 00 and 31
    
    //wip

    //Today's date
    const now = new Date();
    const yyyy = now.getFullYear();
    let mm = now.getMonth() + 1; 
    const dd = now.getDate();
    const formatToday = dd + '/' + mm + '/' + yyyy;

    console.log(formatToday);
    var todayDate = new Date(formatToday.split('/')[2], formatToday.split('/')[1] - 1, formatToday.split('/')[0]);

    // 90 days from today 
    var ninetyDays = new Date(todayDate.getTime() + (90 * 24 * 60 * 60 * 1000));
    console.log(ninetyDays);

    function diff_years(dt2, dt1) 
    {

    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24);
        return Math.abs(Math.round(diff/365.25));

    }

    dt1 = ninetyDays;
    dt2 = dobDate;
    const diffDate = diff_years(dt1, dt2);
    console.log(diffDate);

    // Validation for under 67 pension age
    // } else if(req.body.dateOfBirth !== '' && dayRegEx.test(day) && monthRegEx.test(month) && yearRegEx.test(year) && diffDate < 67) {
    //     res.redirect('applicant-dob-ineligible-error');
    // } else if(req.body.dateOfBirth !== '' && dayRegEx.test(day) && monthRegEx.test(month) && yearRegEx.test(year) && diffDate >= 67) {
    //     res.redirect('applicant-nino');
    // }   
    

    if(day === '' && month === '' && year === '') {
        res.redirect('applicant-dob-error');
    } else if(day === '' && month !== '' && year !== ''){
        res.redirect('applicant-dob-day-error');
    } else if(day === '' && month === '' && year !== ''){
        res.redirect('applicant-dob-day-month-error');
    } else if(day === '' && month !== '' && year === ''){
        res.redirect('applicant-dob-day-year-error');
    } else if(day !== '' && month !== '' && year === ''){
        res.redirect('applicant-dob-year-error');
    } else if(day !== '' && !dayRegEx.test(day) && month !== '' && !monthRegEx.test(month) && year !== '' && !yearRegEx.test(year)) {
        res.redirect('applicant-dob-error');
    } else if(day !== '' && !dayRegEx.test(day) && month !== '' && monthRegEx.test(month) && year !== '' && yearRegEx.test(year)) {
        res.redirect('applicant-dob-day-error');
    } else if(day !== '' && !dayRegEx.test(day) && month !== '' && !monthRegEx.test(month) && year !== '' && yearRegEx.test(year)) {
        res.redirect('applicant-dob-day-month-error');
    } else if(day !== '' && dayRegEx.test(day) && month !== '' && !monthRegEx.test(month) && year !== '' && yearRegEx.test(year)) {
        res.redirect('applicant-dob-month-error');
    } else if(day !== '' && dayRegEx.test(day) && month !== '' && !monthRegEx.test(month) && year !== '' && !yearRegEx.test(year)) {
        res.redirect('applicant-dob-month-year-error');
    } else if(day !== '' && !dayRegEx.test(day) && month !== '' && monthRegEx.test(month) && year !== '' && !yearRegEx.test(year)) {
        res.redirect('applicant-dob-day-year-error');
    } else if(day !== '' && dayRegEx.test(day) && month !== '' && monthRegEx.test(month) && year !== '' && !yearRegEx.test(year)) {
        res.redirect('applicant-dob-year-error');
    } else if(req.body.dateOfBirth !== '' && dayRegEx.test(day) && monthRegEx.test(month) && yearRegEx.test(year) && diffDate < 18) {
        res.redirect('applicant-dob-ineligible-error');
    } else if(req.body.dateOfBirth !== '' && dayRegEx.test(day) && monthRegEx.test(month) && yearRegEx.test(year) && diffDate >= 18) {
        res.redirect('applicant-nino');
    }   

    router.get(/applicant-cya-personal/, function (req, res) {

        //Today's date
        const year = req.session.data['example-year'];
        const month = req.session.data['example-month'];
        const day = req.session.data['example-day'];
        const formatDob = day + '/' + month + '/' + year;
    
        console.log(formatDob);
    
        var dobDate = new Date(formatDob.split('/')[2], formatDob.split('/')[1] - 1, formatDob.split('/')[0]);
        console.log(dobDate);
    
        // Convert format
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
        const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
        var dobDateFormatted = dateTimeFormat.format(dobDate);
        console.log(dobDateFormatted);

        res.render('mvp/apply/applicant-cya-personal', {dobDateFormatted: dobDateFormatted});
    })

    router.get(/submit/, function (req, res) {

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
        var ninetyDays = new Date(todayDate.getTime() + (90 * 24 * 60 * 60 * 1000));
        console.log(ninetyDays);
    
        
        // Convert format
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
        const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
        var ninetyDaysFromNow = dateTimeFormat.format(ninetyDays);
        console.log(ninetyDaysFromNow);

        //Today's date
        const year = req.session.data['example-year'];
        const month = req.session.data['example-month'];
        const day = req.session.data['example-day'];
        const formatDob = day + '/' + month + '/' + year;
    
        console.log(formatDob);
    
        var dobDate = new Date(formatDob.split('/')[2], formatDob.split('/')[1] - 1, formatDob.split('/')[0]);
        console.log(dobDate);
    
        // Convert format
        const dobOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    
        const dobDateTimeFormat = new Intl.DateTimeFormat('en-GB', dobOptions);
        var dobDateFormatted = dobDateTimeFormat.format(dobDate);
        console.log(dobDateFormatted);
    
        //Dependant DOB 
        const depYear = req.session.data['dependant-year'];
        const depMonth = req.session.data['dependant-month'];
        const depDay = req.session.data['dependant-day'];
        const formatDepDob = depDay + '/' + depMonth + '/' + depYear;
    
        if(depYear){
            console.log(formatDepDob);
    
            var depDobDate = new Date(formatDepDob.split('/')[2], formatDepDob.split('/')[1] - 1, formatDepDob.split('/')[0]);
            console.log(depDobDate);
    
            // Convert format
            const depDobOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    
            const depDobDateTimeFormat = new Intl.DateTimeFormat('en-GB', depDobOptions);
            var depDobDateFormatted = depDobDateTimeFormat.format(depDobDate);
            console.log(depDobDateFormatted);
        }
        

        res.render('mvp/eligibility/submit', {ninetyDaysFromNow: ninetyDaysFromNow, dobDateFormatted: dobDateFormatted, depDobDateFormatted: depDobDateFormatted});
    })
})

router.get(/applicant-dob-ineligible-error/, function(req, res){
    //Today's date
    const now = new Date();
    const yyyy = now.getFullYear();
    let mm = now.getMonth() + 1; 
    const dd = now.getDate();
    const formatToday = dd + '/' + mm + '/' + yyyy;

    // console.log(formatToday);

    var todayDate = new Date(formatToday.split('/')[2], formatToday.split('/')[1] - 1, formatToday.split('/')[0]);
    // console.log(todayDate);

    // 90 days from today 
    var ninetyDays = new Date(todayDate.getTime() + (90 * 24 * 60 * 60 * 1000));
    // console.log(ninetyDays);

    // Convert format
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
    var ninetyDaysFromNow = dateTimeFormat.format(ninetyDays);
    // console.log(ninetyDaysFromNow);

    res.render('mvp/apply/applicant-dob-ineligible-error', { ninetyDaysFromNow: ninetyDaysFromNow });
})

router.post(/applicant-dob-ineligible-error/, function (req, res){
    const day = req.session.data['example-day'];
    const month = req.session.data['example-month'];
    const year =req.session.data['example-year'];

    const formatDob = day + '/' + month + '/' + year;
    var dobDate = new Date(formatDob.split('/')[2], formatDob.split('/')[1] - 1, formatDob.split('/')[0]);
    
    var yearRegEx = /^(19[1-9][0-9])$/;            ///< Allows a number between 2021 and 2022
    var monthRegEx = /^(0?[1-9]|1[0-2])$/;               ///< Allows a number between 00 and 12
    var dayRegEx = /^(0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/;   ///< Allows a number between 00 and 31
    
    //wip

    //Today's date
    const now = new Date();
    const yyyy = now.getFullYear();
    let mm = now.getMonth() + 1; 
    const dd = now.getDate();
    const formatToday = dd + '/' + mm + '/' + yyyy;

    console.log(formatToday);
    var todayDate = new Date(formatToday.split('/')[2], formatToday.split('/')[1] - 1, formatToday.split('/')[0]);

    // 90 days from today 
    var ninetyDays = new Date(todayDate.getTime() + (90 * 24 * 60 * 60 * 1000));
    console.log(ninetyDays);

    function diff_years(dt2, dt1) 
    {

    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
      diff /= (60 * 60 * 24);
        return Math.abs(Math.round(diff/365.25));

    }

    dt1 = ninetyDays;
    dt2 = dobDate;
    const diffDate = diff_years(dt1, dt2);
    console.log(diffDate);

    if(day === '' && month === '' && year === '') {
        res.redirect('applicant-dob-error');
    } else if(day === '' && month !== '' && year !== ''){
        res.redirect('applicant-dob-day-error');
    } else if(day === '' && month === '' && year !== ''){
        res.redirect('applicant-dob-day-month-error');
    } else if(day === '' && month !== '' && year === ''){
        res.redirect('applicant-dob-day-year-error');
    } else if(day !== '' && month !== '' && year === ''){
        res.redirect('applicant-dob-year-error');
    } else if(day !== '' && !dayRegEx.test(day) && month !== '' && !monthRegEx.test(month) && year !== '' && !yearRegEx.test(year)) {
        res.redirect('applicant-dob-error');
    } else if(day !== '' && !dayRegEx.test(day) && month !== '' && monthRegEx.test(month) && year !== '' && yearRegEx.test(year)) {
        res.redirect('applicant-dob-day-error');
    } else if(day !== '' && !dayRegEx.test(day) && month !== '' && !monthRegEx.test(month) && year !== '' && yearRegEx.test(year)) {
        res.redirect('applicant-dob-day-month-error');
    } else if(day !== '' && dayRegEx.test(day) && month !== '' && !monthRegEx.test(month) && year !== '' && yearRegEx.test(year)) {
        res.redirect('applicant-dob-month-error');
    } else if(day !== '' && dayRegEx.test(day) && month !== '' && !monthRegEx.test(month) && year !== '' && !yearRegEx.test(year)) {
        res.redirect('applicant-dob-month-year-error');
    } else if(day !== '' && !dayRegEx.test(day) && month !== '' && monthRegEx.test(month) && year !== '' && !yearRegEx.test(year)) {
        res.redirect('applicant-dob-day-year-error');
    } else if(day !== '' && dayRegEx.test(day) && month !== '' && monthRegEx.test(month) && year !== '' && !yearRegEx.test(year)) {
        res.redirect('applicant-dob-year-error');
    } else if(req.body.dateOfBirth !== '' && dayRegEx.test(day) && monthRegEx.test(month) && yearRegEx.test(year) && diffDate < 67) {
        res.redirect('../eligibility/kickout/ineligible-age-kickout');
    } else if(req.body.dateOfBirth !== '' && dayRegEx.test(day) && monthRegEx.test(month) && yearRegEx.test(year) && diffDate >= 67) {
        res.redirect('applicant-nino');
    }   
})


function arraysContainSame(a, b) {
    a = Array.isArray(a) ? a : [];
    b = Array.isArray(b) ? b : [];
    return a.length === b.length && a.every(el => b.includes(el));
}

// What is your nationality?

router.post([/nationality/, /nationality-error/, /nationality-eu-error/, /nationality-eu-other-error/, /nationality-other-error/], function (req, res) {
    var nationality = req.session.data['nationality'];
    console.log(nationality);

    console.log(req.body.nationality);
    console.log(req.body.myInputsEURT);
    console.log(req.body.myInputsOtherRT);
    
    if (arraysContainSame(req.body.nationality, ['UK', 'EU, EEA', 'Other']) === true && req.body.myInputsEURT === '' && req.body.myInputsOther === '') {
        return res.redirect('nationality-eu-other-error');
    }
    else if (arraysContainSame(req.body.nationality, ['UK', 'EU, EEA', 'Other']) === true && req.body.myInputsEURT !== '' && req.body.myInputsOther === '') {
        return res.redirect('nationality-eu-error');
    }
    else if (arraysContainSame(req.body.nationality, ['UK', 'EU, EEA', 'Other']) === true && req.body.myInputsEURT === '' && req.body.myInputsOther !== '') {
        return res.redirect('nationality-other-error');
    }
    else if (arraysContainSame(req.body.nationality, ['EU, EEA', 'Other']) === true && req.body.myInputsEURT === '' && req.body.myInputsOther === '') {
        return res.redirect('nationality-eu-other-error');
    }
    else if (arraysContainSame(req.body.nationality, ['EU, EEA', 'Other']) === true && req.body.myInputsEURT !== '' && req.body.myInputsOther === '') {
        return res.redirect('nationality-other-error');
    }
    else if (arraysContainSame(req.body.nationality, ['EU, EEA', 'Other']) === true && req.body.myInputsEURT === '' && req.body.myInputsOther !== '') {
        return res.redirect('nationality-eu-error');
    }
    else if (arraysContainSame(req.body.nationality, ['UK', 'EU, EEA']) === true && req.body.myInputsEURT === '') {
        return res.redirect('nationality-eu-error');
    }
    else if (req.body.nationality === 'EU, EEA' && req.body.myInputsEURT === '') {
        return res.redirect('nationality-eu-error');
    }
    else if (arraysContainSame(req.body.nationality, ['UK', 'Other']) === true && req.body.myInputsOtherRT === '') {
        return res.redirect('nationality-other-error');
    }
    else if (req.body.nationality === 'Other' && req.body.myInputsOtherRT === '') {
        return res.redirect('nationality-other-error');
    }
    else if (nationality == 'UK') {
        res.redirect('applicant-nino')
    }
    else if (arraysContainSame(nationality, ['UK', 'EU, EEA or Swiss', 'Other']) == true) {
        res.redirect('applicant-nino')
    }
    else if (arraysContainSame(nationality, ['EU, EEA or Swiss', 'Other']) == true) {
        res.redirect('applicant-nino')
    }
    else if (nationality == 'EU, EEA or Swiss') {
        res.redirect('applicant-nino')
    }
    else if (nationality == 'Other') {
        res.redirect('kickout/ineligible-nationality-kickout')
    }
    else if (arraysContainSame(nationality, ['UK', 'EU, EEA or Swiss']) == true) {
        res.redirect('applicant-nino')
    }
    else {
        res.redirect('nationality-error')
    }
})

// What is your National Insurance number? 

router.post([/applicant-nino/, /applicant-nino-error/], function (req,res) {

    const ninoRegEx = /^(?!BG)(?!GB)(?!NK)(?!KN)(?!TN)(?!NT)(?!ZZ)(?:[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z])(?:\s*\d\s*){6}([A-D]|\s)$/;
    var moveCheck = req.session.data['moveCheck'];

    if (req.body.nino == ''){
        res.redirect('applicant-nino-error');
    } else if(req.body.nino !== '' && !ninoRegEx.test(req.body.nino)) {
        res.redirect('applicant-nino-error');
    } else if (req.body.nino !== '' && ninoRegEx.test(req.body.nino) && moveCheck == 'Yes'){
        res.redirect('applicant-residential-address');
    } else if (req.body.nino !== '' && ninoRegEx.test(req.body.nino) && moveCheck == 'No'){
        res.redirect('applicant-residential-address');
    }
})

// Residential address (in S1 country)
,
router.post([/applicant-residential-address/, /applicant-residential-address-error/, /applicant-residential-address-line-error/, /applicant-residential-address-city-error/, /applicant-residential-address-postcode-error/, /applicant-residential-address-country-error/], function (req,res) {
    var addressLineOne = req.session.data['addressLineOne']
    var city = req.session.data['city']
    var postcode = req.session.data['postcode']
    var country = req.session.data['country']

    if(addressLineOne != '' && city != '' && postcode != '' && country != '') {
        res.redirect('applicant-correspondence-address-check');
    } else if(addressLineOne == '' && city != '' && postcode != '' && country != '') {
        res.redirect('applicant-residential-address-line-error');
    } else if(addressLineOne != '' && city == '' && postcode != '' && country != '') {
        res.redirect('applicant-residential-address-city-error');
    } else if(addressLineOne != '' && city != '' && postcode == '' && country != '') {
        res.redirect('applicant-residential-address-postcode-error');
    } else if(addressLineOne != '' && city != '' && postcode != '' && country == '') {
        res.redirect('applicant-residential-address-country-error');
    } else {
        res.redirect('applicant-residential-address-error');
    }
})

// Residential address (current, outside S1)
router.post([/applicant-current-residential-address/, /applicant-current-residential-address-error/, /applicant-current-residential-address-line-error/, /applicant-current-residential-address-city-error/, /applicant-current-residential-address-postcode-error/, /applicant-current-residential-address-country-error/], function (req,res) {
    var addressLineOne = req.session.data['addressLineOne']
    var city = req.session.data['city']
    var postcode = req.session.data['postcode']
    var country = req.session.data['country']

    if(addressLineOne != '' && city != '' && postcode != '' && country != '') {
        res.redirect('applicant-correspondence-address-check');
    } else if(addressLineOne == '' && city != '' && postcode != '' && country != '') {
        res.redirect('applicant-current-residential-address-line-error');
    } else if(addressLineOne != '' && city == '' && postcode != '' && country != '') {
        res.redirect('applicant-current-residential-address-city-error');
    } else if(addressLineOne != '' && city != '' && postcode == '' && country != '') {
        res.redirect('applicant-current-residential-address-postcode-error');
    } else if(addressLineOne != '' && city != '' && postcode != '' && country == '') {
        res.redirect('applicant-current-residential-address-country-error');
    } else {
        res.redirect('applicant-current-residential-address-error');
    }
})


// Is this also your correspondence address?

router.post([/applicant-correspondence-address-check/, /applicant-correspondence-address-check-error/], function (req,res) {
    var correspondenceAddressCheck = req.session.data['correspondenceAddressCheck']

    if(correspondenceAddressCheck == 'Yes') {
        res.redirect('applicant-email');
    } else if(correspondenceAddressCheck == 'No') {
        res.redirect('applicant-correspondence-address');
    } else {
        res.redirect('applicant-correspondence-address-check-error');
    }
})

// Correspondence address

router.post([/applicant-correspondence-address/, /applicant-correspondence-address-error/, /applicant-correspondence-address-error/, /applicant-correspondence-address-city-error/, /applicant-correspondence-address-postcode-error/, /applicant-correspondence-address-country-error/], function (req,res) {
    var addressLineOne = req.session.data['addressLineOne']
    var city = req.session.data['city']
    var postcode = req.session.data['postcode']
    var country = req.session.data['country']

    if(addressLineOne != '' && city != '' && postcode != '' && country != '') {
        res.redirect('applicant-correspondence-address-check');
    } else if(addressLineOne == '' && city != '' && postcode != '' && country != '') {
        res.redirect('applicant-correspondence-address-line-error');
    } else if(addressLineOne != '' && city == '' && postcode != '' && country != '') {
        res.redirect('applicant-correspondence-address-city-error');
    } else if(addressLineOne != '' && city != '' && postcode == '' && country != '') {
        res.redirect('applicant-correspondence-address-postcode-error');
    } else if(addressLineOne != '' && city != '' && postcode != '' && country == '') {
        res.redirect('applicant-correspondence-address-country-error');
    } else {
        res.redirect('applicant-correspondence-address-error');
    }
})


// Email

router.post([/applicant-email/, /applicant-email-error/], function (req,res) {
    
    var email = req.session.data['email'];

    const emailRegEx = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    if(email != '' && emailRegEx.test(email)) {
        res.redirect('applicant-phone');
    } else if(email == '') {
        res.redirect('applicant-email-error');
    } else if(email != '' && !emailRegEx.test(email)) {
        res.redirect('applicant-email-error');
    }
})


// Phone

router.post([/applicant-phone/, /applicant-phone-error/], function (req,res) {
    console.log(req.body.phone);
    
    const phoneRegEx = /^0([1-6][0-9]{8,10}|7[0-9]{9})$/;

    if(req.body.phone !== '' && phoneRegEx.test(req.body.phone)) {
        res.redirect('applicant-send-letter-check');
    } else if(req.body.phone !== '' && !phoneRegEx.test(req.body.phone)) {
        res.redirect('applicant-phone-error');
    } else {
        res.redirect('applicant-send-letter-check');
    }
})


// Do you want a copy of your S1 certificate to be sent by letter?

router.post([/applicant-send-letter-check/, /applicant-send-letter-check-error/], function (req,res) {
    var sendCopyLetter = req.session.data['sendCopyLetter'];

    if(sendCopyLetter == 'Yes') {
        res.redirect('applicant-cya-personal');
    } else if(sendCopyLetter == 'No') {
        res.redirect('applicant-cya-personal');
    } else {
        res.redirect('applicant-send-letter-check-error');
    }
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

router.post([/dependant-check/, /dependant-check-error/], function (req,res) {
    var dependantCheck = req.session.data['dependantCheck'];

    if(dependantCheck == 'Yes') {
        res.redirect('dependant-name');
    } else if(dependantCheck == 'No') {
        res.redirect('submit');
    } else {
        res.redirect('dependant-check-error');
    }
})

// Who do you want to add to your application?

router.post([/dependant-name/, /dependant-firstname-error/, /dependant-surname-error/, /dependant-name-error/], function (req,res) {
    console.log(req.body.dependantFirstName);
    console.log(req.body.dependantSurname);

    if(req.body.dependantFirstName === '' && req.body.dependantSurname === '') {
        res.redirect('dependant-name-error');
    } else if (req.body.dependantFirstName !== '' && req.body.dependantSurname === '') {
        res.redirect('dependant-firstname-error');
    } else if (req.body.dependantFirstName === '' && req.body.dependantSurname !== '') {
        res.redirect('dependant-surname-error');
    } else if(req.body.dependantFirstName !== '' && req.body.dependantSurname !== '') {
        res.redirect('dependant-dob');
    } 
})

// What is [dependant name]'s date of birth?

router.post([/dependant-dob/, /dependant-dob-error/, /dependant-dob-day-error/, /dependant-dob-day-month-error/, /dependant-dob-month-error/, /dependant-dob-month-year-error/, /dependant-dob-day-year-error/, /dependant-dob-year-error/], function (req, res) {
    const depDay = req.session.data['dependant-day']
    const depMonth = req.session.data['dependant-month']
    const depYear =req.session.data['dependant-year']
    
    var yearRegEx = /^([1-2][0-9][0-9][0-9])$/;           ///< Allows a number between 2021 and 2022
    var monthRegEx = /^(0?[1-9]|1[0-2])$/;             ///< Allows a number between 00 and 12
    var dayRegEx = /^(0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/;   ///< Allows a number between 00 and 31
        
    if(depDay === '' && depMonth === '' && depYear === '') {
        res.redirect('dependant-dob-error');
    } else if(depDay === '' && depMonth !== '' && depYear !== ''){
        res.redirect('dependant-dob-day-error');
    } else if(depDay === '' && depMonth === '' && depYear !== ''){
        res.redirect('dependant-dob-day-month-error');
    } else if(depDay === '' && depMonth !== '' && depYear !== ''){
        res.redirect('dependant-dob-day-year-error');
    } else if(depDay !== '' && depMonth === '' && depYear !== ''){
        res.redirect('dependant-dob-month-error');
    } else if(depDay !== '' && depMonth === '' && depYear === ''){
        res.redirect('dependant-dob-month-year-error');
    } else if(depDay !== '' && depMonth !== '' && depYear === ''){
        res.redirect('dependant-dob-year-error');
    } else if(depDay !== '' && !dayRegEx.test(depDay) && depMonth !== '' && !monthRegEx.test(depMonth) && depYear !== '' && !yearRegEx.test(depYear)) {
        res.redirect('dependant-dob-error');
    } else if(depDay !== '' && !dayRegEx.test(depDay) && depMonth !== '' && monthRegEx.test(depMonth) && depYear !== '' && yearRegEx.test(depYear)) {
        res.redirect('dependant-dob-day-error');
    } else if(depDay !== '' && !dayRegEx.test(depDay) && depMonth !== '' && !monthRegEx.test(depMonth) && depYear !== '' && yearRegEx.test(depYear)) {
        res.redirect('dependant-dob-day-month-error');
    } else if(depDay !== '' && !dayRegEx.test(depDay) && depMonth !== '' && !monthRegEx.test(depMonth) && depYear !== '' && !yearRegEx.test(depYear)) {
        res.redirect('dependant-dob-day-year-error');
    } else if(depDay !== '' && dayRegEx.test(depDay) && depMonth !== '' && !monthRegEx.test(depMonth) && depYear !== '' && yearRegEx.test(depYear)) {
        res.redirect('dependant-dob-month-error');
    } else if(depDay !== '' && dayRegEx.test(depDay) && depMonth !== '' && !monthRegEx.test(depMonth) && depYear !== '' && !yearRegEx.test(depYear)) {
        res.redirect('dependant-dob-month-year-error');
    } else if(depDay !== '' && !dayRegEx.test(depDay) && depMonth !== '' && monthRegEx.test(depMonth) && depYear !== '' && !yearRegEx.test(depYear)) {
        res.redirect('dependant-dob-day-year-error');
    } else if(depDay !== '' && dayRegEx.test(depDay) && depMonth !== '' && monthRegEx.test(depMonth) && depYear !== '' && !yearRegEx.test(depYear)) {
        res.redirect('dependant-dob-year-error');
    } else {
        res.redirect('dependant-address-check');
    }  

    router.get(/submit/, function (req, res) {

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
        var ninetyDays = new Date(todayDate.getTime() + (90 * 24 * 60 * 60 * 1000));
        console.log(ninetyDays);
    
        
        // Convert format
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
        const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
        var ninetyDaysFromNow = dateTimeFormat.format(ninetyDays);
        console.log(ninetyDaysFromNow);

        //Today's date
        const year = req.session.data['example-year'];
        const month = req.session.data['example-month'];
        const day = req.session.data['example-day'];
        const formatDob = day + '/' + month + '/' + year;
    
        console.log(formatDob);
    
        var dobDate = new Date(formatDob.split('/')[2], formatDob.split('/')[1] - 1, formatDob.split('/')[0]);
        console.log(dobDate);
    
        // Convert format
        const dobOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    
        const dobDateTimeFormat = new Intl.DateTimeFormat('en-GB', dobOptions);
        var dobDateFormatted = dobDateTimeFormat.format(dobDate);
        console.log(dobDateFormatted);
    
        //Dependant DOB 
        const depYear = req.session.data['dependant-year'];
        const depMonth = req.session.data['dependant-month'];
        const depDay = req.session.data['dependant-day'];
        const formatDepDob = depDay + '/' + depMonth + '/' + depYear;
    
        if(depYear){
            console.log(formatDepDob);
    
            var depDobDate = new Date(formatDepDob.split('/')[2], formatDepDob.split('/')[1] - 1, formatDepDob.split('/')[0]);
            console.log(depDobDate);
    
            // Convert format
            const depDobOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    
            const depDobDateTimeFormat = new Intl.DateTimeFormat('en-GB', depDobOptions);
            var depDobDateFormatted = depDobDateTimeFormat.format(depDobDate);
            console.log(depDobDateFormatted);
        }
        
        res.render('mvp/eligibility/submit', {ninetyDaysFromNow: ninetyDaysFromNow, depDobDateFormatted: depDobDateFormatted});
    }) 
})

// Does [dependant name] live at the same address as you?

router.post([/dependant-address-check/, /dependant-address-check-error/], function (req,res) {
    var dependantAddressCheck = req.session.data['dependantAddressCheck'];

    if(dependantAddressCheck == 'Yes') {
        res.redirect('more-dependants-check');
    } else if(dependantAddressCheck == 'No') {
        res.redirect('dependant-address');
    } else {
        res.redirect('dependant-address-check-error');
    }
})


// Dependant address

router.post([/dependant-address/, /dependant-address-error/, /dependant-address-line-error/, /dependant-address-city-error/, /dependant-address-postcode-error/, /dependant-address-country-error/], function (req,res) {
    var addressLineOne = req.session.data['dependantAddressLine'];
    var city = req.session.data['dependantCity'];
    var postcode = req.session.data['dependantPostcode'];
    var country = req.session.data['dependantCountry'];

    if(addressLineOne != '' && city != '' && postcode != '' && country != '') {
        res.redirect('dependant-more-check');
    } else if(addressLineOne == '' && city != '' && postcode != '' && country != '') {
        res.redirect('dependant-address-line-error');
    } else if(addressLineOne != '' && city == '' && postcode != '' && country != '') {
        res.redirect('dependant-address-city-error');
    } else if(addressLineOne != '' && city != '' && postcode == '' && country != '') {
        res.redirect('dependant-address-postcode-error');
    } else if(addressLineOne != '' && city != '' && postcode != '' && country == '') {
        res.redirect('adependant-address-country-error');
    } else {
        res.redirect('dependant-address-error');
    }
})

// Add more dependants?

router.post([/more-dependants-check/, /more-dependants-check-error/], function(req, res){
    var moreDependantsCheck = req.session.data['moreDependantsCheck'];
    //var euStatePension = req.session.data['euStatePension'];

    if(moreDependantsCheck == 'No') {
        res.redirect('dependant-cya');
    } else if (moreDependantsCheck == 'Yes') {
        res.redirect('dependant-name');
    } else {
        res.redirect('more-dependants-check-error');
    }
})

// router.get(/dependant-cya/, function(req, res) {
//     var euStatePension = req.session.data['euStatePension'];

//     if (euStatePension == 'Yes'){
//         res.redirect('../upload/index-1')
//     } else if (euStatePension == 'No'){
//         res.redirect('../apply/submit');
//     }
// })

router.post(/cya/, function(req, res){
    var euStatePension = req.session.data['euStatePension'];

    if (euStatePension == 'Yes'){
        res.redirect('../apply/submit');
    }
})

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
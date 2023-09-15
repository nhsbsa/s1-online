const express = require('express')
const router = express.Router()

const axios = require('axios');

//Do you receive your UK State pension, or will you receive this within the next 90 days?
router.post('/route-uk-state-pension', function(req,res){
    var answer = req.session.data['uk-state-pension']
    if (answer == "yes"){
        res.redirect('/discovery/apply/eligability-other-state-pension')
    }
    else if (answer == "no"){
        res.redirect('/discovery/apply/eligability-kick-out')
    }
    else {
        res.redirect('/discovery/apply/eligability-uk-state-pension')
    }

})

//Do you get a state pension from a EEA country or Switzerland?
router.post('/route-other-state-pension', function(req,res){
    var answer = req.session.data['other-state-pension']
    if (answer == "yes"){
        res.redirect('/discovery/apply/eligability-other-state-pension-amount')
    }
    else if (answer == "no"){
        res.redirect('/discovery/apply/eligability-country')
    }
    else {
        res.redirect('/discovery/apply/eligability-other-state-pension')
    }

})

//Is this pension more than that state pension received from the UK?
router.post('/route-other-state-pension-amount', function(req,res){
    var answer = req.session.data['other-state-pension-amount']
    if (answer == "yes"){
        res.redirect('/discovery/apply/eligability-kick-out')
    }
    else if (answer == "no"){
        res.redirect('/discovery/apply/eligability-country')
    }
    else {
        res.redirect('/discovery/apply/eligability-other-state-pension-amount')
    }

})

//Have you already moved to country?
router.post('/route-move-check', function(req,res){
    var answer = req.session.data['move-check']
    if (answer == "yes"){
        res.redirect('/discovery/apply/eligability-move-date')
    }
    else if (answer == "no"){
        res.redirect('/discovery/apply/eligability-move-date-plan')
    }
    else {
        res.redirect('/discovery/apply/eligability-move-check')
    }

})

//Is this the applicants correspondence address?
router.post('/route-applicant-correspondence-address', function(req,res){
    var answer = req.session.data['correspondence-address']
    if (answer == "yes"){
        res.redirect('/discovery/apply/applicant-email')
    }
    else if (answer == "no"){
        res.redirect('/discovery/apply/applicant-correspondence-address')
    }
    else {
        res.redirect('/discovery/apply/applicant-correspondence-address-check')
    }

})

//Does the applicant want to add any dependants?
router.post('/route-dependants-check', function(req,res){
    var answer = req.session.data['dependants-check']
    if (answer == "yes"){
        res.redirect('/discovery/apply/dependant-name')
    }
    else if (answer == "no"){
        res.redirect('/discovery/apply/physical-copy')
    }
    else {
        res.redirect('/discovery/apply/dependant-check')
    }

})

//Does the dependant live at the same address as the applicant?
router.post('/route-dependant-addres-check', function(req,res){
    var answer = req.session.data['depenant-address-check']
    if (answer == "yes"){
        res.redirect('/discovery/apply/dependant-check-more')
    }
    else if (answer == "no"){
        res.redirect('/discovery/apply/dependant-address')
    }
    else {
        res.redirect('/discovery/apply/dependant-address-check')
    }

})

//Does the applicant want to add another dependant?
router.post('/route-dependant-check-more', function(req,res){
    var answer = req.session.data['dependants-check']
    if (answer == "yes"){
        res.redirect('/discovery/apply/dependant-name')
    }
    else if (answer == "no"){
        res.redirect('/discovery/apply/dependant-cya')
    }
    else {
        res.redirect('/discovery/apply/dependant-check-more')
    }

})

module.exports = router
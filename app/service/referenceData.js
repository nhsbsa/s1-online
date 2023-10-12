const path = require('path');
const countryList = require(path.resolve("app/data/countries.js"));

var ReferenceDataService = {
    getCountries: function() {
        return countryList;
    },
    getMemberStates: function() {
        return countryList.filter(country => country.member_state);
    },
    getCountrynameByCode: function(code) {
        return countryList.filter(country => country.code == code.toUpperCase());
    }
 }
 
 module.exports = ReferenceDataService;
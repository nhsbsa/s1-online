// ES6 or Vanilla JavaScript
if (document.querySelector('#eu-efta-location-picker')) {
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: document.querySelector('#eu-efta-location-picker')
  });
} //// Select Countries List (ADD / REMOVE NEW SELECT tags for each conditional checkbox input) ////

if (document.querySelector('#eu-live-location-picker')) {
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: document.querySelector('#eu-live-location-picker')
  });
}
if (document.querySelector('#eea-location-picker')) {
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: document.querySelector('#eea-location-picker')
  });
}
if (document.querySelector('#eu-location-picker')) {
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: document.querySelector('#eu-location-picker')
  });
}
if (document.querySelector('#other-location-picker')) {
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: document.querySelector('#other-location-picker')
  });
}
const countrySelects = document.querySelectorAll('.autocomplete-country');
countrySelects.forEach(function (select) {
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: select
  });
});

/// EU RT

var euCountriesRT = ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia (Czech Republic)", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxemburg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland"];
function addInputEURT(el) {
  var newFieldEURT = document.createElement('div'); // Count current amount of inputs in section

  var inputCountEURT = el.closest('div').getElementsByTagName('select').length;
  console.log(inputCountEURT); // Create ID for new select we're going to add

  var newSelectIDEURT = `${el.previousElementSibling.className}-${inputCountEURT}`;
  newFieldEURT.innerHTML = `<br><div class="row"><label style="text-align: left;" class='nhsuk-label column' for='${newSelectIDEURT}'>Country name</label><a style="text-align: right; float: right; " class="column" href='#' type='button' value='-' onClick='return removeInputEURT(this);'>Remove</a></div><select id='${newSelectIDEURT}' name='myInputsEURT[]' type='text'><option value=''></option></select></div>`;
  document.getElementById('appendableEURT').appendChild(newFieldEURT); // Use ID of new select to initilise autcomplete for our new select

  accessibleAutocomplete.enhanceSelectElement({
    selectElement: document.querySelector(`#${newSelectIDEURT}`),
    source: euCountriesRT
  });
  return false;
}
function removeInputEURT(btn) {
  btn.parentNode.parentNode.remove();
  return false;
}

/// EU 

var euCountries = ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia (Czech Republic)", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxemburg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland"];
function addInputEU(el) {
  var newFieldEU = document.createElement('div'); // Count current amount of inputs in section

  var inputCountEU = el.closest('div').getElementsByTagName('select').length;
  console.log(inputCountEU); // Create ID for new select we're going to add

  var newSelectIDEU = `${el.previousElementSibling.className}-${inputCountEU}`;
  newFieldEU.innerHTML = `<br><div class="row"><label style="text-align: left;" class='nhsuk-label column' for='${newSelectIDEU}'>Country name</label><a style="text-align: right; float: right; " class="column" href='#' type='button' value='-' onClick='return removeInputEU(this);'>Remove</a></div><select id='${newSelectIDEU}' name='myInputsEU[]' type='text'><option value=''></option></select></div>`;
  document.getElementById('appendableEU').appendChild(newFieldEU); // Use ID of new select to initilise autcomplete for our new select

  accessibleAutocomplete.enhanceSelectElement({
    selectElement: document.querySelector(`#${newSelectIDEU}`),
    source: euCountries
  });
  return false;
}
function removeInputEU(btn) {
  btn.parentNode.parentNode.remove();
  return false;
}

/// EEA 

var eeaCountries = ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia (Czech Republic)", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxemburg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "United Kingdom"];
function generateSelectList(countryArray) {
  let selectListOptions = '';
  countryArray.forEach(element => {
    selectListOptions += `<option value='${element}'>${element}</option>`;
  });
  return selectListOptions;
}
function addInputEEA(el) {
  var newFieldEEA = document.createElement('div');

  // Count current amount of inputs in section
  var inputCountEEA = el.closest('div').getElementsByTagName('select').length;
  console.log(inputCountEEA);

  // Create ID for new select we're going to add
  var newSelectID = `${el.previousElementSibling.className}-${inputCountEEA}`;
  let generatedOptionList = generateSelectList(eeaCountries);
  newFieldEEA.innerHTML = `<br><a href='#' style="float: right;" type='button' value='-' onClick='return removeInputEEA(this);'>- Remove country</a><label class='nhsuk-label' for='${newSelectID}'>Country name</label><select id='${newSelectID}' name='myInputsEEA[]' type='text'><option value=''></option>${generatedOptionList}</select></div>`;
  document.getElementById('appendableEEA').appendChild(newFieldEEA);

  // Use ID of new select to initilise autcomplete for our new select
  let select = document.querySelector(`#${newSelectID}`);
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: select,
    source: eeaCountries
  });
  return false;
}
function removeInputEEA(btn) {
  btn.parentNode.remove();
  return false;
}

//Other

var worldCountries = ["Afghanistan", "Aland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia (Plurinational State of)", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo (Democratic Republic of the)", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Cuba", "Curacao", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Ghana", "Gibraltar", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See", "Honduras", "Hong Kong", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Isle of Man", "Israel", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (Democratic People's Republic of)", "Korea (Republic of)", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Lebanon", "Lesotho", "Liberia", "Libya", "Macao", "Macedonia (the former Yugoslav Republic of)", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia (Federated States of)", "Moldova (Republic of)", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Oman", "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Puerto Rico", "Qatar", "Reunion", "Russian Federation", "Rwanda", "Saint Barthelemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Scotland", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Syrian Arab Republic", "Taiwan, Province of China[a]", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United States of America", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela (Bolivarian Republic of)", "Viet Nam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];
function addInputOther(el) {
  var newFieldOther = document.createElement('div');

  // Count current amount of inputs in section
  var inputCountOther = el.closest('div').getElementsByTagName('select').length;
  console.log(inputCountOther);

  // Create ID for new select we're going to add
  var newSelectID = `${el.previousElementSibling.className}-${inputCountOther}`;
  newFieldOther.innerHTML = `<br><label class='nhsuk-label' for='${newSelectID}'>Country name</label><select id='${newSelectID}' name='myInputsOther[]' type='text'><option value=''></option></select></div><a href='#' type='button' value='-' onClick='return removeInputOther(this);'>- Remove nationality</a>`;
  document.getElementById('appendableOther').appendChild(newFieldOther);

  // Use ID of new select to initilise autcomplete for our new select
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: document.querySelector(`#${newSelectID}`),
    source: worldCountries
  });
  return false;
}
function removeInputOther(btn) {
  btn.parentNode.remove();
  return false;
}

// EUSP
var spEuCountries = ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia (Czech Republic)", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxemburg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "United Kingdom"];
function addInputEUSP(el) {
  var newFieldOther = document.createElement('div');

  // Count current amount of inputs in section
  var inputCountOther = el.closest('div').getElementsByTagName('select').length;

  // Create ID for new select we're going to add
  var newSelectID = `${el.previousElementSibling.id}-${inputCountOther}`;
  let generatedOptionList = generateSelectList(spEuCountries);
  newFieldOther.innerHTML = `<br><a href='#' style="float: right;" type='button' value='-' onClick='return removeInputOther(this);'>Remove country</a><label class='nhsuk-label' for='${newSelectID}'>Country name</label><select id='${newSelectID}' name='myInputsEUSP[]' type='text'><option value=''></option>${generatedOptionList}</select></div>`;
  document.getElementById('appendableEUSP').appendChild(newFieldOther);

  // Use ID of new select to initilise autcomplete for our new select
  let select = document.querySelector(`#${newSelectID}`);
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: select,
    source: spEuCountries
  });
  return false;
}
function removeInputEUSP(btn) {
  btn.parentNode.remove();
  return false;
}
accessibleAutocomplete.enhanceSelectElement({
  selectElement: document.querySelector('#location-picker')
});
function suggest(query, syncResults) {
  var results = ['Afghanistan', 'Akrotiri', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Ashmore and Cartier Islands', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas, The', 'Bahrain', 'Bangladesh', 'Barbados', 'Bassas da India', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Clipperton Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Cook Islands', 'Coral Sea Islands', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Dhekelia', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Europa Island', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern and Antarctic Lands', 'Gabon', 'Gambia,', 'Gaza Strip', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Glorioso Islands', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and McDonald Islands', 'Holy See (Vatican City)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Jan Mayen', 'Japan', 'Jersey', 'Jordan', 'Juan de Nova Island', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Navassa Island', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paracel Islands', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia and Montenegro', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Spratly Islands', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tromelin Island', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Virgin Islands', 'Wake Island', 'Wallis and Futuna', 'West Bank', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];
  syncResults(query ? results.filter(function (result) {
    return result.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  }) : []);
}
var element = document.querySelector('#tt-default');
var id = 'autocomplete-default';
ReactDOM.render(React.createElement(Autocomplete.default, {
  id: id,
  source: suggest
}), element);

// Modal window for confirmation when removing files

// Get the modal element
var modal = document.getElementById('deleteModal');

// Get the delete buttons that open the modal
var deleteBtn1 = document.querySelector('.delete-member1');
var deleteBtn2 = document.querySelector('.delete-member2');

// Get the <span> element that closes the modal
var closeBtn = document.querySelector('.close');

// Get the buttons inside the modal
var confirmBtn = document.getElementById('confirmDelete');
var cancelBtn = document.getElementById('cancelDelete');

// When the user clicks a delete button, open the modal and determine which family member to delete
deleteBtn1.onclick = function (event) {
  event.preventDefault(); // Prevent default link behavior
  modal.style.display = 'block';
  modal.dataset.member = 'familymember1'; // Set data attribute to identify which family member to delete
  var dependantName = "{{data.dependantName or 'John Smith'}}";
  document.getElementById('dialog-title').textContent = "Remove " + dependantName + "?"; // Update modal title
};
deleteBtn2.onclick = function (event) {
  event.preventDefault(); // Prevent default link behavior
  modal.style.display = 'block';
  modal.dataset.member = 'familymember2'; // Set data attribute to identify which family member to delete
  var dependantName = "{{data.dependantName2 or 'Jane Smith'}}";
  document.getElementById('dialog-title').textContent = "Remove " + dependantName + "?"; // Update modal title
};

// When the user clicks on <span> (x) or cancel button, close the modal
closeBtn.onclick = cancelBtn.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks on confirm button, hide modal, show update message, and hide the appropriate family member
confirmBtn.onclick = function (event) {
  event.preventDefault(); // Prevent default button behavior
  modal.style.display = 'none';
  document.querySelector('.updatemessage').style.display = 'block';
  var memberToDelete = modal.dataset.member; // Get the data attribute to identify which family member to delete
  document.querySelector('.' + memberToDelete).style.display = 'none'; // Hide the appropriate family member

  // Show the notification banner
  document.querySelector('.nhs-notification-banner').style.display = 'block';

  // Update the updatemessage content based on the memberToDelete
  var dependantName;
  if (memberToDelete === 'familymember1') {
    dependantName = "{{data.dependantName or 'John Smith'}}";
  } else {
    dependantName = "{{data.dependantName2 or 'Jane Smith'}}";
  }
  document.getElementById('dialog-title2').textContent = dependantName + " has been removed.";

  // Check if both family members are hidden
  if (document.querySelector('.familymember1').style.display === 'none' && document.querySelector('.familymember2').style.display === 'none') {
    // Show the no-dependants div
    document.querySelector('.no-dependants').style.display = 'block';
    // Change the content of the h2 element
    document.querySelector('.add-family-member-text').textContent = "Do you want to add any family members?";
  }
  window.scrollTo(0, 0); // Scroll to the top of the page
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
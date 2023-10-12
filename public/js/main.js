// ES6 or Vanilla JavaScript
if (document.querySelector('#eu-efta-location-picker')) {
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: document.querySelector('#eu-efta-location-picker')
  });
} //// Select Countries List (ADD / REMOVE NEW SELECT tags for each conditional checkbox input) ////


const countrySelects = document.querySelectorAll('.autocomplete-country');
countrySelects.forEach(function (select) {
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: select
  });
}); /// EU

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
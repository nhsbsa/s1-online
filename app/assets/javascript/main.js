// ES6 or Vanilla JavaScript

if(document.querySelector('#eu-location-picker')) {
    accessibleAutocomplete.enhanceSelectElement({
      selectElement: document.querySelector('#eu-location-picker')
    })
}

if(document.querySelector('#eu-efta-location-picker')) {
    accessibleAutocomplete.enhanceSelectElement({
      selectElement: document.querySelector('#eu-uk-location-picker')
    })
}
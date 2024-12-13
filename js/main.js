import {getCoords} from './geolocation.js';
import {getAddressFromCoords, getCoordsFromAddress} from './addressApi.js';
import {getNearestCinemas} from './cinemaApi.js';

const elements = {
    geolocationButton: document.querySelector('#geolocation-btn'),
    searchForm: document.querySelector('#search-form'),
    addressInput: document.querySelector('#address'),
    distanceInput: document.querySelector('#distance'),
    cinemaList: document.querySelector('#cinema-list'),
    distanceText: document.querySelector('#distance-text'),
    errorText: document.querySelector('#error')
};

function showError(errorMessage) {
    elements.errorText.removeAttribute('hidden');
    elements.errorText.textContent = errorMessage;
}

elements.distanceInput.addEventListener('change', () => {
    elements.distanceText.textContent = elements.distanceInput.value; 
    elements.distanceInput.setAttribute('title', elements.distanceInput.value);
});

elements.geolocationButton.addEventListener('click', () => {
    getCoords().then(coords => getAddressFromCoords(coords)).then(address => {
        elements.addressInput.value = address;
    }).catch(error => {
        showError(error.message);
    }); 
});

elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupération de l'adresse saisie puis les coordonnées correspondantes
    getCoordsFromAddress(elements.addressInput.value)
        .then(coords => getNearestCinemas(coords, 10))
        .then(cinemas => {
            // Affichage des cinémas
            elements.cinemaList.innerHTML = cinemas.map(cinema => {
                return `<li>${cinema.nom}</li>`;
            }).join('');
        })
        .catch(error => {
            showError(error.message);
    });
});
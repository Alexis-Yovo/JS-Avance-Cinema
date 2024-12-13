const baseUrl = 'https://api-adresse.data.gouv.fr';

export function getAddressFromCoords(coords) {
    return fetch(`${baseUrl}/reverse/?lat=${coords.latitude}&lon=${coords.longitude}`)
        .then(response => response.json())
        .then(response => {
            if (response.code) {
                throw new Error(response.message);    
            }
            
            if (response.features.length == 0) {
                throw new Error("No matching address for these coordinates");
            }
            
            return response.features[0].properties.label;
        });
}

export function getCoordsFromAddress(address) {
    return fetch(`${baseUrl}/search/?q=${address}`)
        .then(response => response.json())
        .then(response => {
            if (response.code) {
                throw new Error(response.message);    
            }
            
            if (response.features.length == 0) {
                throw new Error("Address not found");
            }
            
            const [longitude, latitude] = response.features[0].geometry.coordinates;
            
            return {
                latitude,
                longitude
            };
        });
}
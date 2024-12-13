const baseUrl = 'https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets';

export function getNearestCinemas(coords, distance) {
    const queryString = new URLSearchParams({
        limit: 20,
        order_by: "ecrans DESC",
        where: `within_distance(geolocalisation, geom'POINT(${coords.longitude} ${coords.latitude})', ${distance}km)`
    });
    
    return fetch(`${baseUrl}/etablissements-cinematographiques/records?${queryString}`)
        .then(response => response.json())
        .then(response => response.results);
}
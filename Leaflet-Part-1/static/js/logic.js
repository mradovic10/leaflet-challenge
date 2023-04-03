// Link for USGS data on all earthquakes of the past seven days.
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

var map = L.map('map', {
    center: [39.49, -98.34],
    zoom: [4]
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(map);

// Perform a GET request to the query URL.
d3.json(url).then(function (data) {

    let earthquakes = data.features;

    console.log(earthquakes[0].properties.mag);

    //for (let i = 0; i < earthquakes.length; i++) {

    L.circle([earthquakes[0].geometry.coordinates[1], earthquakes[0].geometry.coordinates[0]], {
        color: 'yellow',
        fillColor: 'yellow',
        fillOpacity: 0.5,
        radius: earthquakes[0].properties.mag * 50000
    }).addTo(map);

});
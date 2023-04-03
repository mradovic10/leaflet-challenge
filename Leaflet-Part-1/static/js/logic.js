// Link for USGS data on all earthquakes of the past seven days.
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

var map = L.map('map', {
    center: [29.9579005446342, 9.559838893763516],
    zoom: [2]
});

// Add a tile layer.
var OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

OpenStreetMap_Mapnik.addTo(map);

// Perform a GET request to the query URL.
d3.json(url).then(function (data) {

    let earthquakes = data.features;

    //console.log(earthquakes[0].properties.mag);

    //console.log(earthquakes[0].geometry.coordinates[2])

    console.log(earthquakes.length)

    function color(depth) {
        
        if (depth >= -10 && depth < 10) {
            return 'chartreuse';
        } else if (depth >= 10 && depth < 30) {
            return 'greenyellow';
        } else if (depth >= 30 && depth < 50) {
            return 'sandybrown';
        } else if (depth >= 50 && depth < 70) {
            return 'orange';
        } else if (depth >= 70 && depth < 90) {
            return 'orangered';
        } else if (depth >= 90) {
            return 'red';
        };

    };
        
    for (let i = 0; i < earthquakes.length; i++) {

        L.circle([earthquakes[i].geometry.coordinates[1], earthquakes[i].geometry.coordinates[0]], {
            color: 'black',
            weight: 0.5,
            fillColor: color(earthquakes[i].geometry.coordinates[2]),
            fillOpacity: 0.5,
            radius: earthquakes[i].properties.mag * 50000
        }).addTo(map);

    };

});
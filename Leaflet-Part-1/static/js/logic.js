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

    // Create a variable to represent the 'features' array in the data, i.e. each earthquake.
    let earthquakes = data.features;

    // Log the total number of earthquakes currently shown in our dataset into the console.
    console.log(`Number of earthquakes in the past 7 days: ${earthquakes.length}`)

    // Create a function to choose each earthquake marker's color based on its depth.
    function color(depth) {
        
        if (depth < 10) {
            return 'forestgreen';
        } else if (depth >= 10 && depth < 30) {
            return 'greenyellow';
        } else if (depth >= 30 && depth < 50) {
            return 'gold';
        } else if (depth >= 50 && depth < 70) {
            return 'darkorange';
        } else if (depth >= 70 && depth < 90) {
            return 'red';
        } else if (depth >= 90) {
            return 'darkred';
        };

    };
        
    // Loop through each recorded earthquake.
    for (let i = 0; i < earthquakes.length; i++) {

        // For each earthquake, create a marker based on its magnitude (shown by radius size) and depth (shown by its color).
        let earthquake = L.circle([earthquakes[i].geometry.coordinates[1], earthquakes[i].geometry.coordinates[0]], {
            color: 'black',
            weight: 0.5,
            fillColor: color(earthquakes[i].geometry.coordinates[2]),
            fillOpacity: 0.5,
            radius: earthquakes[i].properties.mag * 20000
        }).addTo(map);
        
        // Create a popup for each earthquake marker that previews its location, magnitude, and depth.
        earthquake.bindPopup(`<h4>Location: ${earthquakes[i].properties.place}</h4> <h4>Magnitude: ${earthquakes[i].properties.mag}</h4> 
                            <h4>Depth: ${earthquakes[i].geometry.coordinates[2]} km</h4>`).addTo(map);

    };

    // Create a legend explaining earthquake depths.
    var legend = L.control({position: "bottomright"});

    legend.onAdd = function() {

        let div = L.DomUtil.create("div", "info legend");
        let limits = [-10, 10, 30, 50, 70, 90];
        let labels = [];
        let legendInfo = "<h2>Earhquake Depth (km)</h2>";
  
        div.innerHTML = legendInfo;
    
        // Go through each limit item to label and color the legend.
        for (let i = 0; i < limits.length; i++) {
            labels.push('<ul style="background-color:' + color(limits[i] + 1) + '"> <span>' + 
            limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + '' : '+') + '</span></ul>');
        };

        // Add each label list item to the div under the <ul> tag.
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return div;

    };

    // Add the legend to the map.
    legend.addTo(map);

});
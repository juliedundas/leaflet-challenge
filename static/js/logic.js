// Creating map object
var map = L.map("map", {
    center: [53.67706, - 1.629582],
    zoom: 3
});

// Adding tile layer
var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
}).addTo(map);

// Link in the geojson data
//var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function createMarkers(response) {

    // Pull the "stations" property off of response.data
    var earthquakes = response.data.features;

    // Initialize an array to hold bike markers
    var earthquakeMarkers = [];

    // Loop through the stations array
    for (var i = 0; i < earthquakes.length; i++) {
        var earthquake = earthquakes[i];

        // For each station, create a marker and bind a popup with the station's name
        var earthquakeMarker = L.marker([features.coordinates[0], features.coordinates[1]])
            .bindPopup("<h3>" + features.properties + "<h3><h3>Capacity: " + features.detail + "<h3>");

        // Add the marker to the bikeMarkers array
        bikeMarkers.push(earthquakeMarker);
    }











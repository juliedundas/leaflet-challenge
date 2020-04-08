// Creating map object
var map = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 5
});

// Adding tile layer
var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
}).addTo(map);

// Link in the geojson data
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(link, function (data) {

    //var magnitude = feature.properties.mag
    // console.log(magnitude)
    function createMarkers(feature) {

        var magnitude = feature.properties.mag
        //console.log(magnitude)
        return {
            opacity: 0.75,
            fillOpactiy: 1,
            color: assignColor(magnitude),
            //stroke: false,
            fillColor: assignColor(magnitude),
            // Adjust radius
            radius: assignRadius(magnitude),
            weight: 0.9
        }
    }

    //Create the color function to style the different data points
    function assignColor(magnitude) {
        if (magnitude > 5) {
            return "black";
        } else if (magnitude > 4) {
            return "red"
        } else if (magnitude > 3) {
            return "orange"
        } else if (magnitude > 2) {
            return "yellow"
        } else
            return "green"
    }

    //Create the radius function to style the sizes of the data points
    function assignRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        } else
            return magnitude * 8
    }

    //add geojson layer
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng)
        },
        style: createMarkers,
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Magniture " + feature.properties.mag)
        }

    }).addTo(map);

})





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
            opacity: 1,
            fillOpactiy: 1,
            fillColor: assignColor(magnitude),
            color: assignColor(magnitude),
            //stroke: false,
            // Adjust radius
            radius: assignRadius(magnitude),
            weight: 1
        }
    }

    //Create the color function to style the different data points
    function assignColor(magnitude) {
        if (magnitude > 5) {
            return "maroon";
        } else if (magnitude > 4) {
            return "red"
        } else if (magnitude > 3) {
            return "orange"
        } else if (magnitude > 2) {
            return "yellow"
        } else if (magnitude > 1) {
            return "darkgreen"
        } else
            return "lightgreen"
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
            //display magnitue and description for earthquake on click
            layer.bindPopup("Magnitude " + feature.properties.mag + "<br> Description: " + feature.properties.title)
        }
        //add markers to map
    }).addTo(map);


    //create a variable for the legend
    var legend = L.control({
        position: "bottomright"
    });

    //add legend details

    legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "legend");

        var scale = [0, 1, 2, 3, 4, 5];

        var colors = ["black", "red", "orange", "yellow", "green"];

        //div.innerHTML += 'Magnitude<br>'

        //Loop through and assign the correct color to the legend

        for (var i = 0; i < scale.length; i++) {
            div.innerHTML +=
                "<i style='background: " + assignColor(scale[i] + 1) + "'>&nbsp&nbsp&nbsp&nbsp</i> " +
                scale[i] + (scale[i + 1] ? "&ndash;" + scale[i + 1] + "<br>" : "+");

        }
        return div
    };

    legend.addTo(map)
})






// Create the map
var map = L.map('map').setView([20, 0], 2);

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Define the marker locations
var locations = [
    { lat: 51.5074, lng: -0.1278, label: 'A' }, // London
    { lat: 40.7128, lng: -74.0060, label: 'B' }, // New York
    { lat: 35.6895, lng: 139.6917, label: 'C' }, // Tokyo
    { lat: 48.8566, lng: 2.3522, label: 'D' } // Paris
];

// Create a marker cluster group
var markers = L.markerClusterGroup();

// Add markers to the cluster group
locations.forEach(function(location) {
    var icon = L.divIcon({
        html: '<div style="background-color: white; border: 1px solid black; border-radius: 50%; width: 20px; height: 20px; text-align: center; line-height: 20px;">' + location.label + '</div>',
        className: ''
    });
    var marker = L.marker([location.lat, location.lng], { icon: icon });
    markers.addLayer(marker);
});

// Add the cluster group to the map
map.addLayer(markers);

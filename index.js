var map = L.map('maps').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var coordinates = [];

var polyline = L.polyline([], { color: 'blue' }).addTo(map);

map.on('click', function (event) {
   
    var latlng = event.latlng;

    coordinates.push([latlng.lat, latlng.lng]);

    // tambahkan marker dan polygon (opsional)
    L.marker([event.latlng.lat, event.latlng.lng]).addTo(map)
        .bindPopup("Koordinat : " + event.latlng.lat + ", " + event.latlng.lng).openPopup();

    polyline.setlatlngs(coordinates);

});

// tombol untuk menggambar polygon
var drawPolygonButton = L.control({position: 'topright'});

drawPolygonButton.onAdd = function() {
    var div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    div.innerHTML = '<button style="background: #f4f4f4; padding: 5px; border: none;"> Draw Polygon</button>';
    div.onclick = function () {
        // mulai gambar polygon
        if(coordinates.length > 2) {
            L.polygon(coordinates, {
                color:'blue',
                fillColor:'green',
                fillOpacity:0.5,
            }).addTo(map);
        }else {
            alert(" Minimal 3 titik untuk bisa menggambar area ");
        }
    }; 
    return div;
};

drawPolygonButton.addTo(map);
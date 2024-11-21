// inisialisasi map, marker & circle
var map = L.map('maps').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.on('click', function(event) {
    // mengambil informasi latitude dan longitude dari event
    var latitude = event.latlng.lat;
    var longitude = event.latlng.lng;
    
    // tampilkan nilai koordinat
    console.log("latitude : " + latitude + ", Longitude : " + longitude);

    // tambahkan marker dan polygon (opsional)
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup("Koordinat : " + latitude + ", " + longitude).openPopup();
    
})
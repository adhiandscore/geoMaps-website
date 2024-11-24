// inisialisasi map 
var map = L.map('maps', {
    center: [51.505, -0.09],
    zoom: 13
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// array untuk menyimpan koordina
var coordinates = [];
var markers = [];
var polygons = [];
var polyline = [];

// variable untuk menyimpan marker && poly yg dipilih
var selectedMarker = null;
var selectedPolygon = null;

// click to add marker
map.on('click', function(event) {
    var latLng = event.latlng;

    var marker = L.marker([latLng.lat, latLng.lng], {draggable: true}).addTo(map);

    markers.push(marker)

    marker.on('click', function() {
        // tanda marker terpilih
        selectedMarker = marker;
        
    })
    // perbarui polygon di titik baru
    updatePolygon();
    
});

// fungsi untuk memperbarui polygon
function updatePolygon() {
    // ambil semua koordinat dari marker
    var latlngs = markers.map(function(marker) {
        return marker.getLatLng();
    });

    // hapus polygon lama jika ada
    if (polygons.length > 0) {
        polygons.forEach(polygon => polygon.remove());
        polygons = [];
    }

    // tambahkan polygon baru
    if (latlngs.length >= 3) {
        var polygon = L.polygon(latlngs, {
            color: 'blue',
            fillColor: 'blue',
            fillOpacity: 0.5
        }).addTo(map);

        // tambahkan event klik pada polygon 
        polygon.on('click', function() {
            selectedPolygon = polygon;
            marker.off('click');
        });

        polygons.push(polygon);
    }
}

// fungsi untuk menghapus marker terpilih
function clearSelectedMarker() {
    if(!selectedMarker) {
        alert("no marker selected");
        return;
    }
    map.removeLayer(selectedMarker);

    markers = markers.filter(marker => marker !== selectedMarker);

    selectedMarker = null;

    updatePolygon();

}

// fungsi untuk menghapus polygon terpilih
function deleteSelectedPolygon() {
    if(selectedPolygon) {
        map.removeLayer(selectedPolygon);
        polygons = polygons.filter(polygon => polygon !== selectedPolygon);
        selectedPolygon = null;
    }else {
        alert("tidak ada polygon terpilih");
    }
}

// fungsi untuk menyimpan koordinat polygon
function savePolygon() {
    if (polygon.length > 0) {
        var savedPolygons = polygons.map(polygon => polygon.getlatlng());
        var jsonString = JSON.stringify(savePolygons);

        // simpan sebagai file json
        var blob = new blob([jsonString], {type: 'application/json'});
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'polygons.json';
        link.click();
        alert("Polygon disimpan"); 
    } else {
        alert ("tidak ada polygon untuk disimpan");
    }
}

// event listener untuk tombol
document.getElementById('deleteSelectedPolygon').addEventListener('click', deleteSelectedPolygon);
document.getElementById('clearSelectedMarker').addEventListener('click', clearSelectedMarker);
document.getElementById('savePolygon').addEventListener('click', savePolygon);
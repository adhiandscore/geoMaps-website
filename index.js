// inisialisasi map 
var map = L.map('maps', {
    center: [-0.421, 111.09],
    zoom: 6
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// array untuk menyimpan koordinat
var coordinates = [];
var polyline = [];
var selectedMarkers = [];

let markers = [];
let polygon = null;
let selectedPolygon = null;

// Buat icon untuk default dan saat dipilih
var defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
});

var selectedIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
});

// click to add marker
map.on('click', function (event) {

    const latlng = event.latlng;

    const marker = L.marker([latlng.lat, latlng.lng], { draggable: true, icon: defaultIcon }).addTo(map);
    markers.push(marker);

    marker.on('click', function (e) {
        L.DomEvent.stopPropagation(e);
        selectedMarkerHandler(marker);
    });

    marker.on('drag', function () {
        updatePolygon();
    });
    
    updatePolygon();

});

// fungsi untuk memperbarui polygon
function updatePolygon() {

    if (polygon) {
        map.removeLayer(polygon)
    }

    if (markers.length >= 3) {
        const latlngs = markers.map(marker => marker.getLatLng());

        polygon = L.polygon(latlngs, {
            color: 'blue',
            fillColor: 'green',
            fillOpacity: 0.5
        }).addTo(map);

        // add polygon event listener
        polygon.on('click', function (event) {
            L.DomEvent.stopPropagation(event);
            selectedPolygonHandler(polygon);
        });
    };


}

function selectedMarkerHandler(marker) {
    if (selectedMarkers.includes(marker)) {

        selectedMarkers = selectedMarkers.filter(m => m !== marker);
        marker.setIcon(defaultIcon);
    } else {
        
        selectedMarkers.push(marker);
        marker.setIcon(selectedIcon);
    }
}

// fungsi untuk menghapus polygon terpilih
function deleteSelectedMarker() {

    if (selectedMarkers.length > 0) {
        selectedMarkers.forEach(marker => {

            map.removeLayer(marker);
        });

        selectedMarkers = [];

        alert("marker telah dihapus")
    } else {
        alert("tidak ada marker yang dipilih untuk dihapus")
    }
}

function selectedPolygonHandler(clickedPolygon) {

    if (selectedPolygon === clickedPolygon) {
        selectedPolygon.setStyle({
            color: "blue",
            fillColor: "green",
            fillOpacity: 0.5
        });
        selectedPolygon = null;
    } else {
        if (selectedPolygon) {
            selectedPolygon.setStyle({
                color: "blue",
                fillColor: "green",
                fillOpacity: 0.5
            });
        } 
        // set polygon yang diklik sebagai selected Polygon
        selectedPolygon = clickedPolygon;
        selectedPolygon.setStyle({
            color: "red",
            fillColor: "yellow",
            fillOpacity: 0.7
        });

        
    };
}

function deleteSelectedPolygon() {
    if(selectedPolygon){
        map.removeLayer(selectedPolygon);

        polygons = polygons.filter(polygon => polygon !== selectedPolygon);

        selectedPolygon = null;
        
        alert("polygon yang anda pilih terhapus");
    } else {
        alert("tidak ada polygon yang dipilih untuk dihapus");
    }
}


// // fungsi untuk menyimpan polygon ke database
// function savePolygon() {

// }

// // konversi data polygon ke arcgist
// function savePolygonToArcgist() {

// }

// // simpan data polygon ke json 
// function savePolygonToJson() {

// }

// // simpan data polygon ke geojson 
// function savePolygonToGeoJson() {

// }

// // event listener untuk tombol
document.getElementById('deleteSelectedMarker').addEventListener('click', deleteSelectedMarker);
document.getElementById('deleteSelectedPolygon').addEventListener('click', deleteSelectedPolygon);
document.getElementById('clearSelectedMarker').addEventListener('click', clearSelectedMarker);
document.getElementById('savePolygon').addEventListener('click', savePolygon);
// inisialisasi map 
var map = L.map('maps', {
    center: [-0.421, 111.09],
    zoom: 6
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// array untuk menyimpan koordina
var coordinates = [];
var polyline = [];
var selectedMarker = null;

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
    map.on('click', function(event) {

        const latlng = event.latlng;

        const marker = L.marker([latlng.lat, latlng.lng], {draggable: true, icon: defaultIcon}).addTo(map);
        markers.push(marker);
        
        // klik marker event
        marker.on('click', function() {
            // cek marker apakah diklik?
            if(selectedMarker === marker) {
                map.removeLayer(marker);
                markers = markers.filter( m => m !== marker);
                updatePolygon();
            } 
        });

        marker.on('drag', function() {
            updatePolygon();
        });

        updatePolygon();

    });

function markerSelected() {
    if (marker.length >= 3) {
        var polygon = L.polygon(latlngs, {
            color: 'blue',
            fillColor: 'green',
            fillOpacity: 0.5
        });
    };
}

// fungsi untuk memperbarui polygon
function updatePolygon() {
    if( polygon ) {
        map.removeLayer(polygon)
    }

    if(markers.length >= 3) {
        const latlngs = markers.map(marker => marker.getLatLng());
        
        polygon = L.polygon(latlngs, {
            color: 'blue',
            fillColor: 'green',
            fillOpacity: 0.5
        }).addTo(map);

        // add polygon event listener
        polygon.on('click', function () {
            if (selectedPolygon === polygon) {
                polygon.setStyle({
                    color: 'blue',
                    fillColor: 'orange'
                });
                selectedPolygon = null;
            }else {
                if(selectedPolygon) {
                    selectedPolygon.setStyle({
                        color: 'blue',
                        fillColor: '#3388ff'
                    });
                }

                polygon.setStyle({
                    color: 'red',
                    fillColor: '#ff6666'
                });
                selectedPolygon = polygon;
            }
        });
    }

    const latlngs = markers.map(marker => marker.getLatLng());
    

}

// fungsi untuk menghapus marker terpilih
function clearSelectedMarker() {
   

}

// fungsi untuk menghapus polygon terpilih
function deleteSelectedPolygon() {
   
}

// fungsi untuk menyimpan polygon ke database
function savePolygon() {
    
}

// konversi data polygon ke arcgist
function savePolygonToArcgist() {
    
}

// simpan data polygon ke json 
function savePolygonToJson() {
    
}

// simpan data polygon ke geojson 
function savePolygonToGeoJson() {
    
}

// event listener untuk tombol
document.getElementById('deleteSelectedPolygon').addEventListener('click', deleteSelectedPolygon);
document.getElementById('clearSelectedMarker').addEventListener('click', clearSelectedMarker);
document.getElementById('savePolygon').addEventListener('click', savePolygon);
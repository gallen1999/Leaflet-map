var map = L.map('map').setView([43.1594, -79.2469], 12);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 15,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
    }).addTo(map);

    map.locate({setView: true, maxZoom: 16});
    function onLocationFound(e) {
        var radius = e.accuracy;
    
        L.marker(e.latlng).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();
    
        L.circle(e.latlng, radius).addTo(map);
    }
    
    map.on('locationfound', onLocationFound);

    function onLocationError(e) {
        alert(e.message);
    }
    
    map.on('locationerror', onLocationError);
    

    var marker = L.marker([43.1594, -79.2469]).addTo(map);
    

    var m2 = L.marker();
    var popup = L.popup();
   function onMapClick(e) {
        var latlngstring = e.latlng.toString().replace("LatLng", "");
        m2.setLatLng(e.latlng).addTo(map);
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + e.latlng.lat + '&lon=' + e.latlng.lng + '&appid=' + '3b6d051268cd1cbd45eecf77af1a7e44')
        .then(r => r.json()) 
        .then(data => {
            m2.bindPopup(latlngstring + "\n" + data.weather.map(w => w.description)).openPopup()
        })
    }
    map.on('click', onMapClick);


    marker.bindPopup("<b>St Catharines!</b><br>where to next?");
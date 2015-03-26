var args = arguments[0] || {};
var Map = require('ti.map');

// We do not need the best accuracy, so lets save some power
Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_NEAREST_TEN_METERS;

var startlocation;

Ti.Geolocation.getCurrentPosition(function(e){
	if(e.success){
		
	}else{
		Ti.API.info("Error code: " + e.code + " Error message: " + e.error);
	}
	
});

var mapview = Map.createView({
	mapType: Map.NORMAL_TYPE,
	region: {latitude:56.369152, longitude:10.583272,  
            latitudeDelta:0.7, longitudeDelta:0.7},  
    animate:true,
    regionFit:true,
    userLocation:true
});
$.mapwin.add(mapview);


// Load the locations and events

// once all the stuff is loaded and the map is centered on Djursland, we move the map location to center on the user



(function(){
	
})();

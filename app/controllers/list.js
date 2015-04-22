var Map = require('ti.map');
var geolib = require("geolib");
var args = arguments[0] || {};
var arrangementer = Alloy.Collections.instance("Arrangement");

// MOCK, get the system language
var lan = Ti.Locale.currentLanguage;

function doItemclick(e){
	Ti.API.info("ItemClicked");	
}

// Test fixture
var curpos = {latitude: 55.49015426635742, longitude: 9.47851276397705};

function loadEventList(){
	
	
	
	// use a simple query
	arrangementer.fetchForCurrentLanguage();
	
	
	var arr = [];
	var prop = {};
	var col = {};

	arrangementer.each(function(arrangement){
		
		prop = {height: Ti.UI.SIZE, backgroundColor: "#FFF", accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DETAIL};
		
		var dist = geolib.getDistance(
	    	{latitude: parseFloat(arrangement.get("latitude")), longitude: parseFloat(arrangement.get("longitude"))},
	    	curpos
		);
		Ti.API.info(arrangement.get("id") + " " + dist);
		
		arr.push({ 
			properties: prop,
			rowView: {model: arrangement.get("id")},
			title: {text: arrangement.get("title"), color: "#000"}
			
			//subtitle: {text: arrangement.get("subtitle"), color: "#000"}	
		});
	});
	$.lvEvents.sections[0].setItems(arr);	
}

(function(){
	// get current position
	//Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_NEAREST_TEN_METERS;

/*
	Ti.Geolocation.getCurrentPosition(function(position){
		curpos = position;
		Ti.API.info(JSON.stringify(curpos.coords));
		var dist = geolib.getDistance(
	    	{latitude: 51.5103, longitude: 7.49347},
	    	{latitude: position.coords.latitude, longitude: position.coords.longitude}
		);
		console.log(dist);
	});
*/	
	loadEventList();	
})();

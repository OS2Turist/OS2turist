var args = arguments[0] || {};

function doChangeKm(e){
	$.lblKmSetting.text = String.format("%d", e.value) + " KM";
	$.win.title = L('hometitle') + " " + String.format("%d", e.value) + " KM";
}


function readLocalData(){
	var filename = "datadump.json";
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, filename);
	var json_obj = {};
	if(file.exists()){
		Ti.API.info("file exists");
		var loadedfile = file.read().text;
		json_obj = JSON.parse(loadedfile);
		//Ti.API.info(Object.keys(json_obj)[0]);
		
    }
    // import the events that has a location
    var location, event;
    
    _.each(json_obj, function(obj){
    	location = obj.location;
    	if(location){
    		if(location.latitude && (location.latitude != "0.000000")){
    			event = {
    				vid: obj.vid,
    				title: obj.title_field,
    				subtitle: obj.field_subtitle,
    				from: obj.field_show_from,
    				to: obj.field_show_to,
    				translations: obj.translations,
    				locations: obj.locations,
    				images: obj.field_offer_images
    			};
    			
	    		Ti.API.info(obj.vid + " " + location.latitude + " " + location.longitude);	
    		}
    	}
    });	
	//Ti.API.info(json_obj);
}


function doTest(e){
	readLocalData();
}


(function(){
	doChangeKm($.sldKmSetting);	
})();

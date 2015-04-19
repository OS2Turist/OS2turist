var args = arguments[0] || {};

function doChangeKm(e){
	$.lblKmSetting.text = String.format("%d", e.value) + " KM";
	$.win.title = L('hometitle') + " " + String.format("%d", e.value) + " KM";
}

function getImageUri(obj){
	var image_uri = "";
	if(obj.field_offer_images.und){
		if(obj.field_offer_images.und.length > 0){
			image_uri: obj.field_offer_images.und[0].uri;
		}
	}
	return image_uri;
}

function getAndFormatDate(datenode){
	date_from = null;
	if(datenode.und){
		if(datenode.und.length > 0){
			date_from = Date.parse(datenode.und[0].value.split(' ')[0].replace(/-/g,"/"));
		}
	}
	return date_from;
}

function readLocalData(){
	var filename = "datadump.json";
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, filename);
	var json_obj = {};
	if(file.exists()){
		//Ti.API.info("file exists");
		var loadedfile = file.read().text;
		json_obj = JSON.parse(loadedfile);
    }
    return json_obj;
}

function processJSON(json_obj){
    var loc, newevent, image_uri, date_from, date_to, datepart, res;
    Alloy.Collections.instance("Arrangement").fetch();
    _.each(json_obj, function(obj){
    	loc = obj.location;
    	if(loc){     // import the events that has a location
    		if(loc.latitude && (loc.latitude != "0.000000")){
				_.each(obj.translations.data, function(node){
					newevent = Alloy.createModel("Arrangement",{
	    				vid: obj.vid,
	    				language: node.language,
	    				title: obj.title_field[node.language][0].safe_value,
	    				subtitle: obj.field_subtitle[node.language][0].safe_value,
	    				from_date: getAndFormatDate(obj.field_show_from),
	    				to_date: getAndFormatDate(obj.field_show_to),
	    				latitude: obj.locations[0].latitude,
	    				longitude: obj.locations[0].longitude,
    					imageuri: getImageUri(obj),	
	    				image: null  // TODO need to figure out how to best load these, maybe loaded and added when first displayed?
    				});
    				
    				
    				newevent.save({success: function(e){Ti.API.info("Save succeeded");}, error: function(e){Ti.API.info("Save failed");}});
    				Alloy.Collections.instance("Arrangement").add(newevent);
    				/*
					if(Alloy.Collections.instance("Arrangement").exists(obj.vid, node.language)){
						// Found, update
						res.set(newevent);
						res.save();
						//Ti.API.info("UPDATED(maybe) " + obj.vid);
					}else{
						// Not found, create
						
						
						//Ti.API.info("CREATED " + obj.vid);
					}
					*/
					// TODO get delete directive from the server and handle delete operation
				});
    		}
    	}
    });
}

function doTest(e){
	var data = readLocalData();
	processJSON(data);
}


(function(){
	doChangeKm($.sldKmSetting);	
})();

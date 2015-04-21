var Drupal = require('drupal');
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

function loadData(){
	var drupal = new Drupal();
	drupal.setRestPath("http://os2turist.bellcom.dk/", "da/app/content/get");
	drupal.systemConnect(
	    //success
	    function(sessionData) {
	        var uid = sessionData.user.uid;
	        console.log('session found for user '+uid);
	    },
	    //failure
	    function(error) {
	        console.log('boo :(');
	    }
	);

	// Set credentials here
	var name = "app";
	var pass = "app";
	
	var userObject;

	drupal.login(name, pass,
	    function(userData) {
	        console.log('User ' + userData.uid + ' has logged in.');
	        userObject = userData;
	    },
	    function(err){
	        console.log('login failed.');
	    }
	);
	
	
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

function dataTest(e){
	var arrangementer = Alloy.createCollection("Arrangement");
    var table = arrangementer.config.adapter.collection_name;
    arrangementer.fetch();
    $.lblData.text = arrangementer.length;
    arrangementer.each(function(mod){
    	Ti.API.info("Model: " + mod.get("nid"));
    });

}

function processJSON(json_obj){
    var loc, newevent, image_uri, date_from, date_to, datepart, res;
    var arrangementer = Alloy.createCollection("Arrangement");
    var table = arrangementer.config.adapter.collection_name;
    arrangementer.fetch();
    $.lblCount.text = arrangementer.length;
    _.each(json_obj, function(obj){
    	loc = obj.location;
    	if(loc){     // import the events that has a location
    		if(loc.latitude && (loc.latitude != "0.000000")){
				_.each(obj.translations.data, function(node){
					newevent = Alloy.createModel("Arrangement",{
						id: null,
	    				nid: obj.nid,
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
    				
    				
    				//newevent.save();
    				//arrangementer.add(newevent);
					Ti.API.info(JSON.stringify(newevent));
    				
    				//arrangementer.fetch({query:'select * from ' +table + ' where nid='+ obj.nid + ' and language="' + node.language + '"'});
    				//Ti.API.info(result);
    				/*
   					var res_arr = arrangementer.where({nid: parseInt(obj.nid), language: node.language});
   					
					if(res_arr.length === 0){
	    				newevent.save();
	    				arrangementer.add(newevent);
					}else{
						// Found, update
						newevent.set({id: res_arr[0].get("id")});
						newevent.save();
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

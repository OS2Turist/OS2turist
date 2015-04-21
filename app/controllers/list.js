var args = arguments[0] || {};
var arrangementer = Alloy.Collections.instance("Arrangement");

// MOCK, get the system language
var lan = "da";

function doItemclick(e){
	Ti.API.info("ItemClicked");	
}

function loadEventList(){
	var table = arrangementer.config.adapter.collection_name;
	// use a simple query
	arrangementer.fetch({query:'SELECT * from ' + table + ' where language="' + lan + '"'});
	var arr = [];
	var prop = {};
	var col = {};
	arrangementer.each(function(arrangement){
		
		prop = {height: Ti.UI.SIZE, backgroundColor: "#FFF", accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DETAIL};
		
		arr.push({ 
			properties: prop,
			rowView: {model: arrangement.get("id")},
			title: {text: arrangement.get("title"), color: "#000"},
			subtitle: {text: arrangement.get("subtitle"), color: "#000"}	
		});
	});
	$.lvEvents.sections[0].setItems(arr);	
}

(function(){
	loadEventList();	
})();

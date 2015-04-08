var args = arguments[0] || {};

function doChangeKm(e){
	$.lblKmSetting.text = String.format("%d", e.value) + " KM";
	$.win.title = L('hometitle') + " " + String.format("%d", e.value) + " KM";
}

(function(){
	doChangeKm($.sldKmSetting);	
})();

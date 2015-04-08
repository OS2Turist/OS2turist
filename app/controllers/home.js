var args = arguments[0] || {};

function doChangeKm(e){
	$.lblKmSetting.text = String.format("%d", e.value) + " km";
}

(function(){
	
	 // %d
	$.lblKmSetting.text = String.format("%d", $.sldKmSetting.value) + " km";	
})();

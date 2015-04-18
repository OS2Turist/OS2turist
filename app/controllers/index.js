var Drupal = require('drupal');

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


(function(){
	//loadData();
	$.index.open();

	
})();

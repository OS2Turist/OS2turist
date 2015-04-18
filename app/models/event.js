exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "vid": "int",
		    "language": "text",
		    "title": "text",
		    "subtitle": "text",
		    "from": "int",
		    "to": "int",
		    "latitude": "text",
		    "longitude": "text",
		    "image": "blob" 
		},
		adapter: {
			type: "sql",
			collection_name: "events",
			idAttribute: "id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
			// load data from the service here on regular intervals
			loadFromService: function(){
				
			}
		});

		return Collection;
	}
};
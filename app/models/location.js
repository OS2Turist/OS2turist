exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "remoteid": "int",
		    "name": "text",
		    "description": "text",
		    "iconpath": "text",
		    "latitude": "text",
		    "longitude": "text"
		},
		adapter: {
			type: "sql",
			collection_name: "location",
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
		});

		return Collection;
	}
};
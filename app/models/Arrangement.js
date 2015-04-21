exports.definition = {
	config: {
		columns: {
			"id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "nid": "integer",
		    "language": "text",
		    "title": "text",
		    "subtitle": "text",
		    "from_date": "integer",
		    "to_date": "integer",
		    "latitude": "text",
		    "longitude": "text",
		    "imageuri": "text",
		    "image": "blob"
		},
		defaults: {
			nid: 0,
			language: "",
			title: "",
			subtitle: "",
			from_date: 0,
			from_date: 0,
			latitude: "",
			longitude: "",
			imageuri: "",
			image: null
		},
		adapter: {
			type: "sql",
			collection_name: "Arrangement",
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

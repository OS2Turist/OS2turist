exports.definition = {
	config: {
		columns: {
			"id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "vid": "integer",
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
			exists: function(vid, language){
				var collection = this;
				var result = collection.where({vid: parseInt(vid), language: language});
				Ti.API.info("WTF? " + result + "  " + result.length);
				if(result.length > 0){
					return true;
				}else{
					return false;	
				}
			}
		});

		return Collection;
	}
};

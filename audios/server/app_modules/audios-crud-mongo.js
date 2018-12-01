var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';

exports.connexionMongo = function(callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		
		assert.equal(null, err);
		callback(err, db);
	});
}

exports.countAudios = function(title,callback) {
    MongoClient.connect(url, function(err, client) {
        var db = client.db(dbName);

        console.log("db " + db)
        if(!err){
        	if(title==''){
                db.collection('audios')
                    .count()
                    .then(rep => callback(rep));
			}else {
                let query = {
                    "title" : {$regex:".*"+title+".*",$options:"i"}
                }
                db.collection('audios')
					.find(query)
                    .count()
                    .then(rep => callback(rep));

			}
        }
    });
};

exports.findAudios = function(page, pagesize, title, callback) {
    MongoClient.connect(url, function(err, client) {

			var db = client.db(dbName);

			console.log("db " + db)
        if(!err){
			if(title == ''){
                db.collection('audios')
                    .find()
                    .skip(page*pagesize)
                    .limit(pagesize)
                    .toArray()
                    .then(arr=>{
                        db.collection('audios')
							.count()
							.then(rep=>callback(arr,rep))
					});
			}
			else{
					let query = {
						"title" : {$regex:".*"+title+".*",$options:"i"}
					}
                    db.collection('audios')
                        .find(query)
                        .skip(page*pagesize)
                        .limit(pagesize)
                        .toArray()
                        .then(arr=>{
                            db.collection('audios')
								.find(query)
                                .count()
                                .then(rep=>callback(arr,rep))
					});
			}
        }
        else{
            callback(-1);
        }
    });
};

exports.findAudioById = function(_id, callback) {
    MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
        if(!err) {
        	// La requete mongoDB

            let myquery = { "_id": ObjectId(_id)};

            db.collection("audios") 
            .findOne(myquery, function(err, data) {
            	let reponse;

                if(!err){
                    reponse = {
                    	succes: true,
                        audio : data,
                        error : null,
                        msg:"Details du audio envoyés"
                    };
                } else{
                    reponse = {
                    	succes: false,
                        audio : null,
                        error : err,
                        msg: "erreur lors du find"

                    };
                }
                callback(reponse);
            });
        } else {
        	let reponse = reponse = {
                    	succes: false,
                        audio : null,
                        error : err,
                        msg: "erreur de connexion à la base"
                    };
            callback(reponse);
        }
    });
}

exports.createAudio = function(formData, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

	    if(!err) {
	 
			let toInsert = {
				title : formData.title, 
				author : formData.author
			};
			console.dir(JSON.stringify(toInsert));
		    db.collection("audios")
		    .insert(toInsert, function(err, insertedId) {
		    	let reponse;

		    	console.log('++++'+insertedId)

		        if(!err){
		            reponse = {
		                succes : true,
		                result: insertedId.ops[0]._id,
		                error : null,
		                msg: "Ajout réussi " + insertedId.ops[0]._id
		            };
		        } else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à l'insertion"
		            };
		        }
		        callback(reponse);
		    });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de l'insertion, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.updateAudio = function(_id, formData, callback) {

	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

		if(!err) {
            let myquery = { "_id": ObjectId(_id)};
	        let newvalues = {
	        	title : formData.nom, 
	        	author : formData.author
	        };


			db.collection("audios")
			.replaceOne(myquery, newvalues, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Modification réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la modification"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la modification, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.deleteAudio = function(_id, callback) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);

		if(!err) {
            let myquery = { "_id": ObjectId(_id)};
	        
			db.collection("audios")
			.deleteOne(myquery, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Suppression réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la suppression"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la suppression, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}
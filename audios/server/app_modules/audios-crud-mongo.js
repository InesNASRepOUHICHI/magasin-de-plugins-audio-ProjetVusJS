var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var assert = require('assert');


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';

exports.connexionMongo = function (callback) {
	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);

		assert.equal(null, err);
		callback(err, db);
	});
}

//Registration
exports.register = function (formData, callback) {
	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);
		if (!err) {
			let toInsert = {
				email: formData.email,
				password: formData.password,
				siteUrl: formData.siteUrl,
				Nom : formData.Nom
			}
			console.log(toInsert);
			db.collection("vendeur")
				.insertOne(toInsert, function (err, data) {
					let reponse;
					console.log('++++' + data)
					if (!err) {
						reponse = {
							succes: true,
							result: data,
							error: null,
							msg: "Ajout réussi " + data
						};
					} else {
						reponse = {
							succes: false,
							error: err,
							msg: "Problème à l'insertion"
						};
					}
					callback(reponse);
				});
		} else {
			let reponse = reponse = {
				succes: false,
				error: err,
				msg: "Problème lors de l'insertion, erreur de connexion."
			};
			callback(reponse);
		}
	});
}
//#############################################################################""
//Login
exports.login = function(req,callback){
	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);
	//	console.log("db " + db)
		if (!err) {
			formData = req.formData;	
			var email = formData.email;
			var password = formData.password;
			console.log(email);
			let myquery = {'email':email, 'password':password};

			db.collection('vendeur')
		 	  .findOne(myquery ,function (err, data) {
				let reponse;
				console.log(data);
				if (!err) {
					if(data != null ) {
						reponse = {
							succes: true,
							audio: data,
							error: null,
							msg: "",
							successRedirect: '/addAudio'
						}
				
					}else{
						reponse = {
							succes: false,
							audio: null,
							error: err,
							msg: "Email non existant"
						};
					}
				} else {
					reponse = {
						succes: false,
						audio: null,
						error: err,
						msg: "Cette adresse email n'existe pas"

					};
				}
				callback(reponse);
			});
		}	
		else {
			callback(-1);
		}
	});
}

//###########################################################################"
exports.pluginAuthors = function(req,callback){
	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);
	    console.log("req " + req.siteUrl)
		if (!err) {
			//formData = req.formData;	
			var urlSite= req.siteUrl;
			console.log(urlSite)
			let myquery = {'urlSite':url};

			db.collection('vendeur').aggregate([
				{
					$lookup: {
						from: "audios",
						localField: "siteUrl",
						foreignField: "author.avatarUrl",
						as: "res"
					}
				},
  				{
     			 $match: { "res": { $ne: [] } }
   				}
				]).toArray(	function (err, data) {
				let reponse;
				console.log(data);
				if (!err) {
					if(data != null ) {
						reponse = {
							succes: true,
							audio: data,
							error: null,
							msg: ""
						}
				
					}else{
						reponse = {
							succes: false,
							audio: null,
							error: err,
							msg: ""
						};
					}
				} else {
					reponse = {
						succes: false,
						audio: null,
						error: err,
						msg: ""

					};
				}
				callback(reponse);
			});
		}	
		else {
			callback(-1);
		}
	});
}
//#################################################################################
//Add plugin
exports.addPlugin = function (formData, callback) {
	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);
        formData = formData.formData;
		if (!err) {
			let toInsert = {

				author: formData.author,
				brand:formData.brand,
				categories:formData.categories,
				controlPorts:formData.controlPorts,
                description: formData.description,
				screenshotUrl: formData.screenshotUrl
				
			};

			console.log("dans server");
			console.log(JSON.stringify(toInsert.controlPorts));
			db.collection("audios")
				.insertOne(toInsert, function (err, data) {
					let reponse;
					if (!err) {
						reponse = {
							succes: true,
							result: data,
							error: null,
							msg: "Ajout réussi " + data
						};
					} else {
						reponse = {
							succes: false,
							error: err,
							msg: "Problème à l'insertion"
						};
					}
					callback(reponse);
				});
		} else {
			let reponse = reponse = {
				succes: false,
				error: err,
				msg: "Problème lors de l'insertion, erreur de connexion."
			};
			callback(reponse);
		}
	
	});
}
exports.countAudios = function (title, callback) {
	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);

		console.log("db " + db)
		if (!err) {
			if (title == '') {
				db.collection('audios')
					.count()
					.then(rep => callback(rep));
			} else {
				let query = {
					"title": { $regex: ".*" + title + ".*", $options: "i" }
				}
				db.collection('audios')
					.find(query)
					.count()
					.then(rep => callback(rep));

			}
		}
	});
};

exports.findAudios = function (page, pagesize, title, callback) {
	MongoClient.connect(url, function (err, client) {

		var db = client.db(dbName);

		console.log("db " + db)
		if (!err) {
			if (title == '') {
				db.collection('audios')
					.find()
					.skip(page * pagesize)
					.limit(pagesize)
					.toArray()
					.then(arr => {
						db.collection('audios')
							.count()
							.then(rep => callback(arr, rep))
					});
			}
			else {
				let query = {
					"title": { $regex: ".*" + title + ".*", $options: "i" }
				}
				db.collection('audios')
					.find(query)
					.skip(page * pagesize)
					.limit(pagesize)
					.toArray()
					.then(arr => {
						db.collection('audios')
							.find(query)
							.count()
							.then(rep => callback(arr, rep))
					});
			}
		}
		else {
			callback(-1);
		}
	});
};

exports.findAudioById = function (_id, callback) {
	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);
		if (!err) {
			// La requete mongoDB

			let myquery = { "_id": ObjectId(_id) };

			db.collection("audios")
				.findOne(myquery, function (err, data) {
					let reponse;

					if (!err) {
						reponse = {
							succes: true,
							audio: data,
							error: null,
							msg: "Details du audio envoyés"
						};
					} else {
						reponse = {
							succes: false,
							audio: null,
							error: err,
							msg: "erreur lors du find"

						};
					}
					callback(reponse);
				});
		} else {
			let reponse = reponse = {
				succes: false,
				audio: null,
				error: err,
				msg: "erreur de connexion à la base"
			};
			callback(reponse);
		}
	});
}

exports.createAudio = function (formData, callback) {
	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);

		if (!err) {

			let toInsert = {
				brand: formData.brand,
				description: formData.description,
				author: formData.author
			};
			console.dir(JSON.stringify(toInsert));
			db.collection("audios")
				.insert(toInsert, function (err, insertedId) {
					let reponse;

					console.log('++++' + insertedId)

					if (!err) {
						reponse = {
							succes: true,
							result: insertedId.ops[0]._id,
							error: null,
							msg: "Ajout réussi " + insertedId.ops[0]._id
						};
					} else {
						reponse = {
							succes: false,
							error: err,
							msg: "Problème à l'insertion"
						};
					}
					callback(reponse);
				});
		} else {
			let reponse = reponse = {
				succes: false,
				error: err,
				msg: "Problème lors de l'insertion, erreur de connexion."
			};
			callback(reponse);
		}
	});
}

exports.updateAudio = function (id, formData, callback) {

	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);

		if (!err) {
			let myquery = { "_id": ObjectId(id) };
			let newvalues = {
				author: formData.author,
				brand: formData.brand,
				categories: formData.categories,
				controlPorts: formData.controlPorts,
				description: formData.description,
				imageHeight: formData.imageHeight,
				imageWidth: formData.imageWidth,
				label: formData.label,
				name: formData.name,
				pedalboardCount: formData.pedalboardCount,
				screenshotUrl: formData.screenshotUrl,
				stable: formData.stable,
				thumbnailUrl: formData.thumbnailUrl,
				uri: formData.uri,
				version: formData.version
			};

			db.collection("audios")
				.replaceOne(myquery, newvalues, function (err, result) {
					if (!err) {
						reponse = {
							succes: true,
							result: result,
							error: null,
							msg: "Modification réussie " + result
						};
					} else {
						reponse = {
							succes: false,
							error: err,
							msg: "Problème à la modification"
						};
					}
					callback(reponse);
				});
		} else {
			let reponse = reponse = {
				succes: false,
				error: err,
				msg: "Problème lors de la modification, erreur de connexion."
			};
			callback(reponse);
		}
	});
}

exports.deleteAudio = function (_id, callback) {
	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);

		if (!err) {
			let myquery = { "_id": ObjectId(_id) };

			db.collection("audios")
				.deleteOne(myquery, function (err, result) {
					if (!err) {
						reponse = {
							succes: true,
							result: result,
							error: null,
							msg: "Suppression réussie " + result
						};
					} else {
						reponse = {
							succes: false,
							error: err,
							msg: "Problème à la suppression"
						};
					}
					callback(reponse);
				});
		} else {
			let reponse = reponse = {
				succes: false,
				error: err,
				msg: "Problème lors de la suppression, erreur de connexion."
			};
			callback(reponse);
		}
	});
}

exports.findAudioById = function (_id, callback) {
	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);
		if (!err) {
			// La requete mongoDB

			let myquery = { "_id": ObjectId(_id) };

			db.collection("audios")
				.findOne(myquery, function (err, data) {
					let reponse;

					if (!err) {
						reponse = {
							succes: true,
							audio: data,
							error: null,
							msg: "Details du audio envoyés"
						};
					} else {
						reponse = {
							succes: false,
							audio: null,
							error: err,
							msg: "erreur lors du find"

						};
					}
				//	callback(reponse);
				});
		} else {
			let reponse = reponse = {
				succes: false,
				audio: null,
				error: err,
				msg: "erreur de connexion à la base"
			};
			callback(reponse);
		}
	});
}


exports.findAuthors = function(callback){
	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);
		console.log("db " + db)
		if (!err) {
			db.collection('audios')
				.distinct("author")
				.then(arr => {
					db.collection('audios')
						.count()
						.then(rep => callback(arr, rep))
				});
		}	
		else {
			callback(-1);
		}
	});
}


exports.updateAuthor = function(_id,formData, callback) {

	console.log(formData)
	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);

		if (!err) {
			let myquery = { "_id": ObjectId(_id) };;
			db.collection("audios")
				.update(myquery,  {$set: {author:formData}}, function (err, result) {
					if (!err) {
						reponse = {
							succes: true,
							result: result,
							error: null,
							msg: "Modification réussie " + result
						};
					} else {
						reponse = {
							succes: false,
							error: err,
							msg: "Problème à la modification"
						};
					}
					callback(reponse);
				});
		} else {
			let reponse = reponse = {
				succes: false,
				error: err,
				msg: "Problème lors de la modification, erreur de connexion."
			};
			callback(reponse);
		}
	});
}
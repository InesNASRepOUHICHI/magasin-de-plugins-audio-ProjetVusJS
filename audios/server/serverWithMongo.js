const express  = require('express');
const app      = express();
var path = require("path");
const port     = process.env.PORT || 8080;
const server   = require('http').Server(app);
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

const mongoDBModule = require('./app_modules/audios-crud-mongo');

// Pour les formulaires standards
const bodyParser = require('body-parser');
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

// Cette ligne indique le répertoire qui contient
// les fichiers statiques: html, css, js, images etc.
app.use(express.static(path.join(__dirname, "client")));
// Paramètres standards du modyle bodyParser
// qui sert à récupérer des paramètres reçus
// par ex, par l'envoi d'un formulaire "standard"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE ");

    next();
});



// Lance le serveur avec express
server.listen(port);

console.log("Serveur lancé sur le port : " + port);

//------------------
// ROUTES
//------------------
// Utile pour indiquer la home page, dans le cas
// ou il ne s'agit pas de public/index.html
/*app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/MyTableVue', function(req, res) {
    res.sendFile(__dirname + '/public/TableVue.html');
});
*/
// Ici des routes en :
// http GET (pour récupérer des données)
// http POST : pour insérer des données
// http PUT pour modifier des données
// http DELETE pour supprimer des données

//----------------------------------------------
// Ces routes forment l'API de l'application !!
//----------------------------------------------

// Test de la connexion à la base
app.get('/api/connection', function(req, res) {
	// Pour le moment on simule, mais après on devra
	// réellement se connecte à la base de données
	// et renvoyer une valeur pour dire si tout est ok
   mongoDBModule.connexionMongo(function(err, db) {
   	let reponse;

   	if(err) {
   		console.log("erreur connexion");
   		reponse = {
   			msg: "erreur de connexion err=" + err
   		}
   	} else {
   		reponse = {
   			msg: "connexion établie"
   		}
   	}
   	res.send(JSON.stringify(reponse));

   });
});

//Registration
app.post('/api/register', multerData.fields([]), function(req, res) {
 	mongoDBModule.register(req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

//Login
app.post('/api/login',function(req,res)  { 
		
	mongoDBModule.login(req.body, function(data) {
		res.send(JSON.stringify(data)); 
	});
});

//UserPlugin
app.get('/api/pluginAuthors',function(req,res)  { 
	let page = parseInt(req.query.page || 1);
    // idem si present on prend la valeur, sinon 10
    let pagesize = parseInt(req.query.pagesize || 10);

    let title = req.query.title || '';	
	mongoDBModule.pluginAuthors(page, pagesize, title,req, function(data) {
		res.send(JSON.stringify(data)); 
	});
});
//
app.post('/api/addPlugin',function(req,res)  { 
		
	mongoDBModule.addPlugin(req.body, function(data) {
		res.send(JSON.stringify(data)); 
	});
});

app.get('/api/audios/count', function(req, res) {
    // Pour le moment on simule, mais après on devra
    // réellement se connecte à la base de données
    // et renvoyer une valeur pour dire si tout est ok
    let title = req.query.title || '';

    mongoDBModule.countAudios(title, function(data) {
        var objdData = {
            msg:"audios count",
            data: data
        }
        res.send(JSON.stringify(objdData));
    });
});

// On va récupérer des audios par un GET (standard REST) 
// cette fonction d'API peut accepter des paramètres
// pagesize = nombre de audios par page
// page = no de la page
// Oui, on va faire de la pagination, pour afficher
// par exemple les audios 10 par 10
app.get('/api/audios', function(req, res) { 
	// Si présent on prend la valeur du param, sinon 1
    let page = parseInt(req.query.page || 1);
    // idem si present on prend la valeur, sinon 10
    let pagesize = parseInt(req.query.pagesize || 10);

    let title = req.query.title || '';

 	mongoDBModule.findAudios(page, pagesize, title, function(data,count) {
 		var objdData = {
 			msg:"audio recherchés avec succès",
 			data: data,
			count:count
		 }
		 console.log("Test")

 		res.send(JSON.stringify(objdData)); 
 	}); 
});

// Récupération d'un seul audio par son id
app.get('/api/audios/:id', function(req, res) {
	var id = req.params._id;

 	mongoDBModule.findAudioById(id, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
 
});

// Creation d'un audio par envoi d'un formulaire
// On fera l'insert par un POST, c'est le standard REST
app.post('/api/audios', multerData.fields([]), function(req, res) {
	// On supposera qu'on ajoutera un audio en 
	// donnant son nom et sa cuisine. On va donc 
	// recuperer les données du formulaire d'envoi
	// les params sont dans req.body même si le formulaire
	// est envoyé en multipart

 	mongoDBModule.createAudio(req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

// Modification d'un audio, on fera l'update par
// une requête http PUT, c'est le standard REST
app.put('/api/audios/:id', multerData.fields([]), function(req, res) {
	var id = req.params.id;

 	mongoDBModule.updateAudio(id, req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

// Suppression d'un audio
// On fera la suppression par une requête http DELETE
// c'est le standard REST
app.delete('/api/audios/:id', function(req, res) {
	var id = req.params.id;
 	mongoDBModule.deleteAudio(id, function(data) {
		// console.log(data.data)
 		res.send(JSON.stringify(data)); 
 	});
});

app.get('/api/authors',function(req,res)  { 
	mongoDBModule.findAuthors(function(data,count) {
			var objdData = {
				msg:"audio recherchés avec succès",
				data: data,
			   count:count
			}
			/*objdData.data.forEach(element => {
				element.author.password = "";
				console.log(element.author);
				mongoDBModule.updateAuthor(element._id,element.author, function(d) {
					console.log(JSON.stringify(d)); 
				});
			});*/
			res.send(JSON.stringify(objdData)); 
		}); 
});

app.post('/api/login',function(req,res)  { 
		
	mongoDBModule.login(req, function(data) {
		res.send(JSON.stringify(data)); 
	});
});


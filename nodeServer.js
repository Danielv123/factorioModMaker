// Library for create folder if it does not exist
var mkdirp = require("mkdirp");

var fs = require("fs");

// Zipping library
var EasyZip = require('easy-zip').EasyZip;

// Convert mod to usable LUA
var js2lua = require('js2lua');

var express = require("express");
// Required for express post requests
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('static'));

app.post("/js2lua", function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	// Sample data
	var zipped = {};
	zipped.name = 'cowsMod';
	zipped.version = '0.1.3';
	zipped.title = 'COWS IN FACTORIO!';
	zipped.author = 'Danielv123';
	zipped.description = 'Adds cows to game.';
	console.log(req.body)
	// Create mod in folder
	mkdirp(req.body.info.name + "_" + req.body.info.version, function() {
		fs.writeFileSync(req.body.info.name + "_" + req.body.info.version + "/info.json", JSON.stringify(req.body.info));
		fs.writeFileSync(req.body.info.name + "_" + req.body.info.version + "/data.lua", "data:extend(" + js2lua.convert(req.body.data) + ")");

		// Zip it up!
		var zip5 = new EasyZip();
		zip5.zipFolder(req.body.info.name + "_" + req.body.info.version,function(){
			zip5.writeToFile('static/' + req.body.info.name + "_" + req.body.info.version + '.zip');
		});
		
		// Attempt sending the file back to client
		res.send(req.body.info.name + "_" + req.body.info.version + ".zip");
	});
});

var server = app.listen(8080, function () {
    console.log("Listening on port %s...", server.address().port);
});

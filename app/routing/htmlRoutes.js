var path= require("path");

var db = require("../models");

module.exports = function (app) {

	app.get("/", function(request, response){
		response.sendFile(path.join(__dirname + '/../../views/index.html'));
	});
	app.get("/signup", function(request, response){
		response.sendFile(path.join(__dirname + '/../../views/signUp.html'));
	});
	app.get("/aboutme", function(request, response){
		response.sendFile(path.join(__dirname + '/../../views/aboutMe.html'));
	});

	app.get("/sugar", function(request, response){
		response.sendFile(path.join(__dirname + '/../../views/sugar.html'));
	});





}; //end exports

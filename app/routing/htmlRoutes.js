var path= require("path");
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

	app.get("/aboutPets", function(request, response){
		response.sendFile(path.join(__dirname + '/../../views/aboutPets.html'));
	});




}; //end exports


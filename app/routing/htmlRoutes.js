var path = require("path");




var db = require("../models");

var authredirect = require("../routing/apiRoutes.js");

module.exports = function(app, passport) {

	// app.get("/public/:folder/:file", function(req, res){
	// 	var folder=req.params.folder;
	// 	var file=req.params.file;
	// 	res.sendFile(path.join(__dirname, "/../public",folder,file));
	// });
	app.get("/test", function(request, response) {
    response.sendFile(path.join(__dirname + '/../../views/pictest.html'));
  });
	app.get("/profile", isLoggedIn, function(req, res){
			res.sendFile(path.join(__dirname + '/../../views/profile.html'));
	});

  app.get("/", function(request, response) {
    response.sendFile(path.join(__dirname + '/../../views/index.html'));
  });
  app.get("/signup", function(request, response) {
    response.sendFile(path.join(__dirname + '/../../views/signUp.html'));
  });
  app.get("/aboutme", function(request, response) {
    response.sendFile(path.join(__dirname + '/../../views/aboutMe.html'));
  });

	app.get('/uploads/:pic_name', function(req, res){
		res.sendFile(path.join(__dirname, '/../../uploads', req.params.pic_name));
	})

	app.get('/downloads/:pic_name', function(req, res){
		res.sendFile(path.join(__dirname, '/../../downloads', req.params.pic_name));
	})

  app.get("/sugar", function(request, response) {
    response.sendFile(path.join(__dirname + '/../../views/sugar.html'));
  });


  app.get("/bulletin", function(request, response) {
    response.sendFile(path.join(__dirname + '/../../views/bulletin.html'));
  });

	app.get("/bulletinboard", function(request, response) {
    response.sendFile(path.join(__dirname + '/../../views/bulletinboard.html'));
  });



  //app.get('/dashboard',isLoggedIn, authController.dashboard);


  app.get('/logout', exports.logout = function(req, res) {
    req.logOut();
    //req.session.destroy(function(err) {
    res.redirect('/');
  });
  //});
	app.post('/put_newuser_in_db',
		passport.authenticate('local-signup'),

		function(req, res) {
			// If this function gets called, authentication was successful.
			// `req.user` contains the authenticated user.
			res.json(req.user);
		});
  // app.post('/put_newuser_in_db', passport.authenticate('local-signup',  { successRedirect: '/bulletin', failureRedirect: '/signup'}));

  app.post('/put_newuser_in_db',
    passport.authenticate('local-signup'),

    function(req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      res.json(req.user);
    });

  app.post('/signin',
    passport.authenticate('local-signin'),
    function(req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      res.json(req.user);
    });

//makes sure user is signed in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
		//	console.log(req);
      return next();
    }

    res.redirect('/');
  }



}

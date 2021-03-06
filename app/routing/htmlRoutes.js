var path = require("path");

var db = require("../models");

var authredirect = require("../routing/apiRoutes.js");

var loginAuth =require("./userSignInAuth.js");

module.exports = function(app, passport) {

	app.get("/profile", loginAuth.isLoggedIn, function(req, response) {
			response.render('pages/profile');
	});

  app.get("/", function(request, response) {
    response.render('pages/index');
  });

	app.get("/disclaimer", function(request, response) {
		response.render('pages/disclaimer');
	});

  app.get("/signup", function(request, response) {
    if (!request.user) {
			response.render('pages/signUp');
		} else {
			response.redirect('/profile');
		}
  });

	app.get("/pets", loginAuth.isLoggedIn, function(request, response) {
    response.render('pages/pets');
  });

	app.get('/uploads/:pic_name', function(req, res){
		res.sendFile(path.join(__dirname, '/../../uploads', req.params.pic_name));
	})

	app.get('/downloads/:pic_name', loginAuth.isLoggedIn, function(req, res){
		res.sendFile(path.join(__dirname, '/../../downloads', req.params.pic_name));
	})

  app.get("/bulletin", loginAuth.isLoggedIn, function(request, response) {
    response.render('pages/bulletin');
  });

	app.get("/bulletinboard", loginAuth.isLoggedIn, function(request, response) {
  response.render('pages/bulletinboard');;
  });

	app.get("/uploadForm", function(req,res){
		res.redirect('/profile');
	})

	app.get("/uploadForm_Pets", function(req,res){
		res.redirect('/profile');
	})



  app.get('/logout', exports.logout = function(req, res) {
    req.logOut();
    res.redirect('/');
  });

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




}

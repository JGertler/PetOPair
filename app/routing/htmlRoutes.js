var path = require("path");




var db = require("../models");

var authredirect = require("../routing/apiRoutes.js");

module.exports = function(app, passport) {

  app.get("/", function(request, response) {
    response.sendFile(path.join(__dirname + '/../../views/index.html'));
  });
  app.get("/signup", function(request, response) {
    response.sendFile(path.join(__dirname + '/../../views/signUp.html'));
  });
  app.get("/aboutme", function(request, response) {
    response.sendFile(path.join(__dirname + '/../../views/aboutMe.html'));
  });

  app.get("/sugar", function(request, response) {
    response.sendFile(path.join(__dirname + '/../../views/sugar.html'));
  });


  app.get("/bulletin", isLoggedIn, function(request, response) {
    response.sendFile(path.join(__dirname + '/../../views/bulletin.html'));
  });



  //app.get('/dashboard',isLoggedIn, authController.dashboard);


  app.get('/logout', exports.logout = function(req, res) {
    req.logOut();
    //req.session.destroy(function(err) {
    res.redirect('/');
  });
  //});

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


  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
			console.log(req);
      return next();
    }

    res.redirect('/');
  }


}

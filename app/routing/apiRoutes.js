var Human = require("../models/info.js");
var Pets = require("../models/petInfo.js");
var keys = require("../config/keys.js");
var request = require("request");
var bCrypt = require("bcrypt-nodejs");

// Routes
// =============================================================
module.exports = function(passport, app, user) {
  var User = user;
  var LocalStrategy = require("passport-local").Strategy;

  app.get("/profile/:username", function(req, res) {
    // If the user provides a specific character in the URL...
    //  if (req.params.characters) {

    // Then display the JSON for ONLY that character.
    // (Note how we're using the ORM here to run our searches)
    console.log(req.user.username);
    Human.findOne({
      where: {
        username: req.user.username
      }
    }).then(function(result) {
      return res.json(result);
    });

    //}
  });

  // Get all user API
  app.get("/api/users", function(req, res) {
    Human.findAll({}).then(function(results) {
      res.json(results);
    });
  });
  //JK added
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  app.post("/put_newuser_in_db", function(req, response) {
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
      User.findById(id).then(function(user) {
        if (user) {
          done(null, user.get());
        } else {
          done(user.errors, null);
        }
      });
    });

    passport.use(
      "local-signup",
      new LocalStrategy(
        {
          usernameField: "username",
          passwordField: "password",
          passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
          var generateHash = function(password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
          };

          User.findOne({
            where: {
              username: username
            }
          }).then(function(user) {
            if (user) {
              console.log("Wrong Place!!!");
              return done(null, false, {
                message: "That username is already taken"
              });
            } else {
              //var info=req.body;
              var userPassword = generateHash(password);
              console.log("!!!" + req.body.first_name);
              // var info =
              // { first_name: req.body.first_name,
              // last_name: req.body.last_name,
              //   username:username,
              // password:userPassword
              //
              // };

              var userPassword = generateHash(password);
              //console.log("!!!"+req.body.first_name);
              var info = req.body;
              info.username = username;
              info.password = userPassword;

              var address = req.body.autocomplete;

              var queryUrl =
                "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                address +
                "&key=" +
                keys.mapKey;
              //
              request(queryUrl, function(error, res, body) {
                //
                if (!error && res.statusCode === 200) {
                  //
                  var bObject = JSON.parse(res.body);
                  var lat = bObject["results"][0].geometry.location.lat;
                  var lng = bObject["results"][0].geometry.location.lng;
                  info.address_lat = lat;
                  info.address_lng = lng;
                  //       console.log(info);
                  //
                  User.create(info).then(function(newUser, created) {
                    if (!newUser) {
                      return done(null, false);
                    }

                    if (newUser) {
                      return done(null, newUser);
                    }
                  });
                  //
                  //
                } else {
                  console.log(error);
                }
              });
            }
          });
        }
      )
    );

    //LOCAL SIGNIN
    passport.use(
      "local-signin",
      new LocalStrategy(
        {
          //  console.log("made it here1");
          // by default, local strategy uses username and password, we will override with username
          usernameField: "username",
          passwordField: "password",
          passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
          //  console.log("made it here2");
          var User = user;

          var isValidPassword = function(userpass, password) {
            return bCrypt.compareSync(password, userpass);
          };

          User.findOne({
            where: {
              username: username
            }
          })
            .then(function(user) {
              if (!user) {
                console.log("'username does not exist'");
                return done(null, false, {
                  message: "username does not exist"
                });
              }

              if (!isValidPassword(user.password, password)) {
                alert("wrong password");
                return done(null, false, {
                  message: "Incorrect password."
                });
              }

              var userinfo = user.get();

              return done(null, userinfo);
            })
            .catch(function(err) {
              return done(null, false, {
                message: "Something went wrong with your Signin"
              });
            });
        }
      )
    );
  });

  // Get all user API
  app.get("/api/pets", function(req, res) {
    Pets.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  app.post("/put_newpet_in_db", function(req, response) {
    console.log(req.body);

    var petInfo = req.body;
    Pets.create(petInfo)
      .then(function(results) {
        response.json(results);
      })
      .catch(function(err) {
        console.log("Data err with upload");
        console.log(err);
      });
  });
};

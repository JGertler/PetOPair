var Human = require("../models/info.js");
var Pets = require("../models/petInfo.js");
//var keys = require("../config/keys.js");
var request = require("request");
var bCrypt = require("bcrypt-nodejs");
var path = require('path');
var fileUpload = require('express-fileupload');
var s3 = require('s3');

// Routes
// =============================================================
module.exports = function(passport, app, user) {
  var User = user;
  var LocalStrategy = require("passport-local").Strategy;
  app.get("/profile/:username", function(req, res) {
    // finds the currently logged in user and returns their info to the profile page
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
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
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
              "&key=AIzaSyBaw-4l7qS4b_L7kXhuHViE2smEu1k34Dw";
            //  keys.mapKey;
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


  app.post('/upload', function(req, res) {
  	if (!req.files) {
  		return res.status(400).send('No files were uploaded.');
  	}
    Console.log("HHHIIHI");
  	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  	var profilePic = req.files.profilePic;
  	console.log(req.files.profilePic.name +"99999");

  	// Use the mv() method to place the file somewhere on your server
  	profilePic.mv('uploads/' + req.files.profilePic.name, function(err) {
  		if (err) {
  			return res.status(500).send(err);
  		}
  		  //res.write("<h1>Uploaded from file</h2><img style='max-width:20%' src='uploads/" + req.files.profilePic.name + "'/>");

  		res.end();
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
   app.get("/api/pets", function(req, res) {
     Pets.findAll({}).then(function(results) {
       res.json(results);
     });
   });
   app.post("/put_newpet_in_db", function(req, res) {
     Pets.create({
       pet_name: req.body.pet_name,
       treatment: req.body.treatment,
       moreInfo: req.body.moreInfo,
       startDate: req.body.startDate,
       endDate: req.body.endDate
     });
   });


  // amazon aws route

app.use(fileUpload());

  app.post("/uploadForm", function(req, res) {
console.log(keys);
    var client = s3.createClient({
      maxAsyncS3: 20, // this is the default 
      s3RetryCount: 3, // this is the default 
      s3RetryDelay: 1000, // this is the default 
      multipartUploadThreshold: 20971520, // this is the default (20 MB) 
      multipartUploadSize: 15728640, // this is the default (15 MB) 
      s3Options: {
        accessKeyId: keys.s3accesskey,
        secretAccessKey: keys.s3secretaccesskey,
        // any other options are passed to new AWS.S3() 
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property 
      },
    });
    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "uploadedPic") is used to retrieve the uploaded file 
    var uploadedPic = req.files.uploadedPic;

    // Use the mv() method to place the file somewhere on your server 
    uploadedPic.mv('uploads/' + req.files.uploadedPic.name, function(err) {
      if (err) {
        return res.status(500).send(err);
      }

      // Upload to S3
      var params = {
        localFile: 'uploads/' + req.files.uploadedPic.name,

        s3Params: {
          Bucket: keys.s3bucket,
          Key: req.files.uploadedPic.name, // File path of location on S3
        },
      };
      var uploader = client.uploadFile(params);
      uploader.on('error', function(err) {
        console.error("unable to upload:", err.stack);
        res.status(500).send(err.stack);
      });
      uploader.on('end', function() {
        console.log("done uploading");
        res.send('File uploaded!');
      });
    }); 
  }); //end post route


};





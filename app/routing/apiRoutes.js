var Human = require("../models/info.js");
var keys=require("../config/keys.js");
var request = require("request");
// Routes
// =============================================================
module.exports = function(app) {

  app.post("/receive", function(req, res) {

    var info = req.body;

    Human.create(info)
    .then(function(data) {
      console.log("Data uploaded");
    })
    .catch(function (err) {
      console.log("Data err with upload");
      console.log(err);
    })

    console.log(info);

    res.json("human info received");
  });

  // Get all books
  app.get("/api/userprofile", function(req, res) {
    Human.findAll({}).then(function(results) {
      res.json(results);
    });
  });



  // Add a human
  app.post("/api/userprofile", function(req, response) {
    //console.log("Human Data:");
    //console.log(req.body);
  //  geocode(req.body.formatted_address, req.body)//.then(function(results) {
    //  res.json("results");
  //  });
    var address= req.body.formatted_address;
    var userInfo=req.body;
    var queryUrl ="https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key="+keys.mapKey;

    request(queryUrl, function(error, res, body) {

      if (!error && res.statusCode === 200) {

        var bObject=JSON.parse(res.body);
        var lat=bObject["results"][0].geometry.location.lat;
        var lng=bObject["results"][0].geometry.location.lng;

      Human.create({
        first_name:userInfo.first_name,
        last_name:userInfo.last_name,
        email: userInfo.email,
        formatted_address: address,
        address_lat: lat,
        address_lng: lng
      }).then(function(results) {
        response.json(results);
      });


      }
      else{
        console.log(error);
      }

    });
  });

}

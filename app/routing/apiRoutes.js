var Human = require("../models/info.js");
var keys=require("../config/keys.js");
var request = require("request");
// Routes
// =============================================================
module.exports = function(app) {



  // Get all user API
  app.get("/api/users", function(req, res) {
    Human.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  app.post("/put_newuser_in_db", function(req, response) {

    var address= req.body.autocomplete;
    var info=req.body;
    var queryUrl ="https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key="+keys.mapKey;

    request(queryUrl, function(error, res, body) {

      if (!error && res.statusCode === 200) {

        var bObject=JSON.parse(res.body);
        var lat=bObject["results"][0].geometry.location.lat;
        var lng=bObject["results"][0].geometry.location.lng;
        info.address_lat=lat;
        info.address_lng=lng;
        console.log(info);

    Human.create(info)
      .then(function(results) {
        response.json(results);
      })
      .catch(function (err) {
        console.log("Data err with upload");
        console.log(err);
      })


      }
      else{
        console.log(error);
      }

    });
  });


}

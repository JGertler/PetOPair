var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var PORT= process.env.PORT || 8080;


app.use(bodyParser.urlencoded({extended:true}));
// parse various different custom JSON types as JSON
app.use(bodyParser.json({type: 'application/*+json'}))
// parse some custom things into a buffer??
app.use(bodyParser.raw({type: 'application/vnd.custom-type'}))
//parse an html body into a string
app.use(bodyParser.text({type: 'text/html'}))
app.use(express.static('public'));


var db = require("./app/models/info.js");

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);


db.sequelize.sync()
.then(function() {

	app.listen(PORT,function() {
	console.log("Listening on PORT: " + PORT);
});
	console.log("Database sync!");
})
.catch(function(err) {
	console.log(err);
})

var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var passport   = require('passport')
var session    = require('cookie-session')

//var env        = require('dotenv').load()
var methodOverride = require('method-override');
var exphbs = require('express-handlebars')

var PORT= process.env.PORT || 8080;
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));
// parse various different custom JSON types as JSON
app.use(bodyParser.json({type: 'application/*+json'}))
// parse some custom things into a buffer??
app.use(bodyParser.raw({type: 'application/vnd.custom-type'}))
//parse an html body into a string
app.use(bodyParser.text({type: 'text/html'}))
// app.use(express.static('public'));
//commented out the above line and added line13 instead-JB


app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(methodOverride('method'));
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));

app.set('view-engine', 'handlebars');

var db = require("./app/models/info.js");

//var authRoute = require('./app/routes/auth.js')(app,passport);


//load passport strategies
//require('./app/config/passport/passport.js')(passport,db);

require("./app/routing/apiRoutes.js")(passport, app, db);
require("./app/routing/htmlRoutes.js")(app, passport);


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

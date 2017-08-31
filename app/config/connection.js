
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL

var Sequelize = require("sequelize");
// var keys=require("keys.js");
var keys=require("./keys.js");
*Username*: root
*Password*: rootroot
*Port*: 3306
*Database*: petladiez
// Creates mySQL connection using Sequelize
//var sequelize = new Sequelize("POP_db", "root", keys.sqlKey, {
var sequelize = new Sequelize("petladiez", "root", "rootroot", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Exports the connection for other files to use
module.exports = sequelize;

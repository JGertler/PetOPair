var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

//  Pet table
var Pet = sequelize.define('Pet', {
    pet_name: {
      type: Sequelize.TEXT
    },
    city: {
      type: Sequelize.TEXT
    },
    treatment: {
      type: Sequelize.TEXT
    },
    moreInfo: {
      type: Sequelize.TEXT
    },
    startDate: {
      type: Sequelize.TEXT
    },
    endDate: {
      type: Sequelize.TEXT
    }
  })

module.exports = Pet;
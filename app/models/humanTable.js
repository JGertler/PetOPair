// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");


// Creates a "Human" model that matches up with DB
var Human = sequelize.define("human", {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
      // len is a validation that checks that our todo is between 1 and 140 characters
      validate: {
        len: [2, 140]
      }
  },
  last_name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  formatted_address: {
    type: Sequelize.STRING
  },
  address_lat: {
    type: Sequelize.DECIMAL(18, 14)
  },
  address_lng: {
    type: Sequelize.DECIMAL(18, 14)
  }
});
// {
//  timestamps: false
//});

// Syncs with DB
Human.sync();

// Makes the Book Model available for other files (will also create a table)
module.exports = Human;

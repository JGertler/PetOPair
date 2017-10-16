var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

//  Pet table
var Pet = sequelize.define('Pet', {
    pet_name: {
      type: Sequelize.TEXT
    },
    pet_type: {
      type: Sequelize.TEXT
    },
    treatment: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    morning: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    midday: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    night: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    notes: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    human_id: {
      type: Sequelize.INTEGER
    }
  })
  // Pet.destroy({ where: { id: [1] }})
  // Pet.all().then(projects => {
  //   console.log(projects);
  // })
//Pet.destroy({ where: { id: [1,2,3,4] }})
module.exports = Pet;

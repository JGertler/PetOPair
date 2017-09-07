var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

//  Pet table
var Image = sequelize.define('Image', {
    img_url: {
      type: Sequelize.TEXT
    },
    human_id: {
      type: Sequelize.TEXT
    }
  })
  // Pet.destroy({ where: { id: [1] }})
  // Pet.all().then(projects => {
  //   console.log(projects);
  // })
//Pet.destroy({ where: { id: [1,2,3,4] }})
module.exports = Image;

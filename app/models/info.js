module.exports = function(sequelize, Sequelize) {

  var Human = sequelize.define('human', {

      first_name: Sequelize.TEXT,
      last_name: Sequelize.TEXT,
      password: Sequelize.TEXT,
      email: Sequelize.TEXT,
      autocomplete: Sequelize.TEXT,
      street_number: Sequelize.TEXT,
      route:Sequelize.TEXT,
      locality:Sequelize.TEXT,
      administrative_area_level_1:Sequelize.TEXT,
      postal_code:Sequelize.TEXT
  })

  return Human;
}
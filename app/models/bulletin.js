var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

var bulletinPost = sequelize.define('Bulletin', {
	pet_for_care: {
	type: Sequelize.TEXT
	},
	city_for_care: {
	type: Sequelize.TEXT
	},
	treatment_level: {
	type: Sequelize.INTEGER
	},
	added_notes: {
	type: Sequelize.TEXT
	},
	start_date: {
	type: Sequelize.DATE
	},
	end_date: {
	type: Sequelize.DATE
	}
});

module.exports = Bulletin;
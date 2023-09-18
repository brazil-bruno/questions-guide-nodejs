const Sequelize = require("sequelize");

const connection = new Sequelize('questionsguide', 'admin', '123456', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = connection;

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('asmnodejs', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
  });

module.exports = sequelize;
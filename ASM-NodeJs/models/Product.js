const sequelize = require('./database.js');

const { Sequelize, DataTypes } = require('sequelize');

const Product = sequelize.define('products', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    images: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category_id : DataTypes.INTEGER,
  }, {
    tiemstamps: false
  });

module.exports = Product;
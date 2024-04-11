const sequelize = require('./Database.js');

const { Sequelize, DataTypes } = require('sequelize');

const Uers = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    email: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tiemstamps: false
});

module.exports = Uers;
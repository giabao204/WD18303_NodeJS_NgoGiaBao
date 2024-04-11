const sequelize = require('./database.js');
const { Sequelize, DataTypes } = require('sequelize');

const Hopdong = sequelize.define('hop_dongs',{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ten_nguoi_mua: Sequelize.STRING,
  ten_nguoi_ban:DataTypes.STRING,
  gia_tien: DataTypes.INTEGER,
  ngay_ky: DataTypes.DATE,
  trang_thai: DataTypes.INTEGER
},{
  timestamps: false
})
module.exports = Hopdong;
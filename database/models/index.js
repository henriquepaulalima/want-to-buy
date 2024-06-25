const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const Items = require('./items');
const items = Items(sequelize, Sequelize.DataTypes);
const db = {
  items,
  sequelize
};

module.exports = db;

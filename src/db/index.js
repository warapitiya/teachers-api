/**
 * Created by warapitiya on 4/12/18.
 */

const fs = require('fs');
const path = require('path');
const camelcase = require('camelcase');
const Sequelize = require('sequelize');

module.exports = (config) => {
  let sequelize = new Sequelize(config.database, config.user, config.password, config);
  let db = {};
  fs
    .readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
    .forEach((file) => {
      let model = sequelize.import(path.join(__dirname, file));
      db[camelcase(model.name)] = model;
    });
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  return db;
};

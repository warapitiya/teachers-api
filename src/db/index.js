/**
 * Created by warapitiya on 4/12/18.
 */

const fs = require('fs');
const path = require('path');
const camelcase = require('camelcase');
const Sequelize = require('sequelize');
const config = require('../../config/config');

let sequelize = new Sequelize(
  config.dbConfig.database,
  config.dbConfig.user,
  config.dbConfig.password,
  config.dbConfig
);
let db = {};
fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach(file => {
    let model = sequelize.import(path.join(__dirname, file));
    db[camelcase(model.name)] = model;
  });
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;

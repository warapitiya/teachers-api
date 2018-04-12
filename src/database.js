const Sequelize = require('sequelize');
const sequelize = new Sequelize('school', 'root', 'root', {
  host: 'localhost',
  // host: '206.189.47.125',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;

require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  dbConfig: {
    database: 'school',
    user: 'root',
    password: 'root',
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
  }
};

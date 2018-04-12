const DB = require('../db');
const config = require('../../config/config');
const db = DB(config.dbConfig);

exports.findOrCreate = (email) => {
  return db.students.findOrCreate({
    where: {email},
    default: {email}
  });
};

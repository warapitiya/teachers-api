const db = require('../db');

exports.findOrCreate = (email) => {
  return db.students.findOrCreate({
    where: {email},
    default: {email}
  });
};

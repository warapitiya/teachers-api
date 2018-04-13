const db = require('../db');

exports.findOrCreate = (email) => {
  return db.students.findOrCreate({
    where: {email},
    default: {email}
  });
};

exports.find = (email) => {
  return db.students.find({
    where: {
      email,
      active: true
    }
  })
};

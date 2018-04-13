const db = require('../db');

exports.findAll = () => {
  return db.students.findAll({
    include: [db.registeredStudents]
  });
};

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

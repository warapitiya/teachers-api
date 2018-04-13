const db = require('../db');

/**
 * Find all teachers
 * @returns {*}
 */
exports.findAllTeachers = () => {
  return db.teachers.findAll();
};

/**
 * Get teachers by emails
 * @param emails
 */
exports.getTeachersByEmail = (emails) => {
  return db.teachers.findAll({
    where: {
      email: emails
    }
  });
};

exports.createTeacher = (teacher) => {
  return db.teachers.create(teacher);
};

exports.findAllRegistered = () => {
  return db.registeredStudents.findAll({
    where: {
      active: true
    },
    include: [db.teachers, db.students]
  });
};

exports.findOrCreate = (email) => {
  return db.teachers.findOrCreate({
    where: {
      email,
    },
    defaults: {email}
  });
};

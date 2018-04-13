/**
 * Created by warapitiya on 4/13/18.
 */

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
exports.getTeachersByEmail = emails => {
  return db.teachers.findAll({
    where: {
      email: emails
    }
  });
};

/**
 * Create teacher
 * @param teacher
 * @returns {teacher}
 */
exports.createTeacher = teacher => {
  return db.teachers.create(teacher);
};

/**
 * Find all registered students
 * @returns {Promise<Array<Model>>|*}
 */
exports.findAllRegistered = () => {
  return db.registeredStudents.findAll({
    include: [
      db.teachers,
      {
        model: db.students,
        where: {
          active: true
        }
      }
    ]
  });
};

/**
 * Find or create teacher
 * @param email
 * @returns {*|Promise<Model, created>}
 */
exports.findOrCreate = email => {
  return db.teachers.findOrCreate({
    where: {
      email
    },
    defaults: {email}
  });
};

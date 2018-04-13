/**
 * Created by warapitiya on 4/13/18.
 */

const db = require('../db');

/**
 * Find all students
 * @returns {*|Promise<Array<Model>>}
 */
exports.findAll = () => {
  return db.students.findAll({
    include: [db.registeredStudents]
  });
};

/**
 * Find or create students
 * @param email
 * @returns {*|Promise<Model, created>}
 */
exports.findOrCreate = email => {
  return db.students.findOrCreate({
    where: {email},
    default: {email}
  });
};

/**
 * Find student by email
 * @param email
 * @returns {*}
 */
exports.find = email => {
  return db.students.find({
    where: {
      email,
      active: true
    }
  });
};

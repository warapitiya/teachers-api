/**
 * Created by warapitiya on 4/13/18.
 */
const db = require('../db');

exports.registerStudents = (teacher, students) => {
  students.map((student) => {
    db.registeredStudents.findOrCreate({
      where: {
        teacherId: teacher.id,
        studentId: student.id
      },
      defaults: {
        teacherId: teacher.id,
        studentId: student.id
      }
    });
  });
};

exports.getCommonStudents = (teachers) => {
  return db.registeredStudents.findAll({
    attributes: ['studentId'],
    where: {
      teacherId: {
        [db.sequelize.Op.in]: teachers
      },
      active: true
    },
    group: 'studentId',
    having: db.sequelize.literal(`count(*) > 0`),
    include: [db.students]
  });

//   return db.sequelize.query(`SELECT t1.studentId
// FROM registered_students as t1
// WHERE t1.teacherId IN (7, 4, 2)
// GROUP BY (t1.studentId)
// HAVING count(*) > 1;`, { type: db.sequelize.QueryTypes.SELECT});

};

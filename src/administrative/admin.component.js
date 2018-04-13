/**
 * Created by warapitiya on 4/13/18.
 */
const db = require('../db');
const studentsComponent = require('../students/students.component');

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
  const count = teachers.length - 1 === -1 ? 0 : teachers.length;
  return db.registeredStudents.findAll({
    attributes: ['studentId'],
    where: {
      teacherId: {
        [db.sequelize.Op.in]: teachers
      }
    },
    group: 'studentId',
    having: db.sequelize.literal(`count(*) > ${count}`),
    include: [db.students]
  });
};

exports.suspend = (email) => {
  return studentsComponent.find(email)
    .then(student => {
      student.active = false;
      return student.save();
    });
};

exports.filterNotification = (teacherEmail) => {
  return db.sequelize.query(`
  SELECT s.email as recipients
FROM (
  SELECT *
  FROM students as s1
  where active = true
) as s
INNER JOIN registered_students as rs1 ON s.id = rs1.studentId
INNER JOIN teachers t on rs1.teacherId = t.id
where t.email = '${teacherEmail}'`, {type: db.sequelize.QueryTypes.SELECT});
};



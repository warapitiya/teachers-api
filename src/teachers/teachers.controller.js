const async = require('async');
const teachersComponent = require('./teachers.component');
const studentsComponent = require('./../students/students.component');

/**
 * Get all teachers or by emails
 * @param req
 * @param res
 */
exports.getTeachers = (req, res) => {
  if (req.query.emails) {
    teachersComponent.getTeachersByEmail(req.query.emails.split(','))
      .then((teachers) => res.status(200).json(teachers));
  } else {
    teachersComponent.findAllTeachers()
      .then((teachers) => res.status(200).json(teachers));
  }
};

/**
 * Add teacher
 * @param req
 * @param res
 */
exports.addTeacher = (req, res) => {
  teachersComponent.createTeacher(req.body)
    .then((teacher) => res.json(teacher))
    .catch((error) => res.status(400));
};

exports.registered = (req, res) => {
  teachersComponent.findAllRegistered()
    .then((d) => res.json(d));
};

exports.registerStudentsForTeacher = async (req, res) => {
  teachersComponent.findOrCreate(req.body.teacher)
    .then((teacher) => {
      const students = [];
      async.each(req.body.students, (student, callback) => {
        studentsComponent.findOrCreate(student)
          .then((student) => {
            students.push(student);
            callback();
          });
      }, (err) => {
        if (err) {
          // One of the iterations produced an error.
          // All processing will now stop.
          console.log('A file failed to process');
        } else {
          teachersComponent.registerStudents(teacher, students);
          res.status(200).end();
        }
      });
    });
};

/**
 * Created by warapitiya on 4/13/18.
 */
const async = require('async');
const teachersComponent = require('./../teachers/teachers.component');
const studentsComponent = require('./../students/students.component');
const adminComponent = require('./admin.component');

exports.registered = (req, res) => {
  teachersComponent.findAllRegistered()
    .then((d) => res.json(d));
};

exports.registerStudentsForTeacher = (req, res) => {
  teachersComponent.findOrCreate(req.body.teacher)
    .then((teacher) => {
      const students = [];
      async.each(req.body.students, (student, callback) => {
        studentsComponent.findOrCreate(student)
          .then((student) => {
            students.push(student[0]);
            callback();
          });
      }, (err) => {
        if (err) {
          console.error('Error', err);
          res.status(400);
        } else {
          adminComponent.registerStudents(teacher[0], students);
          res.status(204).end();
        }
      });
    });
};


exports.commonstudents = (req, res) => {
  teachersComponent.getTeachersByEmail(req.query.teachers)
    .then(es => {
      adminComponent.getCommonStudents(es.map(e => e.id))
        .then((d) => res.json(d));
    });

};


exports.suspendStudent = (req, res) => {
  adminComponent.suspend(req.body.student)
    .then(() => {
      res.status(204).end();
    })
    .catch((e) => console.error(suspend));
};

exports.notifications = (req, res) => {
  adminComponent.filterNotification(req.body.teacher)
    .then((a) => {
      const mentions = req.body.notification
        .match(/\B@[a-zA-Z0-9!@.]+\b/gi)
        .map((s) => s.substr(1));
      res.json({
        recipients: a.map(e => e.recipients).concat(mentions)
      });
    })
    .catch((e) => console.error(e));
};

/**
 * Created by warapitiya on 4/13/18.
 */
const async = require('async');
const httpStatus = require('http-status');
const teachersComponent = require('./../teachers/teachers.component');
const studentsComponent = require('./../students/students.component');
const adminComponent = require('./admin.component');

exports.registered = (req, res) => {
  teachersComponent.findAllRegistered()
    .then((d) => res.status(httpStatus.OK).json(d))
    .catch(error => res.status(httpStatus.BAD_REQUEST).end())
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
          res.status(httpStatus.BAD_REQUEST).end();
        } else {
          adminComponent.registerStudents(teacher[0], students);
          res.status(httpStatus.NO_CONTENT).end();
        }
      });
    });
};


exports.commonstudents = (req, res) => {
  teachersComponent.getTeachersByEmail(req.query.teachers)
    .then(es => {
      adminComponent.getCommonStudents(es.map(e => e.id))
        .then((d) => res.status(httpStatus.OK).json(d));
    });

};


exports.suspendStudent = (req, res) => {
  adminComponent.suspend(req.body.student)
    .then(() => {
      res.status(httpStatus.NO_CONTENT).end();
    })
    .catch((e) => res.status(httpStatus.BAD_REQUEST).end());
};

exports.notifications = (req, res) => {
  adminComponent.filterNotification(req.body.teacher)
    .then((a) => {
      const mentions = req.body.notification
        .match(/\B@[a-zA-Z0-9!@.]+\b/gi)
        .map((s) => s.substr(1));
      res
        .status(httpStatus.OK)
        .json({
          recipients: a.map(e => e.recipients).concat(mentions)
        });
    })
    .catch((e) => res.status(httpStatus.BAD_REQUEST).end());
};

/**
 * Created by warapitiya on 4/13/18.
 */
const async = require('async');
const httpStatus = require('http-status');
const teachersComponent = require('./../teachers/teachers.component');
const studentsComponent = require('./../students/students.component');
const adminComponent = require('./admin.component');

/**
 * Get all registered
 * @param req
 * @param res
 */
exports.registered = (req, res) => {
  teachersComponent
    .findAllRegistered()
    .then(d => res.status(httpStatus.OK).json(d))
    .catch(error =>
      res
        .status(httpStatus.BAD_REQUEST)
        .json({error: `Error while getting registered list. ${error.message}`})
    );
};

/**
 * Get registered students for teacher
 * @param req
 * @param res
 */
exports.registerStudentsForTeacher = (req, res) => {
  teachersComponent.findOrCreate(req.body.teacher).then(teacher => {
    const students = [];
    async.each(
      req.body.students,
      (student, callback) => {
        studentsComponent.findOrCreate(student).then(student => {
          students.push(student[0]);
          callback();
        });
      },
      err => {
        if (err) {
          res.status(httpStatus.BAD_REQUEST).json({
            error: `Error while getting registered students for teacher. ${
              err.message
              }`
          });
        } else {
          adminComponent.registerStudents(teacher[0], students);
          res.status(httpStatus.NO_CONTENT).end();
        }
      }
    );
  });
};

/**
 * Get common students for given teachers
 * @param req
 * @param res
 */
exports.commonstudents = (req, res) => {
  teachersComponent.getTeachersByEmail(req.query.teachers.split(',')).then(es => {
    adminComponent
      .getCommonStudents(es.map(e => e.id))
      .then(students => res.status(httpStatus.OK).json(students))
      .catch(error =>
        res.status(httpStatus.BAD_REQUEST).json({
          error: `Error while getting common students for teachers. ${
            error.message
            }`
        })
      );
  });
};

/**
 * Suspend a student
 * @param req
 * @param res
 */
exports.suspendStudent = (req, res) => {
  adminComponent
    .suspend(req.body.student)
    .then(() => {
      res.status(httpStatus.NO_CONTENT).end();
    })
    .catch(error =>
      res
        .status(httpStatus.BAD_REQUEST)
        .json({error: `Error while suspending a student. ${error.error}`})
    );
};

/**
 * Notification list
 * @param req
 * @param res
 */
exports.notifications = (req, res) => {
  adminComponent
    .filterNotification(req.body.teacher)
    .then(a => {
      const mentions = req.body.notification
        .match(/\B@[a-zA-Z0-9!@.]+\b/gi)
        .map(s => s.substr(1));
      res.status(httpStatus.OK).json({
        recipients: a.map(e => e.recipients).concat(mentions)
      });
    })
    .catch(error =>
      res
        .status(httpStatus.BAD_REQUEST)
        .json({
          error: `Error while getting list of recipients. ${error.message}`
        })
    );
};

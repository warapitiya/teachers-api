/**
 * Created by warapitiya on 4/13/18.
 */

const httpStatus = require('http-status');
const teachersComponent = require('./teachers.component');

/**
 * Get all teachers or by emails
 * @param req
 * @param res
 */
exports.getTeachers = (req, res) => {
  if (req.query.emails) {
    teachersComponent
      .getTeachersByEmail(req.query.emails.split(','))
      .then(teachers => res.status(httpStatus.OK).json(teachers))
      .catch(error =>
        res
          .status(httpStatus.BAD_REQUEST)
          .json({error: `Can't resolve teacher emails. ${error.message}`})
      );
  } else {
    teachersComponent
      .findAllTeachers()
      .then(teachers => res.status(httpStatus.OK).json(teachers))
      .catch(error =>
        res
          .status(httpStatus.BAD_REQUEST)
          .json({error: `Can't resolve teacher emails. ${error.message}`})
      );
  }
};

/**
 * Add teacher
 * @param req
 * @param res
 */
exports.addTeacher = (req, res) => {
  teachersComponent
    .createTeacher(req.body)
    .then(teacher => res.status(httpStatus.CREATED).json(teacher))
    .catch(error =>
      res
        .status(httpStatus.BAD_REQUEST)
        .json({error: `Error while creating new teacher. ${error.message}`})
    );
};

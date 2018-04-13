/**
 * Created by warapitiya on 4/13/18.
 */
const httpStatus = require('http-status');
const studentComponent = require('./students.component');

exports.getStudents = (req, res) => {
  studentComponent
    .findAll()
    .then(students => res.status(httpStatus.OK).json(students))
    .catch(error => {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({error: `Error while getting all students. ${error.message}`});
    });
};

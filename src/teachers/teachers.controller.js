const teachersComponent = require('./teachers.component');

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

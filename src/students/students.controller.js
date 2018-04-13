/**
 * Created by warapitiya on 4/13/18.
 */
const studentComponent = require('./students.component');

exports.getStudents = (req, res) => {
  studentComponent.findAll()
    .then(d => {
      res.json(d);
    })
};

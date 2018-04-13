/**
 * Created by warapitiya on 4/13/18.
 */

const express = require('express');
const router = express.Router();
const teacherController = require('./teachers.controller');

/**
 * GET teachers listing
 */
router
  .get('/', teacherController.getTeachers)
  .post('/', teacherController.addTeacher);

module.exports = router;

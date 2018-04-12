const express = require('express');
const router = express.Router();
const teacherController = require('./teachers.controller');

/**
 * GET teachers listing
 */
router
  .get('/', teacherController.getTeachers)
  .post('/', teacherController.addTeacher)
  .get('/test', teacherController.registered)
  .post('/register', teacherController.registerStudentsForTeacher);

module.exports = router;

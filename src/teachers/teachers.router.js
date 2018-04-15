/**
 * Created by warapitiya on 4/13/18.
 */

const express = require('express');
const validate = require('express-validation');
const {createTeacher} = require('./terchers.validator');
const router = express.Router();
const teacherController = require('./teachers.controller');

/**
 * GET teachers listing
 */
router
  .get('/', teacherController.getTeachers)
  .post('/', validate(createTeacher), teacherController.addTeacher);

module.exports = router;

/**
 * Created by warapitiya on 4/13/18.
 */

const express = require('express');
const router = express.Router();
const studentController = require('./students.controller');

/**
 * GET teachers listing
 */
router
  .get('/', studentController.getStudents);

module.exports = router;

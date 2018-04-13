/**
 * Created by warapitiya on 4/13/18.
 */

const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');

/**
 * GET teachers listing
 */
router
  .get('/registeredstudents', adminController.registered)
  .post('/register', adminController.registerStudentsForTeacher)
  .get('/commonstudents', adminController.commonstudents)
  .post('/suspend', adminController.suspendStudent)
  .post('/retrievefornotifications', adminController.notifications);

module.exports = router;

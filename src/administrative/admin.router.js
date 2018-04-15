/**
 * Created by warapitiya on 4/13/18.
 */

const express = require('express');
const validate = require('express-validation');
const router = express.Router();
const adminController = require('./admin.controller');
const {
  commonStudentsValidator,
  registerValidator,
  suspendValidator,
  notificationsValidator
} = require('./admin.validator');

/**
 * GET teachers listing
 */
router
  .get('/registeredstudents', adminController.registered)
  .post(
    '/register',
    validate(registerValidator),
    adminController.registerStudentsForTeacher
  )
  .get(
    '/commonstudents',
    validate(commonStudentsValidator),
    adminController.commonstudents
  )
  .post('/suspend', validate(suspendValidator), adminController.suspendStudent)
  .post(
    '/retrievefornotifications',
    validate(notificationsValidator),
    adminController.notifications
  );

module.exports = router;

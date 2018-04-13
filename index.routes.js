const express = require('express');
const teacherRoutes = require('./src/teachers/teachers.router');
const studentRoutes = require('./src/students/students.router');
const adminRoutes = require('./src/administrative/admin.router');

const router = express.Router();

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount teachers routes at /teachers
router.use('/teacher', teacherRoutes);
router.use('/admin', adminRoutes);
router.use('/student', studentRoutes);

module.exports = router;

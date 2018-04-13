const express = require('express');
const userRoutes = require('./src/teachers/teachers.router');
const adminRoutes = require('./src/administrative/admin.router');

const router = express.Router();

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /teachers
router.use('/teacher', userRoutes);
router.use('/admin', adminRoutes);

module.exports = router;

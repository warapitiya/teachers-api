const express = require('express');
const userRoutes = require('./src/users/users.router');

const router = express.Router();

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

module.exports = router;

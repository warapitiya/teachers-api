const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  res.json({name: "Ryan"});
});

module.exports = router;

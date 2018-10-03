var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  req.session.uid = '';
  res.redirect('/');
});

module.exports = router;

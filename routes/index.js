var express = require('express');
var router = express.Router();
var firebaseDb = require('../firebase/adminConnect');
var firebase = require('../firebase/connect')

router.get('/', function (req, res, next) {
  let auth = req.session.uid;

  firebaseDb.ref('/list').once('value', val => {
    res.render('index', {
      title: '六角學院留言板',
      auth: auth,
      list: val.val(),
      error: req.flash("error")
    });
  })


});

module.exports = router;

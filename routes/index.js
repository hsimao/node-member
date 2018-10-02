var express = require('express');
var router = express.Router();
var firebaseDb = require('../firebase/adminConnect');
var firebase = require('../firebase/connect')

router.get('/', function (req, res, next) {
  console.log(firebase.auth());
  firebaseDb.ref().once('value', val => {
    console.log(val.val())
  })
  res.render('index', {
    title: '六角學院留言板'
  });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var firebaseDB = require('../firebase/adminConnect');

router.get('/', function (req, res) {
  let name = ''
  let email = ''
  if (req.session.uid) {
    firebaseDB.ref('users/'+req.session.uid).once('value', val => {
      name = val.val().nickname
      email = val.val().email
      res.render('user', { title: '會員專區', email, name});
    })
  } else {
    res.render('user', { title: '會員專區', email, name});
  }

})

module.exports = router;

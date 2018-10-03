var express = require('express');
var router = express.Router();
var firebaseDB = require('../firebase/adminConnect');
var firebase = require('../firebase/connect');
var fireAuth = firebase.auth();

router.get('/', function (req, res) {
  res.render('login', { title: '登入', error: req.flash('error') });
})
router.post('/', function (req, res) {
  fireAuth.signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(user => {
      console.log(user)
      req.session.uid = user.uid;
      res.redirect('/');
    })
    .catch(error => {
      let errorMessage = '登入失敗。'
      if (error.code === 'auth/invalid-email')
        errorMessage = '信箱格式錯誤。'
      if (error.code === 'auth/wrong-password')
        errorMessage = '密碼錯誤。'
      if (error.code === 'auth/user-not-found')
        errorMessage = '查無此帳號。'
      console.log(error);
      req.flash('error', errorMessage)
      res.redirect('/login')
    })
})

module.exports = router;

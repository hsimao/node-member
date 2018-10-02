var express = require('express');
var router = express.Router();
var firebaseDB = require('../firebase/adminConnect');
var firebase = require('../firebase/connect');
var fireAuth = firebase.auth();


router.get('/', function (req, res) {
  res.render('signup', { title: '註冊', error: req.flash('error')});
})

// fb 會員資料存入database
router.post('/fb', function (req, res) {
  var userData = {
    email: req.body.email,
    nickname: req.body.nickname,
    uid: req.body.uid
  }
  firebaseDB.ref('/users/'+req.body.uid).set(userData)
  console.log('新增完成')
  res.redirect('/signup/success')
})

// 信箱驗證註冊
router.post('/', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var nickname = req.body.nickname

  fireAuth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      var userData = {
        email: email,
        nickname: nickname,
        uid: user.uid
      }
      firebaseDB.ref('/users/'+user.uid).set(userData)
      // console.log('新增完成')
      res.redirect('/signup/success')
    })
    .catch(error => {
      var errorMessage = '註冊失敗'
      if (error.code == 'auth/weak-password')
        errorMessage = '密碼至少要6個字以上';
      if (error.code == 'auth/invalid-email')
        errorMessage = '電子郵件地址格式錯誤'
      if (error.code == 'auth/email-already-in-use')
        errorMessage = '此信箱已經有人使用'
      console.log(error);
      req.flash('error', errorMessage)
      res.redirect('/signup')
    })
})

router.get('/success',function(req,res){
  res.render('success',{
    title:'註冊成功'
  });
})

module.exports = router;

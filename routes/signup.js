var express = require('express');
var router = express.Router();
var firebaseDB = require('../firebase/adminConnect');
var firebase = require('../firebase/connect');
var fireAuth = firebase.auth();


router.get('/', function (req, res) {
  res.render('signup', { title: '註冊'});

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
      console.log('新增完成')
      res.redirect('/signup/success')
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    })
})

router.get('/success',function(req,res){
  res.render('success',{
    title:'註冊成功'
  });
})

module.exports = router;

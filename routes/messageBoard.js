var express = require('express');
var router = express.Router();
var firebaseDB = require('../firebase/adminConnect');

router.post('/', function (req, res) {
  // 使用驗證插件審核留言 express-validator
  req.checkBody("content", "內容不得為空").notEmpty();
  let errors = req.validationErrors();
  if (errors) {
    req.flash("error", errors[0].msg);
    res.redirect("/");

  } else {
    firebaseDB.ref('users/'+req.session.uid).once('value', val => {
      let postConent = {
        nickname: val.val().nickname,
        content: req.body.content
      }
      firebaseDB.ref('list').push().set(postConent)
        .then(() => {
          console.log('新增成功');
          res.redirect('/');
        })
        .catch((error) => console.log('新增失敗', error))
    })
  }
})

module.exports = router;

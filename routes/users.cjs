var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/gugu', function(req, res, next) {
  res.render('sign-succ', {result: "注册成功"});
});

module.exports = router;

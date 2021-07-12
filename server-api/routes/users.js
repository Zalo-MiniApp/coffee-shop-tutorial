var express = require('express');
const request = require('request');
const User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) return console.error(err)
    res.send(users)
  });
});

router.post('/login', (req, res) => {
  const access_token = req.body.access_token
  console.log(access_token, '<======== Access token')
  const url = `https://graph.zalo.me/v2.0/me?access_token=${access_token}&fields=id,birthday,name,gender,picture`
  request(url, (err, _, body) => {
    if (err) return res.send(err)
    console.log(body)
    User.create(body, function (err, doc) {
      if (err) return console.error(err)
      res.send(doc)
    })
  });
})

module.exports = router;

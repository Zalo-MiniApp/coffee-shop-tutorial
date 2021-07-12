var express = require('express');
const request = require('request');
const db = require('../models');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  db.Users.find({}, function (err, users) {
    if (err) return console.error(err)
    res.send(users)
  });
});

router.post('/login', (req, res) => {
  const access_token = req.body.access_token
  const url = `https://graph.zalo.me/v2.0/me?access_token=${access_token}&fields=id,birthday,name,gender,picture`
  request(url, (err, _, body) => {
    if (err) return res.send(err)
    const { id, birthday, name, gender, picture } = JSON.parse(body)
    db.Users.updateOne({
      zalo_id: id
    }, {
      birthday,
      name,
      gender,
      picture: picture.data.url,
    }, {
      upsert: true
    }, function (err, doc) {
      if (err) return console.error(err)
      res.send(doc)
    })
  });
})

module.exports = router;

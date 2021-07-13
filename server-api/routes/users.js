var express = require('express');
const request = require('request');
const db = require('../models');
const ZaloService = require('./../services/zalo-service.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
	db.Users.find({}, function (err, users) {
		if (err) return console.error(err)
		res.send(users)
	});
});

router.post('/login', async (req, res) => {
	try {
		const accessToken = req.body.accessToken;
		if (!accessToken) {
			return res.send({ error: -1, message: 'Invalid access token' });
		}
		const { id, birthday, name, gender, picture } = await ZaloService.getZaloProfile(accessToken);
		let user = await db.Users.updateOne({ zaloId: id}, {
			birthday,
			name,
			gender,
			picture: picture.data.url
		}, { upsert: true});
		if (user) {
			return res.send({
				error:  0,
				message: 'Success',
				data: user
			});
		}
	} catch (ex) {
		res.send({ error: -1, message: 'Unknown exception' });
		console.log('API-Exception', ex);
	}
});

module.exports = router;

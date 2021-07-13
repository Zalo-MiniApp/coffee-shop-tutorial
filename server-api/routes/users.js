var express = require('express');
const request = require('request');
const db = require('../models');
const { generateAccessToken, authenticateToken } = require('../services/token-service');
const ZaloService = require('./../services/zalo-service.js');
var router = express.Router();

router.get('/logged-in', authenticateToken, function (req, res, next) {
	if (req.user) {
		return res.send({
			error: 0,
			message: 'Success',
			data: req.user
		});
	} else {
		res.send({ error: -1, message: 'No user found!' });
	}
});

router.post('/login', async (req, res) => {
	try {
		const accessToken = req.body.accessToken;
		if (!accessToken) {
			return res.send({ error: -1, message: 'Invalid access token' });
		}
		const { id, birthday, name, gender, picture } = await ZaloService.getZaloProfile(accessToken);
		let user = await db.Users.updateOne({ zaloId: id }, {
			birthday,
			name,
			gender,
			picture: picture.data.url
		}, { upsert: true });
		if (user) {
			const token = generateAccessToken(id)
			console.log(token)
			return res.send({
				error: 0,
				message: 'Success',
				data: user,
				token
			});
		}
	} catch (ex) {
		res.send({ error: -1, message: 'Unknown exception' });
		console.log('API-Exception', ex);
	}
});

module.exports = router;

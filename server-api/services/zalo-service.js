const request = require('request');
const config = require('../config');
const service = {};
const API_DOMAIN = 'https://graph.zalo.me';
const OPEN_API_DOMAIN = 'https://openapi.zalo.me'

service.getZaloProfile = (accessToken) => {
    return new Promise((resolve, reject) => {
        request({
            url: `${API_DOMAIN}/v2.0/me`,
            method: 'GET',
            qs: {
                access_token: accessToken,
                fields: 'id,name,birthday,email,picture'
            },
            json: true
        }, (error, response, body) => {
            if (error) return reject(error);
            return resolve(body);
        });
    });
}

service.sendMessage = (userId, text) => {
    return new Promise((resolve, reject) => {
        request({
            url: `${OPEN_API_DOMAIN}/v2.0/oa/message`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access_token': config.OA_TOKEN
            },
            body: {
                recipient: {
                    user_id: userId
                },
                message: {
                    text
                }
            },
            json: true
        }, (error, response, body) => {
            if (error) return reject(error);
            return resolve(body);
        });
    });
}

module.exports = service;
const request = require('request');
const service = {};
const API_DOMAIN = 'https://graph.zalo.me';

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
            return reject(body);
        });
    });
}
module.exports = service;
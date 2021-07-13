const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.MONGODB_URL);

//Listen status connect database
mongoose.connection.on('error', function() {
	console.log('Connect to database error!');
});
mongoose.connection.once('open', function() {
	console.log('Connect to database success!');
});

const db = {};
db.Orders = require('./order.js');
db.Products = require('./product.js');
db.Users = require('./user.js');

module.exports = db;
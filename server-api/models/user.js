var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  zalo_id: String,
  birthday: Date,
  name: String,
  gender: String,
  picture: String,
  status: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', schema);
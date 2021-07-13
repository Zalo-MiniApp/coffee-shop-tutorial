var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  zaloId: String,
  birthday: Date,
  name: String,
  gender: String,
  picture: String,
  status: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', schema);
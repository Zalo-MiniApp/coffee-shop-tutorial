var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  zaloId: String, // ID để định danh user trên hệ thống Zalo theo ứng dụng của bạn.
  followerId: String, // ID user theo Official Account, bạn có thể sử dụng ID này để gửi tin nhắn cho user.
  birthday: Date,
  name: String,
  gender: String,
  picture: String,
  status: { type: Number, default: 0 },
  isFollowing: Boolean
}, { timestamps: true });

module.exports = mongoose.model('User', schema);
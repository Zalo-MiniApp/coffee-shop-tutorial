var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  cart: Array,
  selectedDiscount: String,
  total: Number,
  shipping: Boolean,
  address: String,
  shop: Object,
  status: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Order', schema);
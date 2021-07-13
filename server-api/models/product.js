var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    sku: { type: String, unique: true, required: true, dropDups: true },
    name: String,
    category: String,
    merchant: String,
    image: String,
    status: { type: Number, default: 0 },
    url: String,
    descrition: String,
    price: { type: Number, default: 0 },
    sale: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    sizes: Array,
    toppings: Array
}, { timestamps: true });

module.exports = mongoose.model('Product', schema);
var express = require('express');
const db = require('../models');
const { authenticateToken } = require('../services/token-service');
var router = express.Router();

/* Get orders history of logged in user */
router.get('/history', authenticateToken, async function (req, res, next) {
  try {
    const userId = req.user._id
    orders = await db.Orders.find({ user: userId })
    res.send({
      error: 0,
      message: 'Success',
      data: orders,
    })
  } catch (error) {
    res.send({ error: -1, message: 'Unknown exception' });
    console.log('API-Exception', error);
  }
});

/* Place an order */
router.post('/checkout', authenticateToken, async function (req, res, next) {
  try {
    const userId = req.user._id
    const { cart = [], selectedDiscount, shipping, shop, address } = req.body
    const total = cart.reduce((total, item) => total + item.subtotal, 0)
    const doc = await db.Orders.create({
      user: userId,
      cart,
      selectedDiscount,
      total,
      shipping,
      shop,
      address
    })
    res.send({
      error: 0,
      message: 'Success',
      data: doc,
    })
  } catch (error) {
    res.send({ error: -1, message: 'Unknown exception' });
    console.log('API-Exception', error);
  }
});

module.exports = router;

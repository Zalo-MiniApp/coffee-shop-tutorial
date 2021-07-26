var express = require('express');
const db = require('../models');
const AuthService = require('../services/auth-service');
const ZaloService = require('./../services/zalo-service.js');
var router = express.Router();

router.use(AuthService.verify);

/* Get orders history of logged in user */
router.get('/history', async (req, res, next) => {
  try {
    const userId = req.user._id
    orders = await db.Orders.find({ user: userId }).sort({ createdAt: -1 })
    res.send({
      error: 0,
      message: 'Success',
      data: orders,
    });
  } catch (error) {
    res.send({ error: -1, message: 'Unknown exception' });
    console.log('API-Exception', error);
  }
});

/* Place an order */
router.post('/checkout', async (req, res, next) => {
  try {
    const userId = req.user._id
    const { cart = [], selectedDiscount, shipping, shop, address, shippingTime, note } = req.body
    const total = cart.reduce((total, item) => total + item.subtotal, 0)
    const doc = await db.Orders.create({
      user: userId,
      cart,
      selectedDiscount,
      total,
      shipping,
      shop,
      address,
      shippingTime,
      note,
    })
    const detail = cart.map(item => `${item.quantity}x ${item.product.name}`).join(', ')
    const response = await ZaloService.sendMessage(req.user.followerId, `Cảm ơn bạn đã đặt hàng tại Coffee Shop. Chi tiết đơn hàng: ${detail}. Tổng cộng: ${total} VND`)
    console.log('[OA Message]', response)
    res.send({
      error: 0,
      message: 'Đặt hàng thành công!',
      data: doc,
    })
  } catch (error) {
    res.send({ error: -1, message: 'Unknown exception' });
    console.log('API-Exception', error);
  }
});

module.exports = router;

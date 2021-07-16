var express = require('express');
const db = require('../models');
const { authenticateToken } = require('../services/token-service');
const ZaloService = require('./../services/zalo-service.js');
var router = express.Router();

/* Get orders history of logged in user */
router.get('/history', authenticateToken, async function (req, res, next) {
  try {
    const userId = req.user._id
    orders = await db.Orders.find({ user: userId }).sort({ createdAt: -1 })
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
    let message = 'Đặt hàng thành công!'
    const detail = cart.map(item => `${item.quantity}x ${item.product.name}`).join(', ')
    const response = await ZaloService.sendMessage(req.user.followerId, `Cảm ơn bạn đã đặt hàng tại Highland Coffee. Chi tiết đơn hàng: ${detail}. Tổng cộng: ${total} VND`)
    if (!response.error) {
      message += ' Vui lòng kiểm tra tin nhắn của bạn để theo dõi đơn hàng!'
    } else {
      message += ' Không thể gửi tin nhắn về cho người dùng, lý do chi tiết: ' + response.message
    }
    console.log('[OA Message]', response)
    res.send({
      error: 0,
      message,
      data: doc,
    })
  } catch (error) {
    res.send({ error: -1, message: 'Unknown exception' });
    console.log('API-Exception', error);
  }
});

module.exports = router;

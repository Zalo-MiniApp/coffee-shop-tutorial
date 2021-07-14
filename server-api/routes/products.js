var express = require('express');
const db = require('../models');
var router = express.Router();

/* Get list of products by categories */
router.get('/', async function (req, res, next) {
  try {
    result = await db.Products.find({})
    res.send({
      error: 0,
      message: 'Success',
      data: result,
    })
  } catch (error) {
    res.send({ error: -1, message: 'Unknown exception' });
    console.log('API-Exception', error);
  }
});

/* Get list of products by categories */
router.get('/by-category', async function (req, res, next) {
  try {
    result = await db.Products.aggregate([
      {
        $group: {
          _id: "$category",
          products: { $push: "$$ROOT" },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }])
    res.send({
      error: 0,
      message: 'Success',
      data: result,
    })
  } catch (error) {
    res.send({ error: -1, message: 'Unknown exception' });
    console.log('API-Exception', error);
  }
});

router.get('/dump', async function (req, res, next) {
  try {
    const count = await db.Products.count()
    const doc = await db.Products.create({
      sku: `${count + 1}`.padStart(8, 0),
      name: "Phin Sữa Đá",
      category: "Cà phê truyền thống",
      merchant: "Highland Coffee",
      image: "https://www.highlandscoffee.com.vn/vnt_upload/product/03_2018/PHIN-SUA-DA.png",
      status: 1,
      price: Math.round(Math.random() * 50 + 10) * 1000,
      sizes: [
        { name: 'S', extra: 0 },
        { name: 'M', extra: 6000 },
        { name: 'L', extra: 10000 }
      ],
      toppings: [
        { name: 'Thạch Vải', extra: 9000 },
        { name: 'Vải', extra: 9000 }
      ]
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

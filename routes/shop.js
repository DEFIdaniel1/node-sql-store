const express = require('express')
const shopController = require('../controllers/shop')
const router = express.Router()

router.get('/', shopController.getHome)
router.get('/products', shopController.getProducts)
router.get('/cart', shopController.getCart)
router.get('/checkout', shopController.getCheckout)
router.get('/orders', shopController.getOrders)

module.exports = router

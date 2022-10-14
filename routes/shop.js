const express = require('express')
const shopController = require('../controllers/shop')
const router = express.Router()

router.get('/', shopController.getHome)
router.get('/products', shopController.getProducts)
router.get('/products/:productId', shopController.getProductDetails)

router.get('/cart', shopController.getCart)
router.post('/cart', shopController.postCart)
router.post('/cart-delete-item', shopController.postCartDeleteProduct)

router.get('/checkout', shopController.getCheckout)
router.get('/orders', shopController.getOrders)

module.exports = router

const Product = require('../models/products')

// SHOP
exports.getProducts = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            pageTitle: 'Products',
            prods: products,
            path: '/products',
        })
    })
}
exports.getHome = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/home', {
            pageTitle: 'Shop Name',
            prods: products,
            path: '/',
        })
    })
}
exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
    })
}
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { path: '/checkout', pageTitle: 'Checkout' })
}
exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { path: '/orders', pageTitle: 'Orders' })
}

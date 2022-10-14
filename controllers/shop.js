const Product = require('../models/products')
const Cart = require('../models/cart')

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
exports.getProductDetails = (req, res, next) => {
    const prodId = req.params.productId
    Product.findById(prodId, (product) => {
        console.log(product)
        res.render('shop/product-details', {
            product: product,
            pageTitle: product.title,
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
    Cart.getCart((cart) => {
        Product.fetchAll((products) => {
            const cartProducts = []
            for (p of products) {
                const cartProductData = cart.products.find(
                    (prod) => prod.id === p.id
                )
                if (cartProductData) {
                    cartProducts.push({
                        productData: p,
                        qty: cartProductData.qty,
                    })
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                products: cartProducts,
            })
        })
    })
}
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId
    Product.findById(prodId, (product) => {
        console.log(product)
        Cart.addProduct(prodId, product.price)
    })
    res.redirect('/cart')
}
exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.findById(prodId, (product) => {
        Cart.removeProduct(prodId, product.price)
        res.redirect('/cart')
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { path: '/checkout', pageTitle: 'Checkout' })
}
exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { path: '/orders', pageTitle: 'Orders' })
}

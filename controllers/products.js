const Product = require('../models/products')

exports.getAddProduct = (req, res, next) => {
    // non-Express method: res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('add-product', {
        pageTitle: 'Admin Page',
        path: '/admin/add-product',
    })
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/')
}

exports.getProducts = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    const products = Product.fetchAll()
    res.render('shop', {
        pageTitle: 'Shop Page',
        prods: products,
        path: '/',
    })
    console.log(products)
}

const Product = require('../models/products')

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            pageTitle: 'Products',
            prods: products,
            path: '/admin/products',
        })
    })
}

exports.getAddProduct = (req, res, next) => {
    // non-Express method: res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('admin/add-product', {
        pageTitle: 'Admin Page',
        path: '/admin/add-product',
    })
}
exports.postAddProduct = (req, res, next) => {
    const product = new Product(
        req.body.title,
        req.body.imageUrl,
        req.body.description,
        req.body.price
    )
    product.save()
    res.redirect('/')
}

exports.getEditProducts = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Edit Products',
        path: '/admin/edit-product',
    })
}
exports.postEditProducts = (req, res, next) => {
    res.redirect('/')
}

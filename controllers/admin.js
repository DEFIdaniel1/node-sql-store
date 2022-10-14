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
    res.render('admin/edit-product', {
        pageTitle: 'Admin Page',
        path: '/admin/add-product',
        editing: false,
    })
}
exports.postAddProduct = (req, res, next) => {
    const product = new Product(
        null,
        req.body.title,
        req.body.imageUrl,
        req.body.description,
        req.body.price
    )
    product.save()
    res.redirect('/')
}

exports.getEditProducts = (req, res, next) => {
    const editMode = req.query.edit
    if (!editMode === 'true') {
        return res.redirect('/')
    }
    const prodId = req.params.productId
    Product.findById(prodId, (product) => {
        if (!product) {
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
        })
    })
}
exports.postEditProducts = (req, res, next) => {
    const prodId = req.body.productId
    const updatedProduct = new Product(
        prodId,
        req.body.title,
        req.body.imageUrl,
        req.body.description,
        req.body.price
    )
    updatedProduct.save()
    res.redirect('/admin/products')
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.deleteProduct(prodId)
    res.redirect('/admin/products')
}

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
    Product.create({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
    })
        .then((result) => {
            console.log('Created new product')
            res.redirect('/')
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.getEditProducts = (req, res, next) => {
    const editMode = req.query.edit
    if (!editMode === 'true') {
        return res.redirect('/')
    }
    const prodId = req.params.productId
    Product.findById(prodId)
        .then(([product]) => {
            if (!product[0]) {
                redirect('/')
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product[0],
            })
        })
        .catch((err) => console.log(err))
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

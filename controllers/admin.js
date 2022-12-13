const Product = require('../models/products')

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            res.render('admin/products', {
                pageTitle: 'Products',
                prods: products,
                path: '/admin/products',
            })
        })
        .catch((err) => console.log(err))
}

exports.getAddProduct = (req, res, next) => {
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
        userId: req.user.id,
    })
        .then(() => {
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
    Product.findByPk(prodId)
        .then((product) => {
            if (!product) {
                redirect('/')
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product,
            })
        })
        .catch((err) => console.log(err))
}
exports.postEditProducts = (req, res, next) => {
    const prodId = req.body.productId
    Product.findByPk(prodId)
        .then((product) => {
            //saves data locally
            product.title = req.body.title
            product.price = req.body.price
            product.description = req.body.description
            product.imageUrl = req.body.imageUrl
            //sequelize save method to save to the DB
            return product.save()
        })
        .then(res.redirect('/admin/products'))
        .catch((err) => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.destroy({ where: { id: prodId } })
        .then(res.redirect('/admin/products'))
        .catch((err) => console.log(err))
}

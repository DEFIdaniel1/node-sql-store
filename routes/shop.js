const express = require('express')
const path = require('path')

const rootDir = require('../utils/path')
const router = express.Router()

const { products } = require('./admin')

router.get('/', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    res.render('shop', {
        pageTitle: 'Shop Page',
        prods: products,
        path: '/',
    })
    console.log(products)
})

module.exports = router

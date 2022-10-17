const fs = require('fs')
const path = require('path')

const Cart = require('./cart')

const productPath = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
)

const db = require('./utils/database')
db.execute('SELECT * FROM products')
    .then((result) => {
        console.log(result)
    })
    .catch((err) => {
        console.log(err)
    })

const getProductsFromFile = (callback) => {
    fs.readFile(productPath, (err, fileContent) => {
        if (err) {
            return callback([])
        }
        callback(JSON.parse(fileContent))
    })
}
module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }
    save() {
        // pushing the whole object created by the class - product
        getProductsFromFile((products) => {
            //add new product
            if (this.id) {
                const existingProductIndex = products.findIndex(
                    (p) => p.id === this.id
                )
                const updatedProducts = [...products]
                updatedProducts[existingProductIndex] = this
                fs.writeFile(
                    productPath,
                    JSON.stringify(updatedProducts),
                    (err) => {
                        console.log(err)
                    }
                )
            } else {
                //update existing product
                this.id = Math.floor(Math.random() * Date.now()).toString()
                products.push(this)
                fs.writeFile(productPath, JSON.stringify(products), (err) => {
                    console.log(err)
                })
            }
        })
    }
    static deleteProduct(id) {
        getProductsFromFile((products) => {
            const product = products.find((prod) => prod.id === id)
            const updatedProducts = products.filter((p) => p.id !== id)
            fs.writeFile(
                productPath,
                JSON.stringify(updatedProducts),
                (err) => {
                    if (!err) {
                        Cart.removeProduct(id, product.price)
                    }
                    console.log(err)
                }
            )
        })
    }

    // need to use callback function or else it will render undefined since it is asynchronous
    static fetchAll(callback) {
        getProductsFromFile(callback)
    }

    static findById(id, callback) {
        getProductsFromFile((products) => {
            const foundProduct = products.find((p) => p.id === id)
            callback(foundProduct)
        })
    }
}

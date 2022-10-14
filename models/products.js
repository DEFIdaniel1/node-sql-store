const fs = require('fs')
const path = require('path')

const productPath = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
)

const getProductsFromFile = (callback) => {
    fs.readFile(productPath, (err, fileContent) => {
        if (err) {
            return callback([])
        }
        callback(JSON.parse(fileContent))
    })
}
module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
        this.id = Math.floor(Math.random()) * Date.now()
    }
    save() {
        // pushing the whole object created by the class - product
        getProductsFromFile((products) => {
            products.push(this)
            fs.writeFile(productPath, JSON.stringify(products), (err) => {
                console.log(err)
            })
        })
    }
    // need static to call function on the class itself
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

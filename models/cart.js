const fs = require('fs')
const path = require('path')

const cartPath = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
)

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(cartPath, (err, fileContent) => {
            // fetch the previous cart
            let cart = { products: [], totalPrice: 0 }
            if (!err) {
                cart = JSON.parse(fileContent)
            }
            // check cart for existing product
            const existingProductIndex = cart.products.findIndex(
                (p) => p.id === id
            )
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct
            // add new product or increase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct }
                updatedProduct.qty += 1
                cart.products = [...cart.products] //need this line?
                cart.products[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = { id: id, qty: 1 }
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice
            fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
                console.log(err)
            })
        })
    }
    static removeProduct(id, productPrice) {
        fs.readFile(cartPath, (err, fileContent) => {
            if (err) {
                return
            }
            const updatedCart = { ...JSON.parse(fileContent) }
            const product = updatedCart.products.find((prod) => prod.id === id)
            if (!product) {
                return
            }
            const productQty = product.qty
            updatedCart.products = updatedCart.products.filter(
                (prod) => prod.id !== id
            )
            updatedCart.totalPrice =
                updatedCart.totalPrice - productPrice * productQty

            fs.writeFile(cartPath, JSON.stringify(updatedCart), (err) => {
                console.log(err)
            })
        })
    }
    static getCart(callback) {
        fs.readFile(cartPath, (err, fileContent) => {
            const cart = JSON.parse(fileContent)
            if (err) {
                callback(null)
            } else {
                callback(cart)
            }
        })
    }
}

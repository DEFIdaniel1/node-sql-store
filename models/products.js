const products = []

module.exports = class Product {
    constructor(t) {
        this.title = t
    }

    save() {
        // pushing the whole object created by the class - product
        products.push(this)
    }

    // need static to call function on the class itself
    static fetchAll() {
        return products
    }
}

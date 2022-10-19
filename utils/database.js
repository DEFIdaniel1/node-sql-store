const mongodb = require('mongodb')
require('dotenv').config()
const MongoClient = mongodb.MongoClient

const mongoConnect = (callback) => {
    const mongodbPassword = process.env.MONGO_DB_PASSWORD
    MongoClient.connect(
        `mongodb+srv://dpisterzi:${mongodbPassword}@cluster0.wdwpbii.mongodb.net/?retryWrites=true&w=majority`
    )
        .then((client) => {
            console.log('Connected')
            callback(client)
        })
        .catch((err) => console.log(err))
}

module.exports = mongoConnect

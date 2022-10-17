const mysql = require('mysql2')
require('dotenv').config()

const MySqlPassword = process.env.MY_SQL_PASSWORD

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-Udemy',
    password: MySqlPassword,
})

module.exports = pool.promise()

require('dotenv').config()
const MySqlPassword = process.env.MY_SQL_PASSWORD

const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('node', 'root', MySqlPassword, {
    dialect: 'mysql',
    host: 'localhost',
})
module.exports = sequelize

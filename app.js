const express = require('express')

const { router: adminRoutes } = require('./routes/admin')
const shopRouter = require('./routes/shop')
const errorController = require('./controllers/error')
const sequelize = require('./utils/database')

const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

app.use('/admin', adminRoutes)
app.use(shopRouter)

app.use(errorController.get404)

sequelize
    .sync()
    .then((result) => {
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err)
    })

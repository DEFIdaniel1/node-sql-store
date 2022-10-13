const express = require('express')

const { router: adminRoutes } = require('./routes/admin')
const shopRouter = require('./routes/shop')
const errorController = require('./controllers/error')

const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

app.use('/admin', adminRoutes)
app.use(shopRouter)

app.use(errorController.get404)

app.listen(3000)

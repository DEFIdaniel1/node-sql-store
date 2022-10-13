const express = require('express')
const path = require('path')

const { router: adminRouter } = require('./routes/admin')
const shopRouter = require('./routes/shop')

const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

app.use('/admin', adminRouter)
app.use(shopRouter)

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' })
})

app.listen(3000)

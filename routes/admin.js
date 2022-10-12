const express = require('express')
const router = express.Router()

router.use('/add-product', (req, res, next) => {
    res.send('<h1>Add product page for admin</h1>')
})

module.exports = router

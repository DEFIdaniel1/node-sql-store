const path = require('path')

//helper function to get rootDirectory path
//provides cleaner path & code for routes
module.exports = path.dirname(require.main.filename)

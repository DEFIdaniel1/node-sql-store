/*
Core Modules
- http: launch a server/send requests
- https: launch an SSL server (encrypted)
- fs: 
- path
- os
*/

const http = require('http')

const server = http.createServer((req, res) => {
    //request and response to output different results
    console.log(req)
})

server.listen(3000)

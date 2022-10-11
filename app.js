/*
Core Modules
- http: launch a server/send requests
- https: launch an SSL server (encrypted)
- fs: 
- path
- os
*/

const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Home Page</title></head>')
        res.write(
            '<body><form action="/page2" method="POST"><input type="text" name="message"/><button>Change Page</button></form></body>'
        )
        res.write('</html>')
        return res.end()
    }
    if (url === '/page2' && method === 'POST') {
        fs.writeFileSync('message.txt', 'DUMMY TEXT')
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>Routed Page 2</title></head>')
    res.write('<body><h1>Hello World. This is the 2nd page.</h1></body>')
    res.write('</html>')
    res.end()
})

server.listen(3000)

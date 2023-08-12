let http = require('http')

http.createServer((request, response) => {
    if(request.url === '/favicon.ico') {
        // 打印request.url时，也会打印“/favicon.ico” 这个是浏览器标签页上的图标，属于浏览器自动打印内容
        response.writeHead(200)
        response.end()
        return
    }
    console.log(request.url)
    response.writeHead(200)
    response.end('hello')
}).listen(8008)
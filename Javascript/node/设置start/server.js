const http = require('http');
http.createServer((req,res) => {
  res.end('666');
}).listen(8080, () => {
  console.log('808080。。。。。。');
  
})
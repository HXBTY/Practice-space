const http = require("http");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 3000;

http
  .createServer((require, response) => {
    response.writeHead(200, { "content-type": "text/html" });
    response.end(
      fs.readFileSync(__dirname + "./download.html", "utf-8")
    );
  })
  .listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

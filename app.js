//Problem: We need a simple way to look at a user's badge count and JavaScript point from a web browser
//Solution: Use Node.js to perform the profile look ups and server our template via HTTP

// Required modules
var router = require("./router");

//Create a web server
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  router.ev(req, res);
  router.kullanıcı(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Sunucu http://${hostname}:${port}/ adresinde tam takır.`);
});
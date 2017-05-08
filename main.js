var http = require("http");
var sqlite3 = require('sqlite3').verbose();
var users = new sqlite3.Database('users.db');

users.run("CREATE TABLE IF NOT EXISTS 'users'( 'id' INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, 'username' TEXT UNIQUE, 'password' TEXT)");
users.close();

var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Access-Control-Allow-Origin": "*"});
  response.write("hello world");
  response.end();
});

server.listen(80);
console.log("hello world");
var http = require("http");
var sqlite3 = require('sqlite3').verbose();
var users = new sqlite3.Database('users.db');
var colors = require('colors');
var config = require('./config.js');

config.configload();
console.log(config.configexamplex1);
console.log(config.configexamplex2);

users.run("CREATE TABLE IF NOT EXISTS 'users'( 'id' INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, 'username' TEXT UNIQUE, 'password' TEXT)");
users.close();

var server = http.createServer(function(request, response) {
	response.writeHead(200, {"Access-Control-Allow-Origin": "*"});
	if (request.url == '/register') {
		var result = registerPlayer(request);
		response.write(result);
	}
	response.end();
});

server.listen(80);

function registerPlayer(request) {
	if (request.method == 'POST') {
		var body = '';
		request.on('data', function (data) {
			body += data;
		if (body.length > 1e6)
			request.connection.destroy();
		});
		var post = qs.parse(body);
		

	}
	
	console.log("call register");
	return "working";
}
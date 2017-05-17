var http = require("http");
var colors = require('colors');
var config = require('./config.js');

var server = http.createServer(function(request, response) {
	response.writeHead(200, {"Access-Control-Allow-Origin": "*"});
	if (request.url == '/register') {
		var registerPlayer = require("./register.js");
		var responserc = registerPlayer(request, response);
		response = responserc;
	} else if (request.url == '/login') {
		var loginPlayer = require("./login.js");
		var responserc = loginPlayer(request, response);
		response = responserc;
	} else {
		response.write("404");
		response.end();
	}
});
server.listen(parseInt(config.port()));
console.log("HELegacy ".red + "HTTP server is listening in port " + config.port());
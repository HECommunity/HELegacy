var http = require("http");
var colors = require('colors');
var registerPlayer = require("./register.js");

var server = http.createServer(function(request, response) {
	response.writeHead(200, {"Access-Control-Allow-Origin": "*"});
	if (request.url == '/register') {
		var result = registerPlayer(request);
		response.write(result);
	}
	response.end();
});
server.listen(80);
console.log("HELegacy ".red + "HTTP server is listening in port 80!");
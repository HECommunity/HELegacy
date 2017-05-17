module.exports = function (request, response) {
	var start = clock();
	var body = '';
	if (request.method == 'POST') {
		request.on('data', function (data) {
			body = '';
			body += data;
		if (body.length > 1e6)
			response.connection.destroy();
		});
		request.on('end', function (data) {
			var qs = require('querystring');
			var post = qs.parse(body);
			if (post.username != null && post.password != null){
				var sql = require('./sql.js');
				sql.login(post.username, post.password, function(result, token){
					var duration = clock(start);
					response.write(""+result+"|"+token+"|"+duration);
					response.end();
					console.log("Login request: "+duration+"ms");
				});
			} else {
				var duration = clock(start);
				response.end("false|"+duration);
				console.log("Login request: "+duration+"ms");
			}
		});
	}
	return response;
	function clock(start) {
		if ( !start ) return process.hrtime();
		var end = process.hrtime(start);
		return Math.round((end[0]*1000) + (end[1]/1000000));
	}
}
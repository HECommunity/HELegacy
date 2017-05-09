var qs = require('querystring');
module.exports = function (request, response) {
	var body = '';
	if (request.method == 'POST') {
		request.on('data', function (data) {
			body = '';
			body += data;
		if (body.length > 1e6)
			response.connection.destroy();
		});
		request.on('end', function (data) {
			var post = qs.parse(body);
			if (post.username != null){
				response.write("username: " + post.username);
			}
			response.end();
		});
	}
	return response;
}
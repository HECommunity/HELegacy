module.exports = function (request) {
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
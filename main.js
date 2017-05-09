var config = require('./js/config.js');
var sql = require('./js/sql.js');

config.main(function(cb) {
	require('./js/webserver.js');
});

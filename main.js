var config = require('./js/config.js');

config.main(function(cb) {
	require('./js/webserver.js');
});

/* process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
}); */
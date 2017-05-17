var sqlite3 = require('sqlite3').verbose();
var users = new sqlite3.Database('users.db');

try {
	users.run("CREATE TABLE IF NOT EXISTS 'users'( 'id' INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, 'username' TEXT UNIQUE, 'password' TEXT, 'token' TEXT)");
} catch(err) {
	console.log(err);
}

module.exports.userexists = function (username, cb) {
	users.get("SELECT username FROM users WHERE username ='"+username+"'", function(err, row) {
		try {
			var check = row.username;
			cb(true);
		} catch (err) {
			cb(false);
		}
	});
}

module.exports.register = function (username, password, cb) {
	exports.userexists(username, function(exists) {
		if(!exists) {
			var bcrypt = require('bcrypt');
			var hash = bcrypt.hashSync(password, 8);
			var sha256 = require('./sha256.js');
			var token = sha256((Math.random()*1e32).toString(36));
			var query = users.prepare("INSERT INTO 'users' VALUES (NULL, ?, ?, ?)");
			query.run([username, hash, token], function(error){
				if(!error) {
					cb(true, token);
				} else {
					cb(false);
				}
			});
		} else {
			cb(false);
		}
	});
}

module.exports.login = function (username, password, cb) {
	exports.userexists(username, function(exists) {
		if(exists) {
			users.get("SELECT username, password FROM users WHERE username ='"+username+"'", function(err, row) {
				var hash = row.password;
				var bcrypt = require('bcrypt');
				var passwordtest = bcrypt.compareSync(password, hash);
				if(passwordtest){
					var sha256 = require('./sha256.js');
					var token = sha256((Math.random()*1e32).toString(36));
					var query = users.prepare("UPDATE 'users' SET token = ? WHERE username = ?");
					query.run([token, username], function(error){
						if(error) {
							console.log("Token DB update error:" + error);
						}
						cb(true, token);
					});
				} else {
					cb(false);
				}
				
			});
		} else {
			cb(false);
		}
	});
}

process.on('SIGINT', () => {
	users.close();
	process.exit();
});
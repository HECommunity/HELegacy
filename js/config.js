var fs = require("fs");
var colors = require('colors');

module.exports.main = function (cb) {
	const config = {};
	try {
		const config = require('../config.json');
		console.log("HEConfig ".red + "Config loaded!");
		cb(null);
	} catch (err){
		if (fs.existsSync('./config.json')) {
			console.log("HEConfig ".red + "Config error!");
			var _prompt = require('prompt');
			_prompt.start();
			_prompt.message = '';
			_prompt.delimiter = '';
			_prompt.colors = false;
			_prompt.get({
				properties: {
				confirm: {
					pattern: /^(yes|no|y|n)$/gi,
					description: "HEConfig ".red + 'We can create a new config file? All config will be gone forever! Type yes or no:',
					message: 'Type yes or no',
					required: true,
					default: ''
				}
			}
			}, function (err, result){
				var c = result.confirm.toLowerCase();
				if (c!='y' && c!='yes'){
					console.log("HEConfig ".red + 'Try fix your config.json file before starting again. Exiting node.js');
					process.exit(1);
				}
				config.configexample1 = "example1";
				config.configexample2 = "example2";
				fs.writeFileSync ("./config.json", JSON.stringify(config, null, "\t"));
				setTimeout(function() {
					console.log("HEConfig ".red + 'Done! File created!');
					cb(null);
				}, 5);
			});
		} else {
			console.log("HEConfig ".red + "Creating config file!");
			config.configexample1 = "example1";
			config.configexample2 = "example2";
			fs.writeFileSync ("./config.json", JSON.stringify(config, null, "\t"));
			setTimeout(function() {
				console.log("HEConfig ".red + 'Done! File created!');
				cb(null);
			}, 5);
		}
	}
};

module.exports.configexample1 = function () {
	try {
		var config = require('../config.json');
		return config.configexample1;
	} catch(err) {
	}
}
var fs = require("fs");
const config = {};
module.exports.configload = function () {
	try {
		const config = require('./config.json');
		module.exports.configexamplex1 = config.configexample1;
		module.exports.configexamplex2 = config.configexample2;
		console.log("HELegacy ".red + "Config load successfully!");
	} catch (err){
		if (fs.existsSync('./config.json')) {
			console.log("HELegacy ".red + "Config loading error!");
			var _prompt = require('prompt');
			_prompt.start();
			_prompt.message = '';
			_prompt.delimiter = '';
			_prompt.colors = false;
			_prompt.get({
				properties: {
				confirm: {
					pattern: /^(yes|no|y|n)$/gi,
					description: "HELegacy ".red + 'We can create a new config file for you? All config will be gone forever! Type yes or no:',
					message: 'Type yes/no',
					required: true,
					default: ''
				}
			}
			}, function (err, result){
				var c = result.confirm.toLowerCase();
				if (c!='y' && c!='yes'){
					console.log("HELegacy ".red + 'Try fix your config.json file before starting again. Exiting node.js');
					process.exit(1);
					return;
				}
				module.exports.configexamplex1 = config.configexample1;
				module.exports.configexamplex2 = config.configexample2;
				fs.writeFileSync ("./config.json", JSON.stringify(config, null, "\t"));
				console.log("HELegacy ".red + 'Done! File created!');
			});
		} else {
			console.log("HELegacy ".red + "Creating config file!");
			module.exports.configexamplex1 = config.configexample1;
			module.exports.configexamplex2 = config.configexample2;
			fs.writeFileSync ("./config.json", JSON.stringify(config, null, "\t"));
			console.log("HELegacy ".red + 'Done! File created!');
		}

	}
};

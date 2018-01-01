(function () {
	"use strict";

	const fs = require("fs");

	function readFile(pathToFile, encoding = "utf8", callback) {
		console.log("READI?GN");
		fs.readFile(pathToFile, encoding, (err, data) => console.log(err + ' ' + data) /*callback(err, data)*/ );
	}

	function writeFile(pathToFile, data, callback) {
		fs.writeFile(pathToFile, data, (err) => callback(err, true));
	}

	/**
	 * Initializes the test domain with several test commands.
	 * @param {DomainManager} domainManager The DomainManager for the server
	 */
	function init(domainManager) {

		if (!domainManager.hasDomain("filesystem")) {
			domainManager.registerDomain("filesystem", {
				major: 0,
				minor: 1
			});
		}

		domainManager.registerCommand(
			"filesystem", // domain name
			"readFile", // command name
			readFile, // command handler function
			true, // this command is synchronous in Node
			"Returns the total or free memory on the user's system in bytes", [{
				name: "total", // parameters
				type: "string",
				description: "True to return total memory, false to return free memory"
		}], [{
				name: "memory", // return values
				type: "number",
				description: "amount of memory in bytes"
		}]
		);

		domainManager.registerCommand(
			"filesystem", // domain name
			"writeFile", // command name
			writeFile, // command handler function
			true, // this command is synchronous in Node
			"Returns the total or free memory on the user's system in bytes", [{
				name: "total", // parameters
				type: "string",
				description: "True to return total memory, false to return free memory"
		}], [{
				name: "memory", // return values
				type: "number",
				description: "amount of memory in bytes"
		}]
		);
	}
	exports.init = init;
})();

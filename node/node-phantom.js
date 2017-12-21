(function () {
	'use strict';
	const phantom = require('phantom');
	const os = require('os');

	//	function phantomWebPageA() {
	//		const instance = await phantom.create();
	//		const page = await instance.createPage();
	//
	//		const status = await page.open('https://stackoverflow.com/');
	//		const content = await page.property('content');
	//		await instance.exit();
	//		return content;
	//	}

	function phantomWebPage() {
		let instance = phantom.create();
		let page = instance
			.then(instance => instance.createPage())

		let content = page
			.then(page => page.open('https://stackoverflow.com/'))
			.then(status => {
				console.log(`STATUS: ${status}`);
				return page.then(page => page.property('content'))
			})
			.catch(error => console.log(`ERROR2 ${error}`));

		content
			.then(() => {
				console.log("KONIEC FUNKCIE");
			return instance.then(instance => instance.exit());
		})
			.catch(error => console.log(`ERROR3 ${error}`));
		return content;
	}

	function cmdGetMemory(total) {
		if (total) {
			return os.totalmem();
		} else {
			return os.freemem();
		}
	}


	/**
	 * Initializes the test domain with several test commands.
	 * @param {DomainManager} domainManager The DomainManager for the server
	 */
	function init(domainManager) {
		//	if (!domainManager.hasDomain("phantom")) {
		domainManager.registerDomain("phantom", {
			major: 0,
			minor: 1
		});
		//	}
		domainManager.registerCommand(
			"phantom", // domain name
			"phantomWebPage", // command name
			phantomWebPage, // command handler function
			false, // this command is synchronous in Node
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
			"phantom", // domain name
			"getMemory", // command name
			cmdGetMemory, // command handler function
			false, // this command is synchronous in Node
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

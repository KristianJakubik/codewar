(function () {
	'use strict';

	const phantom = require('phantom');
	const os = require('os');
	let error_message = "";

	function phantomWebPage(pageToOpen, customHeaders, callback) {

		let instance = phantom.create();
		instance.customHeaders = customHeaders;
		
		let page = instance
			.then(instance => instance.createPage());

		let content = page
			.then(page => page.open(pageToOpen))
			.then(status => page.then(page => page.property('content')))
			.catch(error => callback(error));

		content
			.then(() => instance.then(instance => instance.exit()))
			.catch(error => callback(error));
///TODO: Better optimalization
		content
			.then(text => callback(null, text))
			.catch(error => callback(error));
	}

	/**
	 * Initializes the test domain with several test commands.
	 * @param {DomainManager} domainManager The DomainManager for the server
	 */
	function init(domainManager) {
		if (!domainManager.hasDomain("phantom")) {
			domainManager.registerDomain("phantom", {
				major: 0,
				minor: 1
			});
		}
		domainManager.registerCommand(
			"phantom", // domain name
			"phantomWebPage", // command name
			phantomWebPage, // command handler function
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

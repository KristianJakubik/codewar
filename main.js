/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

/** Simple extension that adds a "File > Hello World" menu 
item. Inserts "Hello, world!" at cursor pos. */

define(function (require, exports, module) {
	"use strict";

	const NodeDomain = brackets.getModule("utils/NodeDomain");
	const ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
	const phantom = new NodeDomain("phantom", ExtensionUtils.getModulePath(module, "node/node-phantom"));



	//	console.log(phantom);

	const testKata = 'consecutive-strings';
	const url = `https://www.codewars.com/kata/${testKata}/train/javascript`;
	const apiAccessToken = "nzEBMyszeCXhpzGdT_cS";

	let CommandManager = brackets.getModule("command/CommandManager");
	let EditorManager = brackets.getModule("editor/EditorManager");
	let Menus = brackets.getModule("command/Menus");

	function parseHTML(html) {
		console.log(html);
	}

	function main() {
		let CustomHeaders = {
			"Authorize": apiAccessToken
		};
		phantom.exec("phantomWebPage", url, CustomHeaders)
			.done(text => parseHTML(text))
			.fail(error => console.log(`ERORROR: ${error}`));
	}

	// First, register a command - a UI-less object associating an id to a handler
	var MY_COMMAND_ID = "codewar"; // package-style naming to avoid collisions
	CommandManager.register("Codewar", MY_COMMAND_ID, main);

	// Then create a menu item bound to the command
	// The label of the menu item is the name we gave the command (see above)
	var menu = Menus.addMenu("Codewar", MY_COMMAND_ID);
	//menu.addMenuItem(MY_COMMAND_ID);

	let contextMenu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);
	contextMenu.addMenuItem(MY_COMMAND_ID);
});

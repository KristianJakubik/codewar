/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */


define(function (require, exports, module) {
	"use strict";

	const NodeDomain = brackets.getModule("utils/NodeDomain");
	const ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
	const FileUtils = brackets.getModule("file/FileUtils");
	const FileSystem = brackets.getModule("filesystem/FileSystem");

	const phantom = new NodeDomain("phantom", ExtensionUtils.getModulePath(module, "src/node/node-phantom"));
	const filesystem = new NodeDomain("filesystem", ExtensionUtils.getModulePath(module, "src/node/node-filesystem"));
	const pathToCodewar = ExtensionUtils.getModulePath
	const apiTokenFilePath = ExtensionUtils.getModulePath(module, "token.txt");
	const ApiTokenManager = require('src/apitoken');
	console.log(ApiTokenManager);
	const apiTokenManager = new ApiTokenManager.ApiTokenManager(apiTokenFilePath);


	//	console.log(phantom);

	const testKata = 'consecutive-strings';
	const url = `https://www.codewars.com/kata/${testKata}/train/javascript`;
	

	let CommandManager = brackets.getModule("command/CommandManager");
	let EditorManager = brackets.getModule("editor/EditorManager");
	let Menus = brackets.getModule("command/Menus");

	function parseHTML(html) {
		//console.log(html); 
	}

	function main() {
		readApiToken()
			.done(token => {
				let CustomHeaders = {
					"Authorize": token
				};
				phantom.exec("phantomWebPage", url, CustomHeaders)
					.done(text => parseHTML(text));
			})
			.fail(error => console.error(`ERORROR: ${error}`))
			.finally(() => FileSystem.close());
	}

	let MY_COMMAND_ID = "codewar";
	let MY_APITOKEN_HANDLER = "codewar.apitoken";

	CommandManager.register("Codewar", MY_COMMAND_ID, main);
	CommandManager.register("Authentification Token", MY_APITOKEN_HANDLER, apiTokenManager.apiTokenDialog);

	// Then create a menu item bound to the command
	// The label of the menu item is the name we gave the command (see above)
	let menu = Menus.addMenu("Codewar", MY_COMMAND_ID);

	let contextMenu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);
	contextMenu.addMenuItem(MY_COMMAND_ID);

	menu.addMenuItem(MY_APITOKEN_HANDLER);

});

/*global brackets,$*/

define(function main(require,
	exports) {
	'use strict';

	const ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
	const FileUtils = brackets.getModule("file/FileUtils");
	const FileSystem = brackets.getModule("filesystem/FileSystem");


	class ApiTokenManager {

		constructor(apiTokenFilePath) {
			this.apiTokenFilePath = apiTokenFilePath;
		}

		readApiToken() {
			let file = FileSystem.getFileForPath(apiTokenFilePath);
			return FileUtils.readAsText(file);
		}

		writeApiToken(token) {
			let file = FileSystem.getFileForPath(apiTokenFilePath);
			FileUtils.writeText(file, token)
				.fail(error => console.error(error));
		}

		apiTokenDialog() {
			var dialogs = brackets.getModule('widgets/Dialogs');

			var APITOKEN_DIALOG_ID = 'codewar.apitoken.dialog';
			dialogs.showModalDialog(
					APITOKEN_DIALOG_ID,
					"apitoken dialog",
					apiTokenDialogHtml, [
						{
							className: dialogs.DIALOG_BTN_CLASS_PRIMARY,
							id: dialogs.DIALOG_BTN_OK,
							text: "SAVE"
                        }, {
							className: dialogs.DIALOG_BTN_CLASS_NORMAL,
							id: dialogs.DIALOG_BTN_CANCEL,
							text: "CANCEL"
                        }
                    ]
				)
				.done(id => {
						if (id === dialogs.DIALOG_BTN_CANCEL){
							return;
						}
						if (id === dialogs.DIALOG_BTN_OK){
							console.log($('#apiTokenInput')); 
						}
					}

				)

		}
	}

	exports.ApiTokenManager = ApiTokenManager;

	function bla() {
		return "AAAAA";
	}
	let apiTokenDialogHtml =
		`
	<span>Enter Api Token of your user account from codewar</span>
	<input id=apiTokenInput type="text" onload="bla"/>
	`;
});

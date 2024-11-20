// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as os from 'os';

let diagnosticCollection: vscode.DiagnosticCollection;
export let outputChannel = vscode.window.createOutputChannel('luaformatter');


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	outputChannel.show();
	outputChannel.clear();
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "luaformatter" is now active2222!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	//const disposable = vscode.commands.registerCommand('luaformatter.helloWorld', () => {
	// The code you place here will be executed every time your command is executed
	// Display a message box to the user
	//	vscode.window.showInformationMessage('Hello World from luaformatter222!');
	//});
	diagnosticCollection =
		vscode.languages.createDiagnosticCollection('luaformatter');
	context.subscriptions.push(
		vscode.languages.registerDocumentFormattingEditProvider(
			'lua', new LuaFormatProviderDocument(context)));
	context.subscriptions.push(
		vscode.languages.registerDocumentRangeFormattingEditProvider(
			'lua', new LuaFormatProviderDocument(context)));

	outputChannel.appendLine(
		'lua fromatter start');
	//context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }


class LuaFormatProviderDocument implements vscode.DocumentFormattingEditProvider, vscode.DocumentRangeFormattingEditProvider {
	private context: vscode.ExtensionContext;


	constructor(context: vscode.ExtensionContext) {
		this.context = context;
	}


	private getExecutablePath() {
		let execPath = vscode.workspace.getConfiguration('luaformatter')
			.get<string>('path');
		if (!execPath) {
			return '';
		}

		return execPath;
	}


	private stringToHex(str: string) {
		let hexString = "";
		let codeBuffer = Buffer.from(str);
		let n = codeBuffer.length
		for (let i = 0; i < n; i++) {
			let z = codeBuffer[i];
			hexString += z.toString(16).toUpperCase().padStart(2, "0");
			break;
		}
		for (let i = 1; i < n; i++) {
			if (i % 16 == 0) {
				hexString += "\n";
			}
			else {
				hexString += " ";
			}
			let z = codeBuffer[i];
			hexString += z.toString(16).toUpperCase().padStart(2, "0");

		}
		return hexString;
	}
	private doFormatDocument(
		document: vscode.TextDocument, range: vscode.Range,
		options: vscode.FormattingOptions,
		token: vscode.CancellationToken, isrange: number): Thenable<vscode.TextEdit[]> {

		return new Promise((resolve, reject) => {
			//let filename = document.fileName;
			//console.log(filename);
			let formatCommandBinCfgPath = this.getExecutablePath();
			if (formatCommandBinCfgPath.length == 0) {
				return reject('ltokenp is not available');
			}
			let lasts = formatCommandBinCfgPath.substring(formatCommandBinCfgPath.length - 1, 1)
			if (lasts == "/" || lasts == "\\") {
				formatCommandBinCfgPath = formatCommandBinCfgPath.substring(0, formatCommandBinCfgPath.length - 1)
			}
			//outputChannel.appendLine('format lua code:' + filename);
			// outputChannel.appendLine('format lua path:' + formatCommandBinCfgPath);


			let data = document.getText();
			if (isrange) {
				data = data.substring(document.offsetAt(range.start), document.offsetAt(range.end));
			}
			let workingPath = formatCommandBinCfgPath;
			// outputChannel.appendLine('----1----:');
			// let ff = this.stringToHex(data);
			// outputChannel.appendLine(ff);
			// outputChannel.appendLine('----2----');


			// outputChannel.appendLine('----3----:');
			// outputChannel.appendLine(workingPath);
			// outputChannel.appendLine('----4----:');

			let formatCommandBinPath = workingPath + '/ltokenp.exe';
			let platform: string = os.platform();
			switch (platform) {
				case "win32":
					formatCommandBinPath = workingPath + '/ltokenp.exe';
					break;
				case "linux":
					formatCommandBinPath = workingPath + '/ltokenp';
					break;
				default:
					vscode.window.showInformationMessage('The \'' + formatCommandBinPath + '\' ltokenp is not available.  Please check your ltokenp user setting and ensure it is installed.');
					return reject('ltokenp is not available');
			}
			let formatArgs = ['-s', 'fmtlcode.lua', '-'];

			if (1) {
				const result: Buffer[] = [], errorMsg: Buffer[] = [];
				let child = cp.spawn(formatCommandBinPath, formatArgs, { cwd: workingPath });
				child.stdin.end(data);
				child.stdout.on('data', data => {
					result.push(Buffer.from(data));

				});
				child.stderr.on('data', data => {
					errorMsg.push(Buffer.from(data));
					outputChannel.appendLine('formatter error:' + Buffer.concat(errorMsg).toString());
				});
				child.on('error', err => {
					if (err && (<any>err).code === 'ENOENT') {
						vscode.window.showInformationMessage('The \'' + formatCommandBinPath + '\' ltokenp is not available.  Please check your ltokenp user setting and ensure it is installed.');
					}
					return reject(err);
				});
				child.on('exit', code => {
					const resultStr = Buffer.concat(result).toString();
					if (code) {
						reject(new Error(`Run ltokenp failed with exit code: ${code}`));
						return;
					}

					// outputChannel.appendLine('----5----:');
					// let ff = this.stringToHex(resultStr);
					// outputChannel.appendLine(ff);
					// outputChannel.appendLine('----6----');
					if (resultStr.length > 0) {
						if (isrange) {
							resolve([new vscode.TextEdit(range, resultStr)]);
						}
						else {
							const range1 = document.validateRange(new vscode.Range(0, 0, Infinity, Infinity));
							resolve([new vscode.TextEdit(range1, resultStr)]);

						}
					}
				});

			}

		});
	}


	public provideDocumentFormattingEdits(
		document: vscode.TextDocument, options: vscode.FormattingOptions,
		token: vscode.CancellationToken): Thenable<vscode.TextEdit[]> {
		return this.doFormatDocument(
			document, new vscode.Range(0, 0, Infinity, Infinity), options, token, 0);
	}

	public provideDocumentRangeFormattingEdits(
		document: vscode.TextDocument, range: vscode.Range,
		options: vscode.FormattingOptions,
		token: vscode.CancellationToken): Thenable<vscode.TextEdit[]> {
		return this.doFormatDocument(document, range, options, token, 1);
	}
}



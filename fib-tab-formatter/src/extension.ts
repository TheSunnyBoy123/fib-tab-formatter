import * as vscode from 'vscode';


function fibonacci(n: number): number {
    const fib = [0, 1];
    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib[n];
}

export function activate(context: vscode.ExtensionContext) {
	// support c
    const disposable = vscode.languages.registerDocumentFormattingEditProvider('c', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            const edits: vscode.TextEdit[] = [];
            for (let i = 0; i < document.lineCount; i++) {
                const line = document.lineAt(i);
                const indentation = ' '.repeat(fibonacci(i)); // Indent using the Fibonacci sequence
                const newText = `${indentation}${line.text.trim()}`;
                edits.push(vscode.TextEdit.replace(line.range, newText));
            }
            return edits;
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}

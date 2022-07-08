export function activate() {
	registerCommands();
}
export function deactivate() {}

function registerCommands() {
	// add semicolon to lines' end and move position
	nova.commands.register(
		"colonoscopia.addSemi",
		(editorOrWorkspace: Workspace | TextEditor) => {
			const textEditor = TextEditor.isTextEditor(editorOrWorkspace)
				? editorOrWorkspace
				: (editorOrWorkspace as Workspace).activeTextEditor;

			textEditor.edit((edit) => {
				for (const lineEnd of getEndOfLines(
					textEditor,
					textEditor.selectedRanges
				)) {
					edit.insert(lineEnd, ";");
				}
			});
		}
	);

	// add semicolon to lines' end and keep position
	nova.commands.register(
		"colonoscopia.addSemiKeepPos",
		(editorOrWorkspace: Workspace | TextEditor) => {
			const textEditor = TextEditor.isTextEditor(editorOrWorkspace)
				? editorOrWorkspace
				: (editorOrWorkspace as Workspace).activeTextEditor;

			textEditor.edit((edit) => {
				for (const lineEnd of getEndOfLines(
					textEditor,
					textEditor.selectedRanges
				)) {
					edit.replace(new Range(lineEnd, lineEnd), ";");
				}
			});
		}
	);

	// add semicolon to lines' end and continue at the next lines
	nova.commands.register(
		"colonoscopia.addSemiNewLine",
		(editorOrWorkspace: Workspace | TextEditor) => {
			const textEditor = TextEditor.isTextEditor(editorOrWorkspace)
				? editorOrWorkspace
				: (editorOrWorkspace as Workspace).activeTextEditor;

			textEditor.edit((edit) => {
				for (const lineEnd of getEndOfLines(
					textEditor,
					textEditor.selectedRanges
				)) {
					edit.insert(lineEnd, ";\n");
				}
			});
		}
	);
}

function getEndOfLines(
	textEditor: TextEditor,
	selectedRanges: Range[]
): number[] {
	return selectedRanges.map((range) => {
		let lineRange = textEditor.getLineRangeForRange(range);
		if (textEditor.document.getTextInRange(lineRange).endsWith("\n")) {
			lineRange = new Range(lineRange.start, lineRange.end - 1);
		}
		return lineRange.end;
	});
}

import Textbox from "../../Textbox";

function playDialog(text, ctx) {
    const wordWrap = /(.{1,18})( +|$\n?)|(.{1,18})/gm
    const lines = text.replace(wordWrap, '$1$3\n').trim().split('\n');
    let resolved;


    const textBox = new Textbox(8, 108, 144, 128);

    let lineIndex = 1;
    let firstLine = lines[0];
    if (lines.length > 1) {
        firstLine += '\n' + lines[1];
        lineIndex++;
    }

    let displayTextPromise = textBox.printString(ctx, firstLine);

    const advance = function () {
        if (resolved) return true;
        if (displayTextPromise.isResolved) {
            // there are more lines
            if (lines.length > lineIndex) {
                textBox.clear(ctx);
                textBox.printString(ctx, lines[lineIndex - 1], 0);
                textBox.newLine();
                displayTextPromise = textBox.printString(ctx, lines[lineIndex]);
                lineIndex++;
            } else {
                textBox.clear(ctx);
                resolved = true;
                return true;
            }
        } else {
            textBox.advance();
        }
    }

    return advance;
}

export default playDialog;
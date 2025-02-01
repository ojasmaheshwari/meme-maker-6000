import g from "./Globals";

export function copyMemeToClipboard() {
	g.canvas.getElement().toBlob(async function (blob) {
		try {
			await navigator.clipboard.write([
				new ClipboardItem({
					[blob.type]: blob
				}),
			]);
			console.log("Meme copied");
		} catch (err) {
			console.error("Could not copy meme to clipboard", err);
		}
	});
}

import g from "./Globals";
import {emojiOverlay} from "./DOMElements";

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

export function closeEmojiOverlay() {
	emojiOverlay.classList.remove("flex");
	emojiOverlay.classList.add("hidden");
	g.emojiOverlayOpen = false;
}

export function openEmojiOverlay() {
	emojiOverlay.classList.remove("hidden");
	emojiOverlay.classList.add("flex");
	g.emojiOverlayOpen = true;
}

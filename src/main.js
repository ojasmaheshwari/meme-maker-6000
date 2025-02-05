import Fuse from "fuse.js";
import {Canvas} from "fabric";
import {memeSearchBar, memeSearchSubmit, memeContainer, memeCanvasElem, addLabelButton, downloadButton, colorPickerElem, boxColorPickerElem, addRectangleButton, copyMemeButton, fontSizeSliderElem, memeUploadOverlayDiv, memeUploadButton, memeUploadOverlayCloseButton, uploadDragSectionDiv, memeImageUpload, editLabelButton, insertEmojiButton, closeEmojiOverlayButton, searchEmojiElem, emojiSpace, emojiOverlay} from "./DOMElements";
import g, {textSettings} from "./Globals";
import {loadMemes} from "./MemesDatasetLoader";
import MemeQueryManager from "./MemeQueryManager";
import {addLabelWithControls, addRectangleWithControls, renderImageOnCanvas} from "./MemesRenderer";
import {closeEmojiOverlay, copyMemeToClipboard, openEmojiOverlay} from "./Miscellaneous";
import ManageUploads from "./UploadManager";
import {loadEmojis} from "./EmojiDatasetLoader";

async function main() {
	g.canvas = new Canvas(memeCanvasElem, {
		width: memeContainer.offsetWidth,
		height: memeContainer.offsetHeight,
		selectable: false,
		editable: false,
	});
	g.memesDataset = await loadMemes();
	g.searchMemeFuse = new Fuse(g.memesDataset, g.searchMemeFuseOptions);
	g.emojisDataset = await loadEmojis();
	g.searchEmojiFuse = new Fuse(g.emojisDataset, g.searchEmojiFuseOptions)

	memeSearchSubmit.addEventListener("click", (e) => {
		e.preventDefault();
		MemeQueryManager(memeSearchBar.value)
	});

	addLabelButton.addEventListener("click", () => {
		addLabelWithControls();
	});

	addRectangleButton.addEventListener("click", () => {
		addRectangleWithControls();
	})

	downloadButton.addEventListener("click", () => {
		const imageSrc = g.canvas.toDataURL();
		const a = document.createElement('a');
		a.href = imageSrc;
		a.download = 'meme.png';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	});

	copyMemeButton.addEventListener("click", () => {
		copyMemeToClipboard();
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === "Escape") {
			g.canvas.discardActiveObject();
			g.canvas.requestRenderAll();
		} else if (e.key === "Delete") {
			g.canvas.remove(g.canvas.getActiveObject());
		}
	});

	colorPickerElem.addEventListener("input", () => {
		textSettings.fontColor = colorPickerElem.value;
	});

	boxColorPickerElem.addEventListener("input", () => {
		textSettings.boxBackground = boxColorPickerElem.value;
	});

	fontSizeSliderElem.addEventListener("input", () => {
		textSettings.fontSize = fontSizeSliderElem.value;
	});

	memeUploadButton.addEventListener("click", () => {
		memeUploadOverlayDiv.classList.add('flex');
		memeUploadOverlayDiv.classList.remove('hidden');
		g.uploadFormOpen = true;
	});

	memeUploadOverlayCloseButton.addEventListener("click", () => {
		memeUploadOverlayDiv.classList.remove('flex');
		memeUploadOverlayDiv.classList.add('hidden');
		g.uploadFormOpen = false;
	});

	editLabelButton.addEventListener("click", () => {
		g.canvas.getActiveObject().enterEditing();
	});

	insertEmojiButton.addEventListener("click", () => {
		openEmojiOverlay();
	});

	closeEmojiOverlayButton.addEventListener("click", () => {
		closeEmojiOverlay();
	});

	searchEmojiElem.addEventListener("input", () => {
		const results = g.searchEmojiFuse.search(searchEmojiElem.value);
		const endIndex = results.length <= 40 ? results.length : 40;

		emojiSpace.innerHTML = "";
		for (let i = 0; i < endIndex; i++) {
			const image = document.createElement("img");
			image.src = results[i].item.link;
			image.style.width = "25px";
			image.style.height = "25px";
			image.classList.add("cursor-pointer");
			image.classList.add("m-1");
			image.dataset.link = image.src;
			emojiSpace.appendChild(image);
		}
	});

	emojiSpace.addEventListener("click", (e) => {
		const emoji = e.target;
		const link = emoji.dataset.link;

		if (link) {
			renderImageOnCanvas(link);
		}
	})

	ManageUploads();
}

main();

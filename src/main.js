import Fuse from "fuse.js";
import {Canvas} from "fabric";
import {memeSearchBar, memeSearchSubmit, memeContainer, memeCanvasElem, addLabelButton, downloadButton, colorPickerElem, boxColorPickerElem, addRectangleButton, copyMemeButton, fontSizeSliderElem, memeUploadOverlayDiv, memeUploadButton, memeUploadOverlayCloseButton, uploadDragSectionDiv, memeImageUpload, editLabelButton} from "./DOMElements";
import g, {textSettings} from "./Globals";
import {loadMemes} from "./MemesDatasetLoader";
import MemeQueryManager from "./MemeQueryManager";
import {addLabelWithControls, addRectangleWithControls} from "./MemesRenderer";
import {copyMemeToClipboard} from "./Miscellaneous";
import ManageUploads from "./UploadManager";

async function main() {
	g.canvas = new Canvas(memeCanvasElem, {
		width: memeContainer.offsetWidth,
		height: memeContainer.offsetHeight,
		selectable: false,
		editable: false,
	});
	g.memesDataset = await loadMemes();
	g.searchMemeFuse = new Fuse(g.memesDataset, g.searchMemeFuseOptions);

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

	ManageUploads();
}

main();

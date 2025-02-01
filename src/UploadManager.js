import {uploadDragSectionDiv, memeImageUpload, memeUploadOverlayDiv} from "./DOMElements";
import g from "./Globals";
import {renderImageOnCanvas} from "./MemesRenderer";

function loadFileIntoCanvas() {
	console.log("Ready to load file into canvas");
	const file = memeImageUpload.files[0];
	if (!file) {
		console.error("Could not detect file");
		return;
	}

	const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/avif", "image/webp"];
	if (!allowedTypes.includes(file.type)) {
		console.error("Invalid file type", file.type);
		return;
	}

	const reader = new FileReader();
	reader.readAsDataURL(file);

	reader.onloadend = function (e) {
		const data = e.target.result;
		const image = new Image();
		image.src = data;
		image.onload = function () {
			renderImageOnCanvas("doesnt matter", image);
			memeUploadOverlayDiv.classList.remove("flex");
			memeUploadOverlayDiv.classList.add("hidden");
			g.uploadFormOpen = false;
		}
	};
}

function ManageUploads() {
	uploadDragSectionDiv.addEventListener("dragenter", (e) => {
		e.preventDefault();
		e.stopPropagation();
	});
	uploadDragSectionDiv.addEventListener("dragleave", (e) => {
		uploadDragSectionDiv.classList.remove('bg-blue-400');
		uploadDragSectionDiv.classList.add('bg-slate-600');
		e.preventDefault();
		e.stopPropagation();
	});
	uploadDragSectionDiv.addEventListener("dragover", (e) => {
		uploadDragSectionDiv.classList.remove('bg-slate-600');
		uploadDragSectionDiv.classList.add('bg-blue-400');
		e.preventDefault();
		e.stopPropagation();
	});
	uploadDragSectionDiv.addEventListener("drop", (e) => {
		e.preventDefault();
		const files = e.dataTransfer.files;
		if (files.length === 0) {
			console.error("No file found while drag and dropping");
			return;
		}

		memeImageUpload.files = files;

		loadFileIntoCanvas();
	});

	memeImageUpload.addEventListener("input", (e) => {
		loadFileIntoCanvas();
	});

	uploadDragSectionDiv.addEventListener("paste", (e) => {
		const files = e.clipboardData.files;
		memeImageUpload.files = files;
		loadFileIntoCanvas();
	});
}

export default ManageUploads;

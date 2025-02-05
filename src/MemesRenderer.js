import {Control, FabricImage, FabricObject, FabricText, Rect, Textbox, util} from "fabric";
import g, {textSettings} from "./Globals";

const deleteIcon =
	"data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

export function renderImageOnCanvas(url = undefined, imageElem = undefined) {
	if (!imageElem) {
		// TODO: This is a little slow because the memegen server scales the image to our custom provided width and height and that requires time
		// Probably get the image as it is and scaling it on the browser is better
		url = url + `?width=${g.canvas.width}&height=${g.canvas.height}`;
		const loadingText = new FabricText("Loading...", {
			fontSize: 24,
			fontFamily: "sans-serif",
			fill: "black",
			hasControls: false,
			selectable: false,
		});
		g.canvas.add(loadingText);
		g.canvas.centerObject(loadingText);
		FabricImage.fromURL(url, {
			left: 0,
			top: 0,
			height: g.canvas.width,
			width: g.canvas.height,
			hasControls: false,
			selectable: false,
			crossOrigin: "anonymous",
		})
			.then((image) => {
				g.canvas.remove(loadingText);
				createWithDeleteControl(image);
			})
			.catch(error => {
				console.error("Cannot generate FabricImage from URl", error);
			})
	} else {
		const loadingText = new FabricText("Loading...", {
			fontSize: 24,
			fontFamily: "sans-serif",
			fill: "black",
			hasControls: false,
			selectable: false,
		});
		g.canvas.add(loadingText);
		g.canvas.centerObject(loadingText);
		const image = new FabricImage(imageElem, {
			left: 0,
			top: 0,
			crossOrigin: "anonymous",
		});
		g.canvas.remove(loadingText);
		createWithDeleteControl(image);
	}
}

export function addLabelWithControls() {
	var deleteImg = document.createElement('img');
	deleteImg.src = deleteIcon;
	const textbox = new Textbox("edit me", {
		fill: textSettings.fontColor,
		fontFamily: textSettings.fontFamily,
		editable: true,
		fontSize: textSettings.fontSize,
	});

	function deleteObject(_eventData, transform) {
		const _canvas = transform.target.canvas;
		_canvas.remove(transform.target);
		_canvas.requestRenderAll();
	}

	function renderIcon(ctx, left, top, _styleOverride, fabricObject) {
		const size = this.cornerSize;
		ctx.save();
		ctx.translate(left, top);
		ctx.rotate(util.degreesToRadians(fabricObject.angle));
		ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
		ctx.restore();
	}

	textbox.controls.deleteControl = new Control({
		x: 0.5,
		y: -0.5,
		offsetY: 16,
		cursorStyle: 'pointer',
		mouseUpHandler: deleteObject,
		render: renderIcon,
		cornerSize: 16,
	});

	g.canvas.add(textbox);
}

export function addRectangleWithControls() {
	var deleteImg = document.createElement('img');
	deleteImg.src = deleteIcon;
	const rect = new Rect({
		width: 200,
		height: 100,
		fill: textSettings.boxBackground,
	});

	function deleteObject(_eventData, transform) {
		const _canvas = transform.target.canvas;
		_canvas.remove(transform.target);
		_canvas.requestRenderAll();
	}

	function renderIcon(ctx, left, top, _styleOverride, fabricObject) {
		const size = this.cornerSize;
		ctx.save();
		ctx.translate(left, top);
		ctx.rotate(util.degreesToRadians(fabricObject.angle));
		ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
		ctx.restore();
	}

	rect.controls.deleteControl = new Control({
		x: 0.5,
		y: -0.5,
		offsetY: 16,
		cursorStyle: 'pointer',
		mouseUpHandler: deleteObject,
		render: renderIcon,
		cornerSize: 16,
	});

	g.canvas.add(rect);
}

export function createWithDeleteControl(elem) {
	var deleteImg = document.createElement('img');
	deleteImg.src = deleteIcon;

	function deleteObject(_eventData, transform) {
		const _canvas = transform.target.canvas;
		_canvas.remove(transform.target);
		_canvas.requestRenderAll();
	}

	function renderIcon(ctx, left, top, _styleOverride, fabricObject) {
		const size = this.cornerSize;
		ctx.save();
		ctx.translate(left, top);
		ctx.rotate(util.degreesToRadians(fabricObject.angle));
		ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
		ctx.restore();
	}

	elem.controls.deleteControl = new Control({
		x: 0.5,
		y: -0.5,
		offsetY: 16,
		cursorStyle: 'pointer',
		mouseUpHandler: deleteObject,
		render: renderIcon,
		cornerSize: 16,
	});

	g.canvas.add(elem);
}

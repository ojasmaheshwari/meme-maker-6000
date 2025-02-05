
const g = {
	canvas: undefined,
	searchMemeFuse: undefined,
	searchEmojiFuse: undefined,
	memesDataset: undefined,
	emojisDataset: undefined,
	searchMemeFuseOptions: {
		keys: [
			"name",
			"keywords"
		]
	},
	searchEmojiFuseOptions: {
		keys: [
			"id",
		]
	},
	uploadFormOpen: false,
	emojiOverlayOpen: false,
};

export const textSettings = {
	fontSize: 16,
	fontFamily: "sans-serif",
	fontColor: "white",
	boxBackground: "white",
}

export default g;

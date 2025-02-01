import g from "./Globals";
import {renderImageOnCanvas} from "./MemesRenderer";

function MemeQueryManager(memeQuery) {
	const results = g.searchMemeFuse.search(memeQuery);

	if (results.length === 0) {
		console.error("No memes found");
		return;
	}

	const meme = results[0].item;
	renderImageOnCanvas(meme.blank);
}

export default MemeQueryManager;

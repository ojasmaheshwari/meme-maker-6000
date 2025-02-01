export async function loadMemes() {
	const data = await fetch("meme_templates.json");
	const jsonData = data.json();

	return jsonData;
}

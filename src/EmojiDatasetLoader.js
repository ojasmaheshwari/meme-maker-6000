export async function loadEmojis() {
	const data = await fetch("emojis_repo.json");
	const jsonData = await data.json();


	const newData = Object.keys(jsonData).map(function (key) {
		return {id: key, link: jsonData[key]};
	});

	return newData;
}

async function main() {
	const me = localStorage.getItem("uuid");
	const url = new URL(window.location.href);
	const char_id = url.searchParams.get("character");
    const character = JSON.parse((await request("get", "/store/Character/"+char_id)).responseText);
	console.log(character);
    const c = await EditCharacter(character);
    $("main").first().append(c);
}
main();

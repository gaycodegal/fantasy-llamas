async function main() {
	const me = localStorage.getItem("uuid");
    resp = await request("get", "/store/User/" + me);
	const user = JSON.parse(resp.responseText);
    console.log(user);
    const c = await CharacterList(user);
    $("main").first().append(c);
}
main();

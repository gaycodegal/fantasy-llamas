async function main() {
	const me = localStorage.getItem("uuid");
	const url = new URL(url_string);
	const char_id = url.searchParams.get("character");
	
    resp = await request("get", "/store/User/"+me); // drop table Character
	const user = JSON.parse(resp.responseText);
    console.log(user);
    const c = await CharacterList(user);
    $("body").append(c);
}
main();

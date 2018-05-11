async function CharacterList(user) {
	function CharacterName(character){
		const button = $("<button>Delete</button>");
		button.click(async ()=>{
			if(confirm("Delete " + character.name + "?")){
				await request("delete", "/store/Character/" + character._id);
				user.characters.splice(user.characters.indexOf(character._id), 1);
				const uid = user._id;
				delete user._id;
				user = JSON.parse((await request("put", "/store/User/" + uid, user)).responseText);
				
				window.location.reload();
			}
		});
		return make(`<li><a href="/edit-character?character=${character._id}">${character.name}</a> ${ph()}</li>`, button);
	}
    user = await user;
	const characters = await N(user.characters.map(async(id)=>{
		const resp = await request("get", "/store/Character/" + id);
		const retrieved = JSON.parse(resp.responseText);
		return retrieved;
	}));
	console.log(characters);
	const newlink = $("<a href='/edit-character'>New Character</a>");
	newlink.click(async (e)=>{
		e.preventDefault();
		let c = Object.assign({}, Character.blank);
		c = (await request("post", "/store/Character", c)).responseText;
		user.characters.push(c);
		const uid = user._id;
		delete user._id;
		user = JSON.parse((await request("put", "/store/User/" + uid, user)).responseText);
		console.log(c);
		window.location.href = "/edit-character?character=" + c;
		return true;
	});
    let content = await make(`<div><ul>
${ phn(characters.length)}
<li>${ph()}</li>
<ul></div>`, ...characters.map((t) => CharacterName(t)), newlink);
    return content;
}

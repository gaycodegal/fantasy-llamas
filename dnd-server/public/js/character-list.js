async function CharacterList(user) {
	async function CharacterName(character){
		const button = $("<button class='mdc-button'>Delete</button>");
		button.click(async (e)=>{
			e.preventDefault();
			if(confirm("Delete " + character.name + "?")){
				await request("delete", "/store/Character/" + character._id);
				user.characters.splice(user.characters.indexOf(character._id), 1);
				const uid = user._id;
				delete user._id;
				user = JSON.parse((await request("put", "/store/User/" + uid, user)).responseText);
				
				window.location.reload();
			}
		});
		const li = await make(`<li class="mdc-list-item">${character.name}&nbsp;&nbsp; ${ph()}</li>`, button);
		console.log(li);
		li.click(x=>{window.location.href="/edit-character?character=" + character._id});
		return li;
	}
    user = await user;
	const characters = await N(user.characters.map(async(id)=>{
		const resp = await request("get", "/store/Character/" + id);
		const retrieved = JSON.parse(resp.responseText);
		return retrieved;
	}));
	console.log(characters);
	const newli = $("<li class='mdc-list-item'>New Character</li>");
	newli.click(async (e)=>{
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
    let content = await make(`<div class="character-list"><ul class="mdc-list">
${ phn(characters.length)}
${ph()}
<ul></div>`, ...await N(characters.map((t) => CharacterName(t))), newli);
    return content;
}

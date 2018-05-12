async function EditString(character, i, prop, putter, callback) {
    let data = character[prop][i];
	let content = await make(`<div class="string-item string-item-edit"> ${ph()} </div>`,
							 new EditorFor(data, "string", putter([prop, i], callback))
							);
	const button = $("<button class='mdc-button'>Delete</button>");
	button.click(async (x)=>{
		if(confirm("Really delete " + character[prop][i] + "?")){
			character[prop].splice(i, 1);
			putter(0, reload)();
		}
	});
	content.append(button);
	
	return content;
}

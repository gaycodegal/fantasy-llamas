async function EditItem(character, i, putter, callback) {
    let data = character.inventory[i];
	let content = await make(`<div class="item item-edit">
    <span> name: ${ ph() } </span> 
    <span> type: ${ ph() } </span> 
    </div>`,
							 new EditorFor(data.name, "string", putter(["inventory", i, "name"], callback)),
							 new EditorFor(data.type, "string", putter(["inventory", i, "type"], callback))
							);
	const button = $("<button>Delete</button>");
	button.click(async (x)=>{
		if(confirm("Really delete " + fetch(character, ["inventory", i, "name"]) + "?")){
			character.inventory.splice(i, 1);
			//console.log(character.inventory);
			putter(0, reload)();
		}
	});
	content.append(button);
	return content;
}

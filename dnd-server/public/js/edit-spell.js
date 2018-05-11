async function EditSpell(character, i, putter, callback) {
	let data = character.spells[i];
    console.log(data);
	let content = await make(`<div class="spell spell-edit">
            <span> name: ${ ph() } </span> 
            <span> level: ${ ph() } </span> 
            <span> school: ${ ph() } </span> 
            <span> time: ${ ph() } </span> 
            <span> range: ${ ph() } </span>
            <span> components: ${ ph() } </span>
            <span> duration: ${ ph() } </span>
            </div>`,
							 new EditorFor(data.name, "string", putter(["spells", i, "name"], callback, data)),
							 new EditorFor(data.level, "number", putter(["spells", i, "level"], callback, data)),
							 new EditorFor(data.school, "string", putter(["spells", i, "school"], callback, data)),
							 new EditorFor(data.time, "string", putter(["spells", i, "time"], callback, data)),
							 new EditorFor(data.range, "string", putter(["spells", i, "range"], callback, data)),
							 new EditorFor(data.components, "string", putter(["spells", i, "components"], callback, data)),
							 new EditorFor(data.duration, "string", putter(["spells", i, "duration"], callback, data))
							);
	const button = $("<button>Delete</button>");
	button.click(async (x)=>{
		if(confirm("Really delete " + fetch(character, ["spells", i, "name"]) + "?")){
			character.spells.splice(i, 1);
			putter(0, reload)();
		}
	});
	content.append(button);
	return content;
}

async function EditStat(character, i, putter, callback) {
    let data = character.stats[i];
    console.log(data);
	const editor = new EditorFor(data.value, "number", putter(["stats", i, "value"], callback));
	const edcontent = await editor.content();
	console.log(1);
    let content = await make(`<li class="mdc-list-item">
    <span> ${ data.name }:</span>&nbsp;
    ${ ph() }
    ${ph()}
    </li>`,
        //new EditorFor(data.name, "string", putter("name", callback, data)),
        ...$(edcontent).children()
    );

    return content;
}

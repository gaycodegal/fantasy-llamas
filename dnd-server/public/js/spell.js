async function Spell(data) {
    data = await data;
    //console.log(data);
    let content = await make(`<div class="spell">
            <span> name: ${ data.name } </span> 
            <span> level: ${ data.level } </span> 
            <span> school: ${ data.school } </span> 
            <span> time: ${ data.time } </span> 
            <span> range: ${ data.range } </span>
            <span> components: ${ data.components } </span>
            <span> duration: ${ data.duration } </span>
            </div>`);
    return content;
}

Spell.blank = { "name": "edit me", "level": 0, "school": "edit me", "time": "edit me", "range": "edit me", "components": "edit me", "duration": "edit me" };

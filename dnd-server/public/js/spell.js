async function Spell(data) {
    data = await data;
    //console.log(data);
    let content = await make(`<div>
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

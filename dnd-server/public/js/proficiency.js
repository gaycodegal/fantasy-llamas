async function Proficiency(data) {
    data = await data;
    console.log(data);
    let content = await make(`<div>
    <span> name: ${ data.name } </span> 
    <span> value: ${ data.value } </span> 
    </div>`);
    return content;
}

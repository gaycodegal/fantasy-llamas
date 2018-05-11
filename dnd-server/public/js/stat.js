async function Stat(data) {
    data = await data;
    console.log(data);
    let content = await make(`<div class="stat">
    <span> name: ${ data.name } </span> 
    <span> value: ${ data.value } </span> 
    </div>`);
    return content;
}

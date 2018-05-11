async function Item(data) {
    data = await data;
    let content = await make(`<div>
            <span> name: ${ data.name } </span> 
            <span> type: ${ data.type } </span> 
            </div>`);
    return content;
}

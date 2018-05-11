async function Item(data) {
    data = await data;
    let content = await make(`<div class="item">
            <span> name: ${ data.name } </span> 
            <span> type: ${ data.type } </span> 
            </div>`);
    return content;
}

Item.blank = {type:"edit me", name:"edit me"};

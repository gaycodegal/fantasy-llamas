function ph() {
    return "<div class='placeholder'></div>";
}

function phn(n) {
    return (new Array(n)).fill(ph()).join("");
}

async function N(lst){
	for(let i = 0; i < lst.length; ++i){
		lst[i] = await lst[i];
	}
    return lst;
}

/**
 * @param <string> format html minus classes
 * @param <class*> classes what need to insert
 */
function make(format, classes) {
    const args = arguments;
    const content = $(format);
    const phs = content.find(".placeholder");
    let todo = phs.length;
    const p = new Promise((resolve, reject) => {
        if (todo == 0)
            resolve(content);
        phs.each(async(i, x) => {

            $(x).replaceWith(await args[i + 1]);
            --todo;
            if (todo == 0) {
                resolve(content);
            }
        });
    });
    return p;
}

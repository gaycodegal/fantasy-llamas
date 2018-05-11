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
			const elem = await args[i + 1]
			if(elem.content){
				$(x).replaceWith(await elem.content());
			}else{
				$(x).replaceWith(elem);
			}
            --todo;
            if (todo == 0) {
                resolve(content);
            }
        });
    });
    return p;
}

function reload(){
	window.location.reload();
}

function uploader(object, store){
	return function(prop, callback){
		return async function(val){
			object[prop] = val;
			const id = object._id;
			delete object._id;
			const retval = (await request("put", `/store/${store}/${id}`, object));
			object._id = id;
			if(retval.status != 200)
				return false;
			object = JSON.parse(retval.responseText);
			if(callback)
				callback();
			return true;
		}
	}
}

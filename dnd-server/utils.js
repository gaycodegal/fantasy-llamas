
function on_die(fn, callback){
    return async function(r) {
	try{
	    return await fn.apply(this, arguments);
	}catch(e){
	    return await callback(e);
	}
    }
}

module.exports = {on_die};

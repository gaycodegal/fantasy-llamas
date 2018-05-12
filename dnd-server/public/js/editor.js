function easyedit(data, name, type, putter, callback){
	return new EditorFor(data[name], type, putter(name, callback));
}

class EditorFor{
	constructor(data, type, callback){
		this.type = type;
		this.data = data;
		this.editing = false;
		this.callback = callback;
		this.editMe = this.editMe.bind(this);
	}

	makeEditor(){
		if(typeof this.type !== "string"){
			return;
		}
		const old = this.main;
		this.main = $(`<input type="${this.type}" value="${this.data}"></input>`);
		old.replaceWith(this.main);		
	}

	makeDisplay(){
		const old = this.main;
		this.main = $(`<span>${this.data}</span>`);
		old.replaceWith(this.main);
	}

	async editMe(){
		this.editing = !this.editing;
		if(this.editing){
			this.makeEditor();
			this.button.text("Done");
		}else{
			const old = this.data;
			this.data = this.main.val();
			if(this.type == "number"){
				this.data = parseFloat(this.data);
			}
			if(this.callback){
				if(!await this.callback(this.data)){
					this.data = old;
					alert("Invalid Edit");
				}
			}
			this.makeDisplay();
			this.button.text("Edit");
		}
	}
	
	content(){
		this.button = $("<button class='mdc-button'>Edit</button>");
		this.button.click(this.editMe);
		this.container = $("<span></span>");
		this.main = $(`<span>${this.data}</span>`);
		this.container.append(this.main, " ", this.button);
		return this.container
	}

}

function fetch(object, prop){
	if(Array.isArray(prop)){
		let tmp = object
		for(let i = 0; i < prop.length; ++i){
			tmp = tmp[prop[i]];
		}
		return tmp;
	}else{
		return object[prop];
	}
}

function uploader(object, store){
	return function(prop, callback){
		return async function(val){
			if(arguments.length != 0){
				if(Array.isArray(prop)){
					let tmp = object
					for(let i = 0; i < prop.length - 1; ++i){
						tmp = tmp[prop[i]];
					}
					tmp[prop[prop.length - 1]] = val;
				}else{
					object[prop] = val;
				}
			}
			const id = object._id;
			delete object._id;
			const retval = (await request("put", `/store/${store}/${id}`, object));
			object._id = id;
			if(retval.status != 200)
				return false;
			Object.assign(object, JSON.parse(retval.responseText));
			if(callback)
				callback();
			return true;
		}
	}
}

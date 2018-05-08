function log(){
	var buff = new Array(arguments.length);
	for(var i = 0; i < arguments.length; ++i){
		if(typeof arguments[i] == "string"){
			buff[i] = arguments[i];
		}else{
			buff[i] = JSON.stringify(arguments[i]);
		}
	}
	var p = document.createElement("p");
	p.textContent = buff.join(" ");
	document.body.appendChild(p);
}

async function main(){
	resp = await request("delete", "/store/Spell"); // drop table Spell
	log(resp.responseText);
	
	resp = await request("get", "/store/Spell");
	log(resp.responseText);
	const spell = {"name":"test",
				   "level":2,
				   "school":"Test",
				   "time":"3s",
				   "range":"50 ft",
				   "components":"V",
				   "duration":"3s"
				  };
	log("sending: ", spell);
	resp = await request("post", "/store/Spell", spell);
	log(resp.responseText);
	resp = await request("get", "/store/Spell/" + resp.responseText);
	log(resp.responseText);
}

main();

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
	log("drop table Spell");
	resp = await request("delete", "/store/Spell"); // drop table Spell
	log(resp.responseText);
	log("get all");
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
	const spell2 = {"name":"ASODIFNASDOIFN",
				   "level":2,
				   "school":"ASDOFINASODIFNASDOFIN",
				   "time":"3s",
				   "range":"50 ft",
				   "components":"V",
				   "duration":"3s"
				  };
	log("sending: ", spell);
	resp = await request("post", "/store/Spell", spell);
	const spellid = resp.responseText;
	log(spellid);
	resp = await request("get", "/store/Spell/" + spellid);
	log(resp.responseText);
	log("sending: ", spell2);
	resp = await request("post", "/store/Spell", spell2);
	log(resp.responseText);
	log("getting all");
	resp = await request("get", "/store/Spell");
	log(resp.responseText);
	log("delete one (", spellid, ")");
	resp = await request("delete", "/store/Spell/" + spellid);
	log(resp.responseText);
	log("try to get deleted");
	resp = await request("get", "/store/Spell/" + spellid);
	log(resp.responseText);
	log("list all");
	resp = await request("get", "/store/Spell");
	log(resp.responseText);
	
	
}

main();

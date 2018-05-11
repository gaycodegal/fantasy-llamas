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
		this.button = $("<button>Edit</button>");
		this.button.click(this.editMe);
		this.container = $("<div></div>");
		this.main = $(`<span>${this.data}</span>`);
		this.container.append(this.main, " ", this.button);
		return this.container
	}

}
async function EditCharacter(data) {
    data = await data;
	const putter = uploader(data, "Character");
    let content = await make(`<div>
    <div>
        <span> Name: ${ ph() } </span> 
        <span> Class: ${ph()} </span>
        <span> Level: ${ph()} </span> 
        <span> Race: ${ph()} </span>
        <span> Alignment: ${ph()} </span>
        <span> Experience Points: ${ph() } </span>
    </div>
    <br/>
    
    <div> Inspiration: ${ph() } </div>
    <div> Stats: ${ 
        phn(data.stats.length)
         } </div>
    <div> Skill Proficiency: ${ phn(data.skillproficiency.length) } </div>
    <br/>

    <div> Armor Class: ${Math.sin(data.inspiration) * 100 * data.level | 0} </div>
    <div> Initiative: ${Math.cos(data.inspiration) * 100 * data.level | 0} </div>
    <div> Speed:${ph()} </div>
    
    <br/>


    <div> Current Hit Points: ${ph()} </div>
    


    <div> Inventory: ${ phn(data.inventory.length)} </div> 
    <br/>
    <div> Spells: ${ phn(data.spells.length)
         } </div> 
    <br/>
    <div> Backstory: ${ data.backstory } </div>
    

    <div> Other Proficiency: ${ data.otherproficiency } </div>
    

    
    
    <div> Features and Traits: ${ data.featuresandtraits } </div>
    <div> Money: ${ data.money } </div>
    
    
    </div>`,
							 easyedit(data, "name", "text", putter),
							 easyedit(data, "class", "text", putter),
							 easyedit(data, "level", "number", putter, reload),
							 easyedit(data, "race", "text", putter),
							 easyedit(data, "alignment", "text", putter),
							 easyedit(data, "experiencepoints", "number", putter),
							 easyedit(data, "inspiration", "number", putter, reload),
							 
							 ...data.stats.map((stat, i) => Stat(stat)), ...data.skillproficiency.map((prof, i) => Proficiency(prof)),
							 easyedit(data, "speed", "number", putter),
							 easyedit(data, "hp", "number", putter),
							 ...data.inventory.map((item, i) => Item(item)), ...data.spells.map((spell, i) => Spell(spell)));
    return content;
}

Character.blank = {
    "inventory": [],
    "spells": [],
    "level": 0,
    "name": "Unnamed Bloke",
    "backstory": "You have yet to tell this story.",
    "background": "Mysterious",
    "class": "Pick A Class",
    "race": "This Sentence is a Race Condition",
    "stats": [],
    "skillproficiency": [],
    "otherproficiency": [],
    "proficiencybonus": 0,
    "inspiration": 0,
    "speed": 0,
    "alignment": "Unaligned",
    "experiencepoints": 0,
    "featuresandtraits": [],
    "money": 0,
    "hp": 1
};

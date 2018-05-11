async function EditCharacter(data) {
    data = await data;
    const putter = uploader(data, "Character");
    const newitem = $("<button>New Item</button>");
    const newspell = $("<button>New Spell</button>")
    const newoprof = $("<button>New Proficiency</button>");
    const newtrait = $("<button>New Trait</button>");
    newitem.click(async(x) => {
        data.inventory.push(null);
        putter(["inventory", data.inventory.length - 1], reload)(Item.blank);
    });
    newspell.click(async(x) => {
        data.spells.push(null);
        putter(["spells", data.spells.length - 1], reload)(Spell.blank);
    });
    newoprof.click(async(x) => {
        data.otherproficiency.push("");
        putter(["otherproficiency", data.otherproficiency.length - 1], reload)("edit me");
    });
    newtrait.click(async(x) => {
        data.featuresandtraits.push("");
        putter(["featuresandtraits", data.featuresandtraits.length - 1], reload)("edit me");
    });

    let content = await make(`<div>
    <div>
        <div> Name: ${ ph() } </div> 
        <div> Class: ${ph()} </div>
        <div> Level: ${ph()} </div> 
        <div> Race: ${ph()} </div>
        <div> Alignment: ${ph()} </div>
        <div> Experience Points: ${ph() } </div>
    </div>
    <br/>
    
    <div> Inspiration: ${ph() } </div>
    <div> Stats: ${ 
        phn(data.stats.length)
         } </div>
	<br/>
	
	<div> Athletics: ${Math.floor((data.stats[0].value-10)/2)}</div>
	<br/>
	<div> Acrobatics: ${Math.floor((data.stats[1].value-10)/2)}</div>
	<div> Slight of Hand: ${Math.floor((data.stats[1].value-10)/2)}</div>
	<div> Stealth: ${Math.floor((data.stats[1].value-10)/2)}</div>
	<br/>
	<div> Arcana: ${Math.floor((data.stats[3].value-10)/2)}</div>
	<div> History: ${Math.floor((data.stats[3].value-10)/2)}</div>
	<div> Investigation: ${Math.floor((data.stats[3].value-10)/2)}</div>
	<div> Nature: ${Math.floor((data.stats[3].value-10)/2)}</div>
	<div> Religion: ${Math.floor((data.stats[3].value-10)/2)}</div>
	<br/>
	<div> Animal Handling: ${Math.floor((data.stats[4].value-10)/2)}</div>
	<div> Insight: ${Math.floor((data.stats[4].value-10)/2)}</div>
	<div> Medicine: ${Math.floor((data.stats[4].value-10)/2)}</div>
	<div> Perception: ${Math.floor((data.stats[4].value-10)/2)}</div>
	<div> Survival: ${Math.floor((data.stats[4].value-10)/2)}</div>
	<br/>
	<div> Deception: ${Math.floor((data.stats[5].value-10)/2)}</div>
	<div> Intimidation: ${Math.floor((data.stats[5].value-10)/2)}</div>
	<div> Performance: ${Math.floor((data.stats[5].value-10)/2)}</div>
	<div> Persuasion: ${Math.floor((data.stats[5].value-10)/2)}</div>
	<br/>

    <div> Armor Class: ${Math.sin(data.inspiration) * 100 * data.level | 0} </div>
    <div> Initiative: ${Math.floor((data.stats[1].value-10)/2)} </div>
    <div> Speed:${ph()} </div>
    
    <br/>


    <div> Current Hit Points: ${ph()} </div>
    


    <div> Inventory: ${ phn(data.inventory.length)} ${ph()} </div> 
    <br/>
    <div> Spells: ${ phn(data.spells.length)
         } ${ph()} </div> 
	<br/>
	
	

	
	
	<div> Backstory: ${ ph() } </div>
	
    

    <div> Other Proficiency: ${ phn(data.otherproficiency.length)} ${ph()} </div>
    

    
    
    <div> Features and Traits: ${ phn(data.featuresandtraits.length) } ${ph()} </div>
    <div> Money: ${ ph() } </div>
    
    
    </div>`,
        easyedit(data, "name", "text", putter),
        easyedit(data, "class", "text", putter),
        easyedit(data, "level", "number", putter, reload),
        easyedit(data, "race", "text", putter),
        easyedit(data, "alignment", "text", putter),
        easyedit(data, "experiencepoints", "number", putter),
        easyedit(data, "inspiration", "number", putter, reload),

        ...data.stats.map((stat, i) => EditStat(data, i, putter)), ...data.skillproficiency.map((prof, i) => Proficiency(prof)),
        easyedit(data, "speed", "number", putter),
        easyedit(data, "hp", "number", putter),
        ...data.inventory.map((item, i) => EditItem(data, i, putter)),
        newitem,
        ...data.spells.map((spell, i) => EditSpell(data, i, putter)),
        newspell,
        easyedit(data, "backstory", "text", putter),
        ...data.otherproficiency.map((x, i) => EditString(data, i, "otherproficiency", putter)),
        newoprof,
        //easyedit(data, "featuresandtraits", "text", putter),
        ...data.featuresandtraits.map((x, i) => EditString(data, i, "featuresandtraits", putter)),
        newtrait,
        easyedit(data, "money", "number", putter),
    );
    return content;
}
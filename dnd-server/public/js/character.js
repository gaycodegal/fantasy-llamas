var todef = ["Item", "Spell"];
todef.map((x) => {
    window[x] = function(x) {
        return JSON.stringify(x);
    };
});

async function Character(data) {
    data = await data;
    let content = await make(`<div>
    <div>
        <span> Name: ${ data.name } </span> 
        <span> Class: ${data.class} </span>
        <span> Level: ${ data.level } </span> 
        <span> Race: ${data.race} </span>
        <span> Alignment: ${data.alignment } </span>
        <span> Experience Points: ${ data.experiencepoints } </span>
    </div>
    <br/>
    
    <div> Inspiration: ${ data.inspiration } </div>
    <div> Stats: ${ 
        phn(data.stats.length)
         } </div>
    <div> Skill Proficiency: ${ JSON.stringify(data.skillproficiency) } </div>
    <br/>

    <div> Armor Class: (TODO MATHS) </div>
    <div> Initiative: (TODO MATHS) </div>
    <div> Speed:${data.speed} </div>
    
    <br/>


    <div> Current Hit Points: (TODO MATHS) </div>
    


    <div> Inventory: ${ phn(data.inventory.length)} </div> 
    <br/>
    <div> Spells: ${ phn(data.spells.length)
         } </div> 
    <br/>
    <div> Backstory: ${ data.backstory } </div>
    

    <div> Other Proficiency: ${ data.otherproficiency } </div>
    

    
    
    <div> Features and Traits: ${ data.featuresandtraits } </div>
    <div> Money: ${ data.money } </div>
    
    
    </div>`, ...data.stats.map((stat, i) => Stat(stat)), ...data.inventory.map((item, i) => Item(item)), ...data.spells.map((spell, i) => Spell(spell)));
    return content;
}

async function main() {
    const c = await Character({
        "inventory": [],
        "spells": [],
        "level": 1,
        "name": "string",
        "backstory": "pain & also bad childhood. fuck parents. There is blood in my fucking eyes.",
        "background": "depression",
        "class": "string",
        "race": "string",
        "stats": [{ "name": "desire for life", "value": 0 }, { "name": "gay for life", "value": 9001 }],
        "skillproficiency": [],
        "otherproficiency": ["string"],
        "proficiencybonus": 1,
        "inspiration": -1,
        "speed": 1,
        "alignment": "string",
        "experiencepoints": 1,
        "featuresandtraits": ["string"],
        "money": 1337,
        "hitdice": 520
    });
    console.log(c.html());
    $("body").append(c);
}
main();
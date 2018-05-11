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
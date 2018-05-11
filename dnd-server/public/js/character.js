/*var todef = ["Spell"];
  todef.map((x) => {
  window[x] = function(x) {
  return JSON.stringify(x);
  };
  });*/

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
    <div> Skill Proficiency: ${ phn(data.skillproficiency.length) } </div>
    <br/>

    <div> Armor Class: ${Math.sin(data.inspiration) * 100 * data.level | 0} </div>
    <div> Initiative: ${Math.cos(data.inspiration) * 100 * data.level | 0} </div>
    <div> Speed:${data.speed} </div>
    
    <br/>


    <div> Current Hit Points: ${data.hp} </div>
    


    <div> Inventory: ${ phn(data.inventory.length)} </div> 
    <br/>
    <div> Spells: ${ phn(data.spells.length)
         } </div> 
    <br/>
    <div> Backstory: ${ data.backstory } </div>
    

    <div> Other Proficiency: ${ data.otherproficiency } </div>
    

    
    
    <div> Features and Traits: ${ data.featuresandtraits } </div>
    <div> Money: ${ data.money } </div>
    
    
    </div>`, ...data.stats.map((stat, i) => Stat(stat)), ...data.skillproficiency.map((prof, i) => Proficiency(prof)), ...data.inventory.map((item, i) => Item(item)), ...data.spells.map((spell, i) => Spell(spell)));
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

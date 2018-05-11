import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './js/user-requests'
import Character from './components/character';
const spell=["0","Conjuration","1 action","60 ft","V S","Instantaneous"];
const spell1=["1","Conjuration","1 action","60 ft","V S","Instantaneous"];
const spell2 = ["2","Conjuration","1 action","60 ft","V S","Instantaneous"];
let spells = [spell,spell1, spell2];
const character_test = [0,{spell},2,3,4,5,6,7,8,9,10,11,12,13,14];

const testmeyoubadbitch = (async() =>{return {
  "inventory": [],
  "spells": [],
  "level": 1,
  "name": "string",
  "backstory": "pain & also bad childhood. fuck parents. There is blood in my fucking eyes.",
  "background": "depression",
  "class": "string",
  "race": "string",
  "stats": [{"name":"desire for life", "value":0},{"name":"gay for life", "value":9001}],
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
}})();
/*
async function main(){
  console.log(localStorage.cookie)
  console.log("drop table Character");
	let resp = await request("delete", "/store/Character"); // drop table Spell
  console.log(resp.responseText);
  console.log("sending: ", testmeyoubadbitch);
	resp = await request("post", "/store/Character", testmeyoubadbitch);
  const id = resp.responseText;
  console.log("fetching: ", id);
	resp = await request("get", "/store/Character/" + id);
  const character = JSON.parse(resp.responseText);
  return character;
}
*/

 console.log(testmeyoubadbitch);

class App extends Component {
   render() {
    return (
      <div className="App">
        
        <div className="App-intro">
          {/*<Stat name="Strength" value="8"/>
          <Stat name="Dexterity" value="9"/>
          <Stat name="Constitution" value="10"/>
          <Stat name="Inteligence" value="11"/>
          <Stat name="Wisdom" value="12"/>
          <Stat name="Charisma" value="13"/>
          <br/>
          <Spell name="Acid Splash" value={spell}/>
          <br/>
          <Item name= "dagger" value="simple weapon"/>
    <br/>*/}
          <Character data={testmeyoubadbitch}/>
        </div>
      </div>
    );
  }
}

export default App;

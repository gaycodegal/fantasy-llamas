import React, { Component } from 'react';
import Stat from './stat';
import Spell from './spell';
import Item from './item';
import '../js/user-requests.js'
const spell3=["0","Conjuration","1 action","60 ft","V S","Instantaneous"];
const spell1=["1","Conjuration","1 action","60 ft","V S","Instantaneous"];
const spell2 = ["2","Conjuration","1 action","60 ft","V S","Instantaneous"];
let spelllist = [spell3,spell1, spell2];

class state extends React.Component {
    state = null
    async componentDidMount() {
        const data = await this.props.data;
        this.setState(data);
    }
    
    render() {
        const spells = spelllist.map((spell)=>
            <Spell name="Acid Splash" value={spell}/>
        );
        if(!this.state)
            return <div>loading</div>;
        return <div>
            <div>
                <span> Name: { this.state.name } </span> 
                <span> Class: {this.state.class} </span>
                <span> Level: { this.state.level } </span> 
                <span> Race: {this.state.race} </span>
                <span> Alignment: {this.state.alignment } </span>
                <span> Experience Points: { this.state.experiencepoints } </span>
            </div>
            <br/>
            
            <div> Inspiration: { this.state.inspiration } </div>
            <div> Stats: { 
                this.state.stats.map((stat,i)=>{
                     return <Stat stat={stat} key={i}/>
                }
            )
                 } </div>
            <div> Skill Proficiency: { JSON.stringify(this.state.skillproficiency) } </div>
            <br/>

            <div> Armor Class: (TODO MATHS) </div>
            <div> Initiative: (TODO MATHS) </div>
            <div> Speed:{this.state.speed} </div>
            
            <br/>


            <div> Current Hit Points: (TODO MATHS) </div>
            


            <div> Inventory: { 
                this.state.inventory.map((item)=>{
                    <Item item={item}/>
                })
                 } </div> 
            <br/>
            <div> Spells: { 
                this.state.spells.map((spell)=>{
                    <Spell spell={spell}/>
                })
                 } </div> 
            <br/>
            <div> Backstory: { this.state.backstory } </div>
            

            <div> Other Proficiency: { this.state.otherproficiency } </div>
            

            
            
            <div> Features and Traits: { this.state.featuresandtraits } </div>
            <div> Money: { this.state.money } </div>
            
            
            </div>;
    }
}
export default state;
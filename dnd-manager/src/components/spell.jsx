import React, { Component } from 'react';
class Spell extends React.Component {
    render() {
        return <div>
            <span> name: { this.props.name } </span> 
            <span> level: { this.props.value[0] } </span> 
            <span> school: { this.props.value[1] } </span> 
            <span> time: { this.props.value[2] } </span> 
            <span> range: { this.props.value[3] } </span>
            <span> compnents: { this.props.value[4] } </span>
            <span> duration: { this.props.value[5] } </span>
            </div>;
    }
}
export default Spell;
import React, { Component } from 'react';
class Stat extends React.Component {
    render() {
        return <div>
            <span> name: { this.props.stat.name } </span> 
            <span> value: { this.props.stat.value } </span> 
            </div>;
    }
}
export default Stat;
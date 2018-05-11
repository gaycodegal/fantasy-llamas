import React, { Component } from 'react';
class Item extends React.Component {
    render() {
        return <div>
            <span> name: { this.props.name } </span> 
            <span> type: { this.props.value } </span> 
            </div>;
    }
}
export default Item;
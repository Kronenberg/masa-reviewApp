import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Group extends Component {
  constructor(){
    super();
  }
  render(){
    return(
      <div>
        <NavLink to={`/${this.props.title}`}>{this.props.title}</NavLink>
      </div>
    );
  }
}

export default Group;
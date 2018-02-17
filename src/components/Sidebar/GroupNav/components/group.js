import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "./group.css"


class Group extends Component {
  constructor(){
    super();
  }
  render(){
    let title = this.props.title;
    title = title.charAt(0).toUpperCase() + title.slice(1);
      return(
        <li className="group-list">
          <NavLink to={`/${this.props.title}`}>{title}</NavLink>
        </li>
    );
  }
}

export default Group;
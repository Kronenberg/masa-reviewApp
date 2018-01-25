import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Group extends Component {
  constructor(){
    super();
  }
  render(){
    return(
      <NavLink to={`/${this.props.title}`}>
        <div className="card">
          <img src={this.props.image}/>
          <div className="groupName">
            <p className="title">{this.props.title}</p>
          </div>
        </div>
      </NavLink>
    );
  }

}

export default Group;
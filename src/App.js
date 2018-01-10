import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import Routs from './routs';


import logo from './logo.svg';
import './App.css';



class App extends Component {
  render() {
    return (
      <div>

        <nav>
          <ul>
            
            <li><NavLink to="/" activeClassName="selected">Home</NavLink></li>
            <li><NavLink to="/programs" activeClassName="selected">Programs</NavLink></li>
            <li><NavLink to="/chat" activeClassName="selected">Chat</NavLink></li>
            
          </ul>
        </nav>
        <Routs />

      </div>
    );
  }
}

export default App;

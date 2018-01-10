import React, { Component } from 'react';
import Routs from './routs';
import MessagesWall from './MessagesWall/MessagesWall';
import { NavLink } from 'react-router-dom';
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
            <li><NavLink to="/messageswall" activeClassName="selected">MessagesWall</NavLink></li>
            
          </ul>
        </nav>
        <Routs />

      </div>
    );
  }
}

export default App;

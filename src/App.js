import React, { Component } from 'react';
<<<<<<< HEAD


import { NavLink } from 'react-router-dom';

import Routs from './routs';


import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';



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

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/program' component={Program} />
          <Route path='/chat' component={Chat} />
        </Switch>

      </div>
    );
  }
}

export default App;

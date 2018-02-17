import React, { Component } from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';
import Routs from './routs';

import { Helmet } from "react-helmet";
import { Sidebar } from "./components/Sidebar/Sidebar";

class App extends Component {
  render() {
    return (
      <div>
         <Helmet>
                <meta charSet="utf-8" />
                <title>MASA REVIEW APPLICATION</title>
                <link rel="canonical" href="https://stark-atoll-57647.herokuapp.com/" />
          </Helmet>
        <div id="app-wrapper">  
          <div id="wrapper">
            <header>
              <nav>
                <ul>
                  <li><NavLink to="/" activeClassName="selected">Home</NavLink></li>
                  <li><NavLink to="/programs" activeClassName="selected">Programs</NavLink></li>
                  <li><NavLink to="/chat" activeClassName="selected">Chat</NavLink></li>
                </ul>
              </nav>
            </header>
            <Routs id="routs"/>
          </div>
          <Sidebar id="sidebar"/>
        </div>
      </div>
    );
  }
}

export default App;

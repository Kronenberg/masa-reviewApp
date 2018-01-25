import React, { Component } from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';
import Routs from './routs';

import {Helmet} from "react-helmet";

class App extends Component {
  render() {
    console.log(process.env)
    return (
      <div>
         <Helmet>
                <meta charSet="utf-8" />
                <title>MASA REVIEW APPLICATION</title>
                <link rel="canonical" href="https://stark-atoll-57647.herokuapp.com/" />
          </Helmet>
        <nav>
          <div>
              <ul>
                <li><NavLink to="/" activeClassName="selected" className="logo">Logo</NavLink></li>
                <li><NavLink to="/" activeClassName="selected">Programs</NavLink></li>
                <li><NavLink to="/chat" activeClassName="selected">Chat</NavLink></li>
              </ul>
          </div>
          <div>
              <ul>
                <li><NavLink to="/administration/register" activeClassName="selected">Sign In</NavLink></li>
                <li><NavLink to="/administration/login" activeClassName="selected">Log In</NavLink></li>
              </ul>
          </div>
        </nav>
        <Routs />
      </div>
    );
  }
}

export default App;

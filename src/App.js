import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div>
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

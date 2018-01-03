import React, { Component } from 'react';
import MessagesWall from './MessagesWall/MessagesWall';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <MessagesWall />
        <h1>VERY MINIMAL APP WITH WHITE SPACE :)</h1>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Routs from './routs';
import Header from './components/Header/Header'
import { Helmet } from "react-helmet";

class App extends Component {
  render() {
    return (
      <div>
         <Helmet>
                <meta charSet="utf-8" />
                <title>MASA REVIEW APPLICATION</title>
                <link rel="canonical" href="https://stark-atoll-57647.herokuapp.com/" />
          </Helmet>
          <Header/>
        <Routs />
      </div>
    );
  }
}


export default App;

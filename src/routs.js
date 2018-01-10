import React, { Component } from 'react';

import { Route, Switch,} from 'react-router-dom';

import Chat from './components/Chat/Chat';
import Programs from './components/Programs/Programs';
import Home from './components/Home/Home';

const Routs = () => (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/programs' component={Programs} />
      <Route path='/chat' component={Chat} />
    </Switch>
  )


export default Routs;
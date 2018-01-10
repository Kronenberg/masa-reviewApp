import React, { Component } from 'react';

import { Route, Switch,} from 'react-router-dom';

import Chat from './components/Chat/Chat';
import Programs from './components/Programs/Programs';
import Home from './components/Home/Home';
import MessagesWall from './MessagesWall/MessagesWall'

const Routs = () => (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/programs' component={Programs} />
      <Route path='/chat' component={Chat} />
      <Route path='/messageswall' component={MessagesWall} />
    </Switch>
  )


export default Routs;
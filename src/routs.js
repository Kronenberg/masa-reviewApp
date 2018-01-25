import React from 'react';

import { Route, Switch, } from 'react-router-dom';

import Chat from './components/Chat/Chat';
import Programs from './components/Programs/Programs';
import Home from './components/Home/Home';
import GroupPage from './components/GroupPage/GroupPage';
import Register from './components/Administration/Register';
import Login from './components/Administration/Login';

const Routs = () => (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/programs' component={Programs} />
      <Route exact path='/chat' component={Chat} />
      <Route exact path='/:groupTitle' component={GroupPage} />
      <Route exact path='/administration/register' component={Register} />
      <Route exact path='/administration/login' component={Login} />
    </Switch>
  )

export default Routs;
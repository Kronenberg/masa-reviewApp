import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


// @ACTIONS
import { runTheApp } from './actions/globalActions';
import * as TYPES from './ActionsTYPES/TYPES';

describe('REDUX ACTION FIRE THE APP', () => {
  it('[redux][TYPES.RUN_THE_APP]', () => {
    const expectedAction = {
      type: TYPES.RUN_THE_APP,
      payload: true 
    }
    expect(runTheApp()).toEqual(expectedAction)
  })

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

});

// @TYPES






import React, { Component } from 'react';
import GroupNav from './GroupNav/GroupNav'

import './Sidebar.css'

export class Sidebar extends Component {
    render(){
        return(
            <div id="sidebar">
                <div id='sidebar-wrapper'>
                    <div className='search-fild'>
                        <input></input>
                    </div>
                    <GroupNav />
                </div>
            </div>
      );
    }
  }

import React, { Component } from 'react';
import GroupNav from './GroupNav/GroupNav'
import Header from '../Header/Header'
import './Sidebar.css'

export class Sidebar extends Component {
    render(){
        return(
            <div className="sidebar">
                <div className='sidebar-wrapper'>
                    <Header />
                    <div>
                        <p>Group:</p>
                        <GroupNav />
                    </div>
                </div>
            </div>
      );
    }
  }

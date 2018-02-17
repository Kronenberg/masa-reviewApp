import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGroups } from '../../../actions/senders';
import Group from './components/group';
import _ from 'lodash'
import { createAccount, createAccountToInitial } from '../../../actions/auth';

import "./GroupNav.css"


class GroupNav extends Component {
  constructor(){
    super();
  }

  componentWillMount() {
    this.props.getAllGroups();
    this.props.createAccount('bigcheeseh@gmail.com', '123456')
  }

  render(){
    //console.log(this.props.groupStatus);
    var groups = [];
    if(this.props.groupStatus && this.props.groupStatus.groups) {   
      _.mapValues(this.props.groupStatus.groups, (item) => {
        groups.push(
          <Group 
            key={item.index}
            title={item.nameUS}
            index={item.index}
          />
        )
       })
    }
    return(
      <div className="group_nav">
        <ul>
            {this.props.groupStatus.pending ? 'Loading' : groups }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
      return {
          groupStatus: state.groupReducer
      }
  }

const  mapDispatchToProps = (dispatch) => {
  return {
    getAllGroups: bindActionCreators(getAllGroups, dispatch),
    createAccount: bindActionCreators(createAccount, dispatch)
  }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(GroupNav);
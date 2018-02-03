import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGroups } from '../../actions/senders';
import Group from './components/group';
import _ from 'lodash'
import { createAccount, createAccountToInitial } from '../../actions/auth';
<<<<<<< HEAD
import './home.css';
=======

>>>>>>> 5e2c5664c921037d02620b2434843863021bf882


class Home extends Component {
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
            image={item.image}
          />
        )
      })

    }
  }
  render(){
    //console.log(this.props.groupStatus);
    
    return(
      <div style={{padding: '20px'}}>
<<<<<<< HEAD
        <div className="cards">
            {this.props.groupStatus.pending ? 'Loading' : this.renderGroups() }
=======
        <div>
            {this.props.groupStatus.pending ? 'Loading' : groups }
>>>>>>> 5e2c5664c921037d02620b2434843863021bf882
        </div>
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
  

export default connect(mapStateToProps, mapDispatchToProps)(Home);
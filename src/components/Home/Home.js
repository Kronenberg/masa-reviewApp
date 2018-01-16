import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGroups } from '../../actions/senders';
import Group from './components/group';
import _ from 'lodash'

class Home extends Component {
  constructor(){
    super();
  }

  componentWillMount() {
    this.props.getAllGroups();
  }

  render(){
    console.log(this.props.groupStatus);
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
      <div style={{padding: '20px'}}>
        <div>
            {this.props.groupStatus.pending && !groups ? 'Loading' : groups }
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
  }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(Home);
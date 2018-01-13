import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGroups } from '../../actions/senders';
import Group from './components/group';
import group from './components/group';

class Home extends Component {
  constructor(){
    super();
  }

  componentWillMount() {
    this.props.getAllGroups();
  }

  render(){
    console.log('[Home Component][render]');
    const groups = this.props.groupStatus && this.props.groupStatus.groups  ? this.props.groupStatus.groups.map(item => (
      <Group 
        key={item.nameUS}
        title={item.nameUS}
      />
    )
  ) : [];
    return(
      <div>
        <div>
            {this.props.groupStatus.pending ? 'Loading' : groups }
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
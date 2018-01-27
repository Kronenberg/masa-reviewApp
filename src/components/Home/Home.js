import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGroups } from '../../actions/senders';
import Group from './components/group';
import _ from 'lodash'
import { createAccount, createAccountToInitial } from '../../actions/auth';
import './home.css';


class Home extends Component {
  constructor(){
    super();
  }

  componentWillMount() {
    this.props.getAllGroups();
  }
  renderGroups = () => {
    if (this.props.groupStatus && this.props.groupStatus.groups) {
      return this.props.groupStatus.groups.map((item) => {
        return (
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
        <div className="cards">
            {this.props.groupStatus.pending ? 'Loading' : this.renderGroups() }
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
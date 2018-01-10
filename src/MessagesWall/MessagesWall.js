import React, { Component } from 'react';
import InputWallMessage from './components/InputWallMessage'
import { connect } from 'react-redux';
import { fetchMessages } from '../actions/globalActions'

class MessagesWall extends Component{
    componentWillMount(){
        this.props.fetchMessages()
    }
    render(){
        return(
            <div>
                <InputWallMessage />
            </div>
        )
    }
}

const mapStateToProps = ({messages})=>{
    console.log(messages)
    return {
        messages
    }
}

export default connect(mapStateToProps, { fetchMessages } )(MessagesWall)
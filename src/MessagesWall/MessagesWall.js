import React, { Component } from 'react';
import InputWallMessage from './components/InputWallMessage'
import { connect } from 'react-redux';
import { fetchMessages } from '../actions/globalActions'
import Message from './components/Message';

class MessagesWall extends Component{
    state = {
        messages:[]
    }
    componentWillMount(){
        this.props.fetchMessages()
    }
    shouldComponentUpdate(nextProps, nextState){
        if(this.state.messages !== nextState.messages){

            return true
        }

        if(this.props.notification !== nextProps.notification){
            console.log(nextProps.notification)
        
        }
        if(nextProps.messages && nextProps.messages.length > 0){
  
            const messages = nextProps.messages.map((item)=>{
                var childrenOfDoom = []
                if(item.comments){
                    for(var key in item.comments){
                        childrenOfDoom.push(<Message value={item.comments[key].value} key={key} index={item.comments[key].index} />)
                    }
                }

                return <Message value={item.message} key={item.index} index={item.index} children={childrenOfDoom}/>
            })

            this.setState({messages})
        }

        return false
    }
    render(){

        return(
            <div>
                <InputWallMessage />
                <div>
                    {this.state.messages}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({messages, notification})=>{
    return {
        messages,
        notification
    }
}

export default connect(mapStateToProps, { fetchMessages } )(MessagesWall)
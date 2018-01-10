import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dispatchMessages } from '../../actions/globalActions'

class Message extends Component{

    state = {
        overflow: true,
        showButton: null,
        message: null,
        visible: 'none'
    }
    
    
    componentDidMount(){
        const { message } = this;

        if (message && message.scrollHeight > message.clientHeight){

            this.setState({visible: 'block', message})
        }
    }
    render(){
        const { value } = this.props;
        const { overflow, visible, message} = this.state;

        return(
            <div style={{ padding: '10px'}}>
                <div dangerouslySetInnerHTML={{ __html: value }}
                     ref={(div)=> this.message = div }
                     style={{maxHeight: message && !overflow ? message.scrollHeight : '26vh', 
                             overflow: overflow ? 'hidden':'visible',
                             textOverflow: 'clip'}}
                />
                <input type="button"
                       value={overflow ? 'show all' : 'hide'}
                       style={{display: visible}}
                       onClick={() => this.setState({ overflow: !overflow })} />
            </div>
        )
    }
}

export default connect(null, { dispatchMessages })(Message);
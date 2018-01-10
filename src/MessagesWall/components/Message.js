import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dispatchComments } from '../../actions/globalActions';
import InputField from './InputField';

class Message extends Component{

    state = {
        overflow: true,
        showButton: null,
        message: null,
        visible: 'none'
    }
    
    componentWillReceiveProps(){
        this.setState(...this.props)
    }
    componentDidMount(){
        const { message } = this;

        if (message && message.scrollHeight > message.clientHeight){

            this.setState({visible: 'block', message})
        }
    }
    handleComment=(e, value)=>{
        e.preventDefault();

        this.props.dispatchComments({value, index: this.props.index})
    }
    render(){
        const { value } = this.props;
        const { overflow, visible, message} = this.state;

        return(
            <div style={{ padding: '20px'}}>
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
                <InputField handleComment={this.handleComment} comment={true} message={false}/>
                       <div>
                         {this.props.children}
                       </div>
            </div>
        )
    }
}

export default connect(null, { dispatchComments })(Message);
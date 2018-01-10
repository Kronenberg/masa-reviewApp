import React, { Component } from 'react';
import StyleTag from './StyleTag';
import Message from './Message';
import InputField from './InputField';
import { connect } from 'react-redux';
import { dispatchMessages } from '../../actions/globalActions';

class InputWallMessage extends Component {
    state={
        value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        messages: [],
        formHeight: 0,
        selectionStart: null,
        selectionEnd: null
    }
    handleMessage=(e, value)=>{

        e.preventDefault();

        const index = this.props.messages.length
        this.setState({ 
                        selectionStart: null,
                        selectionEnd: null,
                        value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                      })

        this.props.dispatchMessages({value, index})
    }
    handleStyles=(tag)=>{
        var { value } = this.state;
        const { textarea } = this.refs;
        
        if(textarea.selectionStart !== textarea.selectionEnd){
            var valueArr = value.split(""); 
            valueArr.splice(textarea.selectionStart, 0, `<${tag}>`);
            valueArr.splice(textarea.selectionEnd + 1, 0, `</${tag}>`);
            
            this.setState({
                           value: valueArr.join(""), 
                           selectionStart: textarea.selectionStart + tag.length + 2, 
                           selectionEnd: textarea.selectionEnd + tag.length + 2
                        })

        }
    }
    componentDidUpdate(){
        const { textarea } = this.refs;
        const { selectionStart, selectionEnd } = this.state
        if(selectionEnd !== selectionStart){
            textarea.focus();
            textarea.setSelectionRange(selectionStart, selectionEnd)
        }
    }
    render() {

        return (
            <InputField handleMessage={this.handleMessage} {...this.state} message={true} comment={false}/>
        )
    }
}

const mapStateToProps = ({messages})=>{
    return {
        messages
    }
}

export default connect(mapStateToProps, { dispatchMessages })(InputWallMessage);
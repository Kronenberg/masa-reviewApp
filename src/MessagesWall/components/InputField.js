import React, { Component } from 'react';
import StyleTag from './StyleTag';


class InputField extends Component {
    state = {
        value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        selectionStart: null,
        selectionEnd: null
    }
    
    handleStyles = (tag) => {
        var { value } = this.state;
        const { textarea } = this.refs;

        if (textarea.selectionStart !== textarea.selectionEnd) {
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
    componentDidUpdate() {
        const { textarea } = this.refs;
        const { selectionStart, selectionEnd } = this.state
        if (selectionEnd !== selectionStart) {
            textarea.focus();
            textarea.setSelectionRange(selectionStart, selectionEnd)
        }
    }
    
    render() {
        const {message, comment, handleMessage, handleComment } = this.props
        const {value} = this.state;
        
        return (
            <div className='form-message' style={{ width: '50%', padding: '15px' }}>
                <form onSubmit={message ? (e)=>handleMessage(e, value) : (e)=>handleComment(e, value)}
                    style={{ top: '0', padding: '15px 0' }}>
                    <div className='form-message style-tag'>
                        <StyleTag
                            tags={['bold', 'em', 'strike', 'u', 'h1', 'h2', 'h3', 'h4', 'h5']}
                            handleStyles={this.handleStyles} />
                    </div>
                    <div className='form-message text-editor' style={{ display: 'flex', position: 'flex', flexWrap: 'nowrap' }}>
                        <textarea maxLength={5000}
                            ref='textarea'
                            rows={10}
                            cols={90}
                            value={this.state.value}
                            onChange={(e) => this.setState({ value: e.target.value })} />
                        <input type="submit" value="Send" style={{ height: 'inherit' }} />
                    </div>
                </form>
            </div>
        )
    }
}


export default InputField;
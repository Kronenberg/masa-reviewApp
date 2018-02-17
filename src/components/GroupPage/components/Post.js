import React, { Component } from 'react';
import { EditorState, convertFromHTML } from 'draft-js';
import ReactHtmlParser from 'react-html-parser';

class Post extends Component{
    state = {
        content: null,
        editorState: EditorState.createEmpty()
    };

    componentWillMount(){
        const { content } = this.props;

        if(content){
            this.setState({ content });
        }
    }
    render(){
        console.log(this.state.editorState)
        return(
            <div style={{ boxShadow: '1px 1px 1px 1px rgb(187, 181, 181)', padding: '10px', margin: '10px', borderRadius: '2px'}}>
                <div>
                    <p>
                      <i>{ this.props.user }</i>
                    </p>
                </div>
                <div>
                    {ReactHtmlParser(this.state.content)}
                </div>
            </div>
        )
    }
}

export default Post
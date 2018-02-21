import React, { Component } from 'react';
import { EditorState, convertFromHTML } from 'draft-js';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { deletePost } from '../../../actions/events';
import { NavLink } from 'react-router-dom';

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
    componentWillReceiveProps(nextProps){

        this.setState({ content: nextProps.content });
    }
    deletePost = () => {
        const confirm = window.confirm("Точно удалить?")
        if(confirm){
            this.props.deletePost(this.props.postId, this.props.groupTitle, this.props.user)
        }
    }
    render(){
        return(
            <div className="post_panel" 
                 style={{ boxShadow: '1px 1px 1px 1px rgb(187, 181, 181)', padding: '10px', margin: '10px', borderRadius: '2px'}}>
                <div className="delete_post">
                    <button 
                        className="draftJsToolbar__button__qi1gf delete"
                        onClick={this.deletePost}
                        style={{ display: this.props.userEmail === this.props.user ? 'block': 'none'}}>
                        
                        Удалить
                    </button>
                </div>
                <div className="post_content">
                    {ReactHtmlParser(this.state.content)}
                </div>
                <div style={{ position: 'relative' }}>
                    <p style={{ background: '#black'}}>
                        {
                            this.props.comments ?
                                null :
                                <a style={{ color: '#333 !important', position: 'absolute', left: '20px', bottom: '20px' }} to={`/${this.props.groupTitle}/${this.props.postId}`}
                                    activeClassName="selected" >
                                    комментарии...
                            </a>
                        }
                    </p>
                </div>
                <div className="user_login">
                    <p>
                       { this.props.user ? `написал ${this.props.user}` : null }
                    </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        userEmail: authReducer.userEmail
    }
}




export default connect(mapStateToProps, { deletePost } )(Post)
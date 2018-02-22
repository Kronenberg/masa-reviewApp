import React, { Component } from 'react';
import { EditorState, convertFromHTML } from 'draft-js';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { deletePost } from '../../../actions/events';
import { NavLink } from 'react-router-dom';
import { Badge } from 'antd';

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
                <div>
                    <p style={{ position: 'relative' }}>
                        {
                            this.props.comments ?
                                null :
                                <a style={{ color: '#1675ce', position: 'absolute', left: '15px', bottom: '0px'}} href={`/${this.props.groupTitle}/${this.props.postId}`}
                                    activeClassName="selected" >
                                    комментарии
                                    <Badge count={this.props.commentsCount} style={{ margin: '5px', paddingBottom: '3px', background: '#1675ce', textAlign: 'center', verticalAlign: 'middle'}}/>
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

const mapStateToProps = ({ authReducer, postsReducer }) => {

    return {
        userEmail: authReducer.userEmail
    }
}




export default connect(mapStateToProps, { deletePost } )(Post)
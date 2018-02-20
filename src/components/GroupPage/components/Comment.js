import React, { Component } from 'react';
import { EditorState, convertFromHTML } from 'draft-js';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { deletePost } from '../../../actions/events';
import { NavLink } from 'react-router-dom';

class Post extends Component {
    state = {
        content: null,
        editorState: EditorState.createEmpty(),
        active: false
    };

    componentWillMount() {
        const { content } = this.props;

        if (content) {
            this.setState({ content });
        }
    }
    componentWillReceiveProps(nextProps) {

        this.setState({ content: nextProps.content });
    }
    deletePost = () => {
        const confirm = window.confirm("Точно удалить?")
        if (confirm) {
            this.props.deletePost(this.props.postId, this.props.groupTitle, this.props.user)
        }
    }
    render() {
       
        return (
            <div className={`comment_panel ${this.state.active ? 'active' : ''}`}
                onClick={()=>this.setState({active: !this.state.active})}>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <div className="user_login" style={{color: 'black', fontSize: '12px'}}>
                        <p>
                            {`to ${this.props.post.user}`}
                        </p>
                    </div>
                    <div className="delete_post delete_comment">
                        <button
                            className="draftJsToolbar__button__qi1gf delete"
                            onClick={this.deletePost}
                            style={{ display: this.props.userEmail === this.props.post.user ? 'block' : 'none' }}>

                            Удалить
                        </button>
                    </div>
                </div>
                <div className="comment_content">
                    {ReactHtmlParser(this.state.content)}
                </div>
                <div className="response">
                    <a href="#">
                        ответить
                    </a> 
                </div>
                <div className="user_login">
                   
                    <p>
                        {this.props.user ? `написал ${this.props.user}` : null}
                    </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ authReducer, postsReducer }) => {
    console.log(postsReducer)
    return {
        userEmail: authReducer.userEmail,
        post: postsReducer
    }
}




export default connect(mapStateToProps, { deletePost })(Post)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './components/Post';
import Comment from './components/Comment';
import { fetchPost, authListener } from '../../actions/events';
import { withRouter } from 'react-router'
import Editor from './components/Editor';

import { Transition } from 'react-transition-group';

const defaultStyle = {
    transition: `max-height ${300}ms linear, opacity ${300}ms ease-in-out`,
    width: '90%',
    margin: '0 5% 0 5%',
    maxHeight: '0',
    opacity: '0'
}

const transitionStyles = {
    entering: { opacity: 0, maxHeight:  0 },
    entered: { opacity: 1, maxHeight: '15%', transition: `max-height ${300}ms linear, opacity ${300}ms linear`}
}

class PostWithComments extends Component {
    state = {
        postProps: {},
        groupTitle: '',
        postId: '',
        comments:[],
        commentsElements: [],
        showEditor: false
    }
    componentWillMount(){
        const { groupTitle, post } = this.props.match.params
        this.props.fetchPost({ groupTitle, post })


        this.setState({ groupTitle, postId: post })
    }

    componentWillReceiveProps(nextProps){
        let commentList = [];
        
        if(nextProps.comments){

           
            for (var key in nextProps.comments) {
                if (nextProps.comments.hasOwnProperty(key)) {
                    nextProps.comments[key].commentId = key
                    commentList.push(nextProps.comments[key])
                }
            }
            
        }

        this.setState({postProps: nextProps.post, comments: commentList})
    }
    shouldComponentUpdate(nextProps, nextState){
        if(nextState.comments !== this.state.comments){

            this.renderComments(nextState.comments)

            return true
        }

        if (nextState.commentsElements !== this.state.commentsElements) {

            return true
        }

        if (nextState.showEditor !== this.state.showEditor) {

            return true
        }

        return false
    }

    renderComments=(comments)=>{
        const commentsElements = comments.map((comment, i) =>{
            return (
                <Comment { ... comment } key={i} user={this.props.user}/>
            )
        })

        this.setState({commentsElements})
    }
    handleCloseEditor=()=>{
        this.setState({ showEditor: !this.state.showEditor })
    }
    render(){
        return(
            <div className="post_wrapper">
                <Post { ...this.state.postProps } comments={true}/>
                <button className="comment_button draftJsToolbar__button__qi1gf" 
                        onClick={()=>this.setState({showEditor: !this.state.showEditor})}>комментировать
                </button>
                <Transition in={this.state.showEditor} timeout={300}>
                    {(state) => (
                        <div style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}>
                            <Editor 
                                id={this.state.postId}
                                groupTitle={this.state.groupTitle}
                                user={this.props.user}
                                handleCloseModal={this.handleCloseEditor} />

                        </div>
                    )}
                </Transition>


      
                <div className="comment_wrapper">
                    {this.state.commentsElements}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ postsReducer, authReducer})=>{

    return {
        post: postsReducer,
        user: authReducer.userEmail,
        comments: postsReducer.comments
    }
}

export default connect(mapStateToProps, { fetchPost })(withRouter(PostWithComments))
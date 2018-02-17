import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatePostModal from './components/CreatePostModal';
import Post from './components/Post';
import { fetchPosts } from '../../actions/events';
import { withRouter } from 'react-router'

import './GroupPage.css';

class GroupPage extends Component {
    state = {
        renderPosts: false,
        posts: [],
        postsElements: []
    }

    componentWillMount(){
        const { groupTitle } = this.props.match.params
        this.props.fetchPosts(groupTitle);
    }
    componentWillReceiveProps(nextProps){
        const { posts } = nextProps;
       
        this.setState({posts: [...posts]})
    
    }
    shouldComponentUpdate(nextProps, nextState){
        if(nextState.posts !== this.state.posts){
            
            this.renderPosts(nextState.posts)
        }

        if(nextState.postsElements !== this.state.postsElements){
            return true
        }
        return false
    }

    renderPosts(posts){
        const postsElements = posts.map((post, i) => {
            return (
                <Post groupTitle={post.groupTitle}
                      user={post.user}
                      postId={post.postId}
                      content={post.content}
                      key={i} />
            )
        })


        this.setState({ postsElements })
    }
    
    render() {
        console.log(this.state.postsElements)
        return (
            <div style={{ padding: '50px' }}>
                <CreatePostModal groupTitle={this.props.match.params.groupTitle}/>
                {this.state.postsElements.reverse()}
            </div>
        );
    }
}

const mapStateToProps = ({ postsReducer }) => {
  
    
    return {
        posts: postsReducer
    }
}

export default connect(mapStateToProps, { fetchPosts })(withRouter(GroupPage));
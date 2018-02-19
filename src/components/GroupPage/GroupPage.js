import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatePostModal from './components/CreatePostModal';
import Post from './components/Post';
import { fetchPosts } from '../../actions/events';
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom';

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

        if (nextProps.match.params !== this.props.match.params) {

            const { groupTitle } = nextProps.match.params
            this.props.fetchPosts(groupTitle);
        }
    }

    shouldComponentUpdate(nextProps, nextState){

        if(nextState.posts !== this.state.posts){
            
            this.renderPosts(nextState.posts)
            return false
        }

        if(nextState.postsElements !== this.state.postsElements){
            return true
        }
        return false
    }

    renderPosts(posts){
        const postsElements = posts.map((post, i) => {
            return (
                <div>
                      <Post groupTitle={post.groupTitle}
                            user={post.user}
                            postId={post.postId}
                            content={post.content}
                            key={i} />
                </div>
            )
        })


        this.setState({ postsElements })
    }
    
    render() {
        return (
            <div style={{ padding: '50px' }}>
                <CreatePostModal groupTitle={this.props.match.params.groupTitle}/>
                {this.state.postsElements.reverse()}
            </div>
        );
    }
}

const mapStateToProps = ({ postsReducer }) => {
  
    //console.log(postsReducer)  
    return {
        posts: postsReducer
    }
}

export default connect(mapStateToProps, { fetchPosts })(withRouter(GroupPage));
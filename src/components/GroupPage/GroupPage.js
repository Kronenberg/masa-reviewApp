import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatePostModal from './components/CreatePostModal';
import Post from './components/Post';
import { fetchPosts } from '../../actions/events';
import { withRouter } from 'react-router'

import './GroupPage.css';

class GroupPage extends Component {
    state = {
        renderPosts: false
    }

    componentWillMount(){
        const { groupTitle } = this.props.match.params
        this.props.fetchPosts(groupTitle);
    }
    componentWillReceiveProps(nextProps){
        const { posts } = nextProps;
        if(posts.length > 0){
            this.setState({renderPosts: true})
        }
    }
    renderProps(){
        const { posts } = this.props
        if(posts){
            return posts.map((post)=>{
               console.log(post)
               return <Post groupTitle = {post.groupTitle}
                            user={post.user}
                            content={post.content}/>
            })
        } 
    }
    render() {

        return (
            <div style={{ padding: '50px' }}>
                <CreatePostModal groupTitle={this.props.match.params.groupTitle}/>
                {this.state.renderPosts ? this.renderProps() : null}
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
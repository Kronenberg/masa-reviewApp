import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatePostModal from './components/CreatePostModal';
import { fetchPosts } from '../../actions/events';

class GroupPage extends Component {

    componentWillMount(){
        this.props.fetchPosts();
    }
   
    render() {
        return (
            <CreatePostModal />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.postsReducer
    }
}

export default connect(mapStateToProps, { fetchPosts })(GroupPage);
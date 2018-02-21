import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatePostModal from './components/CreatePostModal';
import Post from './components/Post';
import { Transition } from 'react-transition-group';
import { fetchPosts } from '../../actions/events';
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom';


import './GroupPage.css';
import Calendar from './components/Calendar';


class GroupPage extends Component {
    state = {
        renderPosts: false,
        posts: [],
        postsElements: [],
        showCalendar: false
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
        if(nextState.showCalendar !== this.state.showCalendar){

            return true
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
            <div className="post_wrapper">
                <NavLink 
                    style={{ float: 'right', background: '#1675CE', color: 'white' }} 
                    className="draftJsToolbar__button__qi1gf сalendar" 
                    to={`/${this.props.match.params.groupTitle}/calendar`} 
                    activeClassName="selected"
                    onClick={() => this.setState({ showCalendar: !this.state.showCalendar })}>
                    
                    Календарь группы {this.props.match.params.groupTitle}
                </NavLink>

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
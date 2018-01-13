import React, { Component } from 'react';

class Programs extends Component {
  
  componentWillMount() {
    // GETALL_POSTS_BY_GROUP_NAME
    // this.props.getPostsByGroupName(this.props.ActiveRouteName);
  }

  // cherry-pick YOYO

  render(){
    console.log(this.props);
    return(
      <div>{this.props.location.pathname}</div>
    );
  }
}

export default Programs;
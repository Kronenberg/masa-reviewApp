import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { savePost } from '../../../actions/events';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

class CreatePostModal extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            postContext: ''
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        const { postContext } = this.state;
        const { groups } = this.props;
        const { groupTitle } = this.props.match.params;

        //console.log(groups)
        this.setState({ showModal: false });
        this.props.savePost({text: postContext, groupTitle, postIndex: groups[groupTitle].posts.length} )
    }

  
    render() {
        return (
            <div>
                <button onClick={this.handleOpenModal}>Создать пост</button>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Create Post Modal"
                    style={{
                        content: {
                                background: 'rgba(255, 255, 255, 0.3)'
                            }
                        }}>   
                        <textarea style={{width:'80%', height: '80%'}} 
                                  type="text"
                                  //value={this.state.postContext}
                                  onChange={(elem)=>this.setState({postContext: elem.target.value})}>
                        </textarea>
                        <div>
                            <button onClick={this.handleCloseModal}>Опубликовать</button>
                        </div>
                </ReactModal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        groups: state.postsReducer
    }
}



export default connect(mapStateToProps, { savePost })(withRouter(CreatePostModal));
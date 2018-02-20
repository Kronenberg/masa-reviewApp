import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePost } from '../../../actions/events';
import * as styles from '../GroupPage.scss';
import Editor from './Editor';


import ReactModal from 'react-modal';


class CreatePostModal extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            editorState: {}
        };
    }


    handleOpenModal= () => {
        this.setState({ showModal: true });
    }


    handleCloseModal= () =>{
        this.setState({ showModal: false });
    }
    
    handleEditorState
    render() {
        
        return (
            <div>
                <button onClick={this.handleOpenModal}>Создать пост</button>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Create Post Modal"
                    style={{
                            content: {
                                    background: 'rgba(255, 255, 255, 0.8)'
                                },
                            minHeight: '100%',
                            overflow: 'hidden'
                        }}>  
                    <Editor handleCloseModal={this.handleCloseModal} {...this.props} modal={true}/>
                </ReactModal>
            </div>
        );
    }
}


const mapStateToProps = ({ postsReducer, authReducer }) => {
    return {
        groups: postsReducer,
        user: authReducer.userEmail
    }
}



export default connect(mapStateToProps, { savePost })(CreatePostModal);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePost } from '../../../actions/events';

import ReactModal from 'react-modal';
import { EditorState, RichUtils, convertFromRaw } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';

import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';


import { stateToHTML } from 'draft-js-export-html';


import Toolbar, { pluginsToolBar } from './ToolbarPlugin'



const imagePlugin = createImagePlugin();

const plugins = [...pluginsToolBar, imagePlugin] 

const text = 'Click on the + button below and insert "/images/canada-landscape-small.jpg" to add the landscape image. Alternativly you can use any image url on the web.';


class CreatePostModal extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            editorState: EditorState.createEmpty()
        };

    }


    handleOpenModal= () => {
        this.setState({ showModal: true });
    }

    handleCloseModalAndSave= () => {
        const { editorState } = this.state;
        const { groups, groupTitle, user } = this.props;

        this.setState({ showModal: false });
        
        const contentState = editorState.getCurrentContent()

        this.props.savePost({ content: stateToHTML(contentState), groupTitle, user } )
    }
    handleCloseModal= () =>{
        this.setState({ showModal: false });
    }
    onChange = (editorState) => {
        
        this.setState({ editorState });
    }

    _onBoldClick = () => {
        this.handleKeyCommand('bold', this.state.editorState)
    }

    handleKeyCommand = (command, editorState) => {
        console.log(command)
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            console.log(newState, 'handled')
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }
    focus = () => {
        this.editor.focus();
    };

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
                        <div className="editor">
                            <Toolbar className="headlineButtonWrapper"/>
                            <Editor 
                                editorState={this.state.editorState} 
                                handleKeyCommand={this.handleKeyCommand}
                                onChange={this.onChange}
                                plugins={plugins}
                                ref={(element) => { this.editor = element; }}
                                />
                        </div>
                        <div style={{ display: 'flex'}}>
                            <button className="draftJsToolbar__button__qi1gf save" onClick={this.handleCloseModalAndSave}>Опубликовать</button>
                            <button className="draftJsToolbar__button__qi1gf cancel" onClick={this.handleCloseModal}>Отмена</button>
                        </div>
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePost } from '../../../actions/events';
import * as styles from '../GroupPage.scss'

import ReactModal from 'react-modal';

import { EditorState, RichUtils, convertFromRaw } from 'draft-js';

import Editor, { createEditorStateWithText, composeDecorators } from 'draft-js-plugins-editor';

import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';

import createImagePlugin from 'draft-js-image-plugin';

import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css';

import ImageAdd from './ImageAdd/index';

import { stateToHTML } from 'draft-js-export-html';

import Toolbar, { pluginsToolBar } from './ToolbarPlugin'

const imagePlugin = createImagePlugin();

const emojiPlugin = createEmojiPlugin({
    useNativeArt: true
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const plugins = [...pluginsToolBar, imagePlugin, emojiPlugin] 


class CreatePostModal extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            editorState: EditorState.createEmpty(),
            imageSize: 10
        };
    }


    handleOpenModal= () => {
        this.setState({ showModal: true });
    }

    handleCloseModalAndSave= () => {
        const { editorState } = this.state;
        const { groups, groupTitle, user } = this.props;

        const contentState = editorState.getCurrentContent()

        this.props.savePost({ content: stateToHTML(contentState), groupTitle, user } )

        this.setState({ showModal: false, editorState: EditorState.createEmpty() });
        
    }
    handleCloseModal= () =>{
        this.setState({ showModal: false, editorState: EditorState.createEmpty() });
    }
    onChange = (editorState, e) => {

        this.setState({ editorState });
    }

    _onBoldClick = () => {
        this.handleKeyCommand('bold', this.state.editorState)
    }

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }
    focus = () => {
        this.editor.focus();
    };

    imageSize=()=>{
        const image = window.document.getElementsByClassName("draftJsEmojiPlugin__image__192TI")

        image[0].width = image[0].width - 100;

        this.setState({ editorState: this.state.editorState });
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
                                    background: 'rgba(255, 255, 255, 0.8)'
                                },
                            minHeight: '100%',
                            overflow: 'hidden'
                        }}>  
                        <div className="editor">
                            <Editor 
                                editorState={this.state.editorState} 
                                handleKeyCommand={this.handleKeyCommand}
                                onChange={this.onChange}
                                plugins={plugins}
                                ref={(element) => { this.editor = element; }}/>
                            <EmojiSuggestions />
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Toolbar className="headlineButtonWrapper"/>
                                <EmojiSelect style={{margin: '15px'}}/>
                                <ImageAdd
                                    editorState={this.state.editorState}
                                    onChange={this.onChange}
                                    modifier={imagePlugin.addImage}
                                />
                            </div>
                            <div>
                            </div>
                        </div>
                        <div style={{ display: 'flex'}}>
                            <button className="draftJsToolbar__button__qi1gf" onClick={this.imageSize}>+</button>
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
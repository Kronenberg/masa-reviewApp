import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePost, saveComment } from '../../../actions/events';
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

class EditorComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            editorState: EditorState.createEmpty()
        };
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

    handleCloseAndSave = () => {
        console.log(this.props)

        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent()

        if (this.props.modal){
            const { groups, groupTitle, user } = this.props;


            this.props.savePost({ content: stateToHTML(contentState), groupTitle, user })

        }else{
            
            const { groupTitle, id } = this.props;
            
            this.props.saveComment({ groupTitle, id, content: stateToHTML(contentState)}) 
        }
        
        this.props.handleCloseModal()
        
        this.setState({ editorState: EditorState.createEmpty() });
    }

    handleClose = () => {
        this.setState({ editorState: EditorState.createEmpty() });

        
        this.props.handleCloseModal()
        
    }
    render() {

        return (
            <div>
                <div className="editor">
                    <Editor
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => { this.editor = element; }} />
                    <EmojiSuggestions />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Toolbar className="headlineButtonWrapper" />
                        <EmojiSelect style={{ margin: '15px' }} />
                        <ImageAdd
                            editorState={this.state.editorState}
                            onChange={this.onChange}
                            modifier={imagePlugin.addImage}
                        />
                    </div>
                    <div>
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    <button className="draftJsToolbar__button__qi1gf save" onClick={this.handleCloseAndSave}>Опубликовать</button>
                    <button className="draftJsToolbar__button__qi1gf cancel" onClick={this.handleClose}>Отмена</button>
                </div>
            </div> 

        )
    }

}

const mapStateToProps = ({ postsReducer, authReducer }) => {
    return {
        groups: postsReducer,
        user: authReducer.userEmail
    }
}



export default connect(mapStateToProps, { savePost, saveComment })(EditorComponent);
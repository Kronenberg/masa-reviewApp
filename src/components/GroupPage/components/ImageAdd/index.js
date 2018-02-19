import React, { Component } from 'react';
import styles from './styles.css';

export default class ImageAdd extends Component {
    // Start the popover closed
    state = {
        url: '',
        open: false,
    };

    // When the popover is open and users click anywhere on the page,
    // the popover should close


    addImage = () => {
        const { editorState, onChange } = this.props;

        onChange(this.props.modifier(editorState, this.state.url));
    };

    changeUrl = (evt) => {
        this.setState({ url: evt.target.value });
    }

    render() {
        

        return (
            <div>               
                <div>
                    <input
                        type="text"
                        placeholder="Paste the image url …"
                        onChange={this.changeUrl}
                        value={this.state.url}
                        className="draftJsToolbar__image__qi1gf image_add_input"
                    />
                    <button
                        className="draftJsToolbar__button__qi1gf image_add"
                        type="button"
                        onClick={this.addImage}>

                        Add
                    </button>
                </div>
            </div>
        );
    }
}
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import ReactQuill from 'react-quill';

class AdminAddBlogController extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' }; // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({ text: value });
    }

    render() {
        return (
            <ReactQuill
                value={this.state.text}
                onChange={this.handleChange} />
        );
    }
}

// AdminBlogController.propTypes = {
//     uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminAddBlogController));


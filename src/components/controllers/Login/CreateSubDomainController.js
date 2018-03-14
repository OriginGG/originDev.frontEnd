import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet, { ThemeProvider } from 'react-jss';
import { inject } from 'mobx-react';
import { GlobalStyles } from 'Theme/Theme';
import CreateSubDomainComponentRender from '../../render_components/CreateSubDomainComponentRender';

class CreateSubDomainController extends Component {
    handleDomainChange = e => {
        const v = e.target.value;
        this.domain_name = v;
    }
    uploadFile = (e) => {
        const { files } = e.target;
        this.logo_files = files[0];                 // eslint-disable-line
    }
    handleSubmit = () => {
        if (this.domain_name) {
            // create a domain and theme here.
        }
    }
    render() {
        return (
            <ThemeProvider theme={this.props.uiStore.origin_theme_data}>
                <CreateSubDomainComponentRender
                    dark_theme_image_src="https://s3.amazonaws.com/origin-images/origin/dark-theme.jpg"
                    light_theme_image_src="https://s3.amazonaws.com/origin-images/origin/light-theme.jpg"
                    header_image_src="https://s3.amazonaws.com/origin-images/origin/logo-top.png"
                    handleDomainChange={this.handleDomainChange}
                    handleSubmit={this.handleSubmit}
                    uploadFile={this.uploadFile}
                />
            </ThemeProvider>
        );
    }
}

CreateSubDomainController.propTypes = {
    uiStore: PropTypes.object.isRequired,
};
export default inject('uiStore')(injectSheet(GlobalStyles)(CreateSubDomainController));


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet, { ThemeProvider } from 'react-jss';
import { inject } from 'mobx-react';
import { GlobalStyles } from 'Theme/Theme';
import SignupPageComponentRender from '../../render_components/SignupPageComponentRender';
import LoginController from './sub_controllers/LoginController';

class SignupPageController extends Component {
    render() {
        return (
            <ThemeProvider theme={this.props.uiStore.origin_theme_data}>
                <SignupPageComponentRender bodyComponent={<LoginController />} />
            </ThemeProvider>
        );
    }
}

SignupPageController.propTypes = {
    uiStore: PropTypes.object.isRequired,
};
export default inject('uiStore')(injectSheet(GlobalStyles)(SignupPageController));


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet, { ThemeProvider } from 'react-jss';
import { inject } from 'mobx-react';
import { Header } from 'semantic-ui-react';
import { GlobalStyles } from 'Theme/Theme';
import SignupPageComponentRender from '../../render_components/signup/SignupPageComponentRender';
import LoginController from './sub_controllers/LoginController';
import logoTop from '../../../assets/images/logo-top.png';


const HeaderComp = () => {
    return (
        <div style={{ display: 'inline' }}><img alt="" src={logoTop} /><Header as="h1" style={{ float: 'right', marginTop: 12 }}>ORGANIZATION</Header></div>
    );
};
class SignupPageController extends Component {
    render() {
        return (
            <ThemeProvider theme={this.props.uiStore.origin_theme_data}>
                <SignupPageComponentRender headerComponent={<HeaderComp />} bodyComponent={<LoginController />} />
            </ThemeProvider>
        );
    }
}

SignupPageController.propTypes = {
    uiStore: PropTypes.object.isRequired,
};


export default inject('uiStore')(injectSheet(GlobalStyles)(SignupPageController));


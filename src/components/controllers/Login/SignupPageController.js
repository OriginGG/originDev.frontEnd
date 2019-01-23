import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet, { ThemeProvider } from 'react-jss';
import { inject } from 'mobx-react';
import { Header } from 'semantic-ui-react/dist/commonjs';
import { GlobalStyles } from 'Theme/Theme';
import appManager from '../../../utils/appManager';
import SignupPageComponentRender from '../../render_components/signup/SignupPageComponentRender';
import SignupController from './sub_controllers/SignupController';
import logoTop from '../../../assets/images/logo-top.png';


const HeaderComp = () => {
    return (
        <div style={{ display: 'inline' }}><img alt="" src={logoTop} /><Header as="h1" style={{ float: 'right', marginTop: 12 }}>ORGANIZATION</Header></div>
    );
};
class SignupPageController extends Component {
    componentDidMount = () => {
        const c = appManager.GetQueryParams('clear');
        if (c) {
            appManager.pouchDelete('authenticate');
        }
    }
    render() {
        return (
            <ThemeProvider theme={this.props.uiStore.origin_theme_data}>
                <SignupPageComponentRender headerComponent={<HeaderComp />} bodyComponent={<SignupController />} />
            </ThemeProvider>
        );
    }
}

SignupPageController.propTypes = {
    uiStore: PropTypes.object.isRequired,
};


export default inject('uiStore')(injectSheet(GlobalStyles)(SignupPageController));


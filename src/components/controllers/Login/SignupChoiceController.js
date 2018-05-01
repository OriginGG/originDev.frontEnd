import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet, { ThemeProvider } from 'react-jss';
import { inject } from 'mobx-react';
import { GlobalStyles } from 'Theme/Theme';
import SignupChoiceComponentRender from '../../render_components/signup/SignupChoiceComponentRender';
import SignupPageComponentRender from '../../render_components/signup/SignupPageComponentRender';
import historyStore from '../../../utils/stores/browserHistory';
import logoTop from '../../../assets/images/logo-top.png';

const Header = () => {
    return (
        <img alt="" src={logoTop} />
    );
};

class SignupChoiceController extends Component {
    handleClick = (field) => {
        if (field === 'org') {
            historyStore.push('/signup_org');
        } else {
            historyStore.push('/signup_ind');
        }
    }
    render() {
        return (
            <ThemeProvider theme={this.props.uiStore.origin_theme_data}>
                <SignupPageComponentRender headerComponent={<Header />} bodyComponent={<SignupChoiceComponentRender handleClick={this.handleClick} />} />
            </ThemeProvider>
        );
    }
}

SignupChoiceController.propTypes = {
    uiStore: PropTypes.object.isRequired,
};
export default inject('uiStore')(injectSheet(GlobalStyles)(SignupChoiceController));

import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { GlobalStyles } from 'Theme/Theme';
import SignupPageComponentRender from '../render_components/SignupPageComponentRender';
import LoginController from '../controllers/LoginController';

class SignupPageController extends Component {
    render() {
        return (<SignupPageComponentRender bodyComponent={<LoginController />} />);
    }
}

export default injectSheet(GlobalStyles)(SignupPageController);

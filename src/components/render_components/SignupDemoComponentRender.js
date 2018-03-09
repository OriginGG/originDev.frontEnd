/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class SignupDemoComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.signupBGImage}>
                <header className={this.props.classes.signupHeader}>
                    <div className="ui container">
                        <a href="#" className="header item">
                            <img src="./images/logo-top.png" className="logo"/>
                        </a>
                    </div>
                </header>
                <div id="modal_container" className="container">
                    <div id="sign_up" className={this.props.classes.signupModal}>{this.props.loginComponent}</div>
                </div>
                <div className={this.props.classes.signupFooter}>
                    <p className={this.props.classes.signupFooterText}>© Origin. All rights reserved.</p>
                </div>
            </div>
        )
    }
}

SignupDemoComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( SignupDemoComponentRender )
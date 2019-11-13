/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class SignupPageComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes}>
                <header className={this.props.classes.signupHeader}>
                    <div className="ui container">
                        <a href="/" className="header item">{this.props.headerComponent}</a>
                    </div>
                </header>
                <div id="modal_container" className="container">
                    <div >{this.props.bodyComponent}</div>
                </div>
                <div className={this.props.classes.signupFooter}>
                    <p className={this.props.classes.signupFooterText}>© Origin. All rights reserved.</p>
                </div>
            </div>
        )
    }
}

SignupPageComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( SignupPageComponentRender )
/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationMobileMenuComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className="ui inverted vertical menu">
                    <a className="item">
                        Home
                    </a>
                    <a className="item" style={this.props.about_style} onClick={this.props.handleAboutClick}>
                        About
                    </a>
                    <a className="item" style={this.props.store_style} onClick={this.props.handleStoreClick}>
                        Store
                    </a>
                    <a className="item">
                        Login
                    </a>
                    <a className="item">
                        Facebook
                    </a>
                    <a className="item">
                        Twitter
                    </a>
                    <a className="item">
                        Youtube
                    </a>
                </div>
            </div>
        )
    }
}

DarkOrganizationMobileMenuComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationMobileMenuComponentRender )
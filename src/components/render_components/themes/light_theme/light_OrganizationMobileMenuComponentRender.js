/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationMobileMenuComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className="ui top sidebar inverted vertical menu">
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
                </div>
            </div>
        )
    }
}

LightOrganizationMobileMenuComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationMobileMenuComponentRender )
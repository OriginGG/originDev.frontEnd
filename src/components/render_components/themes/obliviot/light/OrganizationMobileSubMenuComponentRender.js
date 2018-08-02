/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationMobileSubMenuComponentRender extends Component {
    render( ) {
        return (
            <div>
                <a className={this.props.classes.light_mobile_submenu_item_box}>
                    <span id="submenu_item">{this.props.name}</span>
                </a>
            </div>
        )
    }
}

LightOrganizationMobileSubMenuComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationMobileSubMenuComponentRender )
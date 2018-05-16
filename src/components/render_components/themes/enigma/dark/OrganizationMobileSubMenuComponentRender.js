/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationMobileSubMenuComponentRender extends Component {
    render( ) {
        return (
            <div>
                <a className={this.props.classes.dark_mobile_submenu_item_box}>
                    <span id="submenu_item">{this.props.name}</span>
                </a>
            </div>
        )
    }
}

DarkOrganizationMobileSubMenuComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationMobileSubMenuComponentRender )
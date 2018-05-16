/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class ObliviotOrganizationMobileSubMenuComponentRender extends Component {
    render( ) {
        return (
            <div>
                <a className={this.props.classes.obliviot_mobile_submenu_item_box}>
                    <span id="submenu_item">Call of Duty</span>
                </a>
            </div>
        )
    }
}

ObliviotOrganizationMobileSubMenuComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( ObliviotOrganizationMobileSubMenuComponentRender )
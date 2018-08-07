/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationTwitchHolderComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.obliviot_dark_twitch_feed_container}>{this.props.twitch_items}</div>
            </div>
        )
    }
}

DarkOrganizationTwitchHolderComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationTwitchHolderComponentRender )
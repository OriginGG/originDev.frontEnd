/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationTwitchHolderComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.obliviot_light_twitch_container}>{this.props.twitch_items}</div>
            </div>
        )
    }
}

LightOrganizationTwitchHolderComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationTwitchHolderComponentRender )
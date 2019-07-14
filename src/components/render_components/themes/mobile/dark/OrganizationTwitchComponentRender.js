/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationTwitchComponentRender extends Component {
    render( ) {
        console.log(this.props.key)
        return (
            <div id={`twitch-embed-${this.props.key}`} style={{
                display: 'inline-block'
            }}></div>
        )
    }

    componentDidUpdate() {
        new Twitch.Embed(`twitch-embed-${this.props.key}`, {
            width: 854,
            height: 480,
            channel: this.props.twitch_url.split('/').pop()
        });
    }
}

DarkOrganizationTwitchComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationTwitchComponentRender )

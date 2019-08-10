/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationTwitchComponentRender extends Component {
    rand = Math.round(Math.random()*1000)
    render( ) {
        console.log(this.props, this.rand)
        return (
            <div id={`twitch-embed-${this.rand}`} style={{
                display: 'inline-block'
            }}></div>
        )
    }

    componentDidMount() {
        console.log(Twitch)
        new Twitch.Embed(`twitch-embed-${this.rand}`, {
            width: '100%',
            height: '100%',
            channel: this.props.twitch_name
        });
    }
}

DarkOrganizationTwitchComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationTwitchComponentRender )

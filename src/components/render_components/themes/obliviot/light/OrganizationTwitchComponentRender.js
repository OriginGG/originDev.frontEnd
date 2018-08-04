/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationTwitchComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.obliviot_light_twitch_feed_container}>
                    <iframe title="ifr" width="300px" height="150px" frameBorder="0" allowFullScreen src={this.props.twitch_url}/>
                </div>
            </div>
        )
    }
}

LightOrganizationTwitchComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationTwitchComponentRender )
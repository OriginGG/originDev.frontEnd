/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationTwitchComponentRender extends Component {
    render( ) {
        return (
            <div style={{
                display: 'inline-block'
            }}>
                <div className={this.props.classes.obliviot_light_twitch_feed_container}>
                    <iframe scrolling="no" height="150" width="300" allowFullScreen="true" frameBorder="0" src={this.props.twitch_url}/>
                </div>
            </div>
        )
    }
}

DarkOrganizationTwitchComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationTwitchComponentRender )
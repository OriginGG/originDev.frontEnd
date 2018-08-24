/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationTwitchComponentRender extends Component {
    render( ) {
        return (
            <div style={{
                display: 'inline-block'
            }}>
                <div className={this.props.classes.obliviot_light_twitch_feed_container}>
                    <a href={this.props.twitch_url}>
                        <img className={this.props.classes.obliviot_twitch_thumbnail} src={this.props.twitch_thumbnail}/>
                        <div className={this.props.classes.obliviot_twitch_overlay}>
                            <div className={this.props.classes.obliviot_twitch_overlay_text}>{this.props.twitch_name}</div>
                            <div className={this.props.classes.obliviot_twitch_overlay_status} style={this.props.status_style}/>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}

LightOrganizationTwitchComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationTwitchComponentRender )
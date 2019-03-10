/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationStitchComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className="column">
                    <div className={this.props.classes.obliviot_light_twitch_feed_container}>
                        <div className={this.props.classes.obliviot_light_twitch_title_container}>
                            <div className={this.props.classes.obliviot_light_twitch_title}>{this.props.stitch_user}</div>
                            <div className={this.props.classes.obliviot_light_twitch_subtitle}>{this.props.stitch_title}</div>
                        </div>
                        <div className={this.props.classes.obliviot_light_user_online} style={this.props.online}>
                            <img className={this.props.classes.obliviot_light_user_image} src={this.props.stitch_user_image}/>
                            <div className={this.props.classes.obliviot_light_user_online_text}>live</div>
                        </div>
                        <div className={this.props.classes.obliviot_light_user_offlineline} style={this.props.offline}>
                            <img className={this.props.classes.obliviot_light_user_image} src={this.props.stitch_user_image}/>
                            <div className={this.props.classes.obliviot_light_user_online_text}>live</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

DarkOrganizationStitchComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationStitchComponentRender )
/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationVideoComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.lightNavBG}>
                <div className={this.props.classes.obliviot_light_video_container}>
                    <iframe title="ifr" width="100%" height="150px" frameBorder="0" allowFullScreen src={this.props.video1_url}/>
                </div>
                <div className={this.props.classes.obliviot_light_video_container}>
                    <iframe title="ifr" width="100%" height="150px" frameBorder="0" allowFullScreen src={this.props.video2_url}/>
                </div>
                <div className={this.props.classes.obliviot_light_video_container}>
                    <iframe title="ifr" width="100%" height="150px" frameBorder="0" allowFullScreen src={this.props.video3_url}/>
                </div>
                <div className={this.props.classes.obliviot_light_video_container}>
                    <iframe title="ifr" width="100%" height="150px" frameBorder="0" allowFullScreen src={this.props.video4_url}/>
                </div>
            </div>
        )
    }
}

LightOrganizationVideoComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationVideoComponentRender )
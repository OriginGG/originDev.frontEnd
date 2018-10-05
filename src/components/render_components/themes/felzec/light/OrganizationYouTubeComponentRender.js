/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationYouTubeComponentRender extends Component {
    render( ) {
        return (
            <div style={{
                display: 'inline-block',
                marginRight: '15px'
            }}>
                <div className={this.props.classes.felzec_light_video_container}>
                    <iframe title="ifr" width="426px" height="240pxpx" frameBorder="0" allowFullScreen src={this.props.video_url}/>
                </div>
            </div>
        )
    }
}

LightOrganizationYouTubeComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationYouTubeComponentRender )
/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationYouTubeComponentRender extends Component {
    render( ) {
        return (
            <div style={{
                display: 'inline-block',
                marginRight: '15px'
            }}>
                <div className={this.props.classes.enigma2_dark_video_container}>
                    <iframe title="ifr" width="584px" height="325px" frameBorder="0" allowFullScreen src={this.props.video_url}/>
                </div>
            </div>
        )
    }
}

DarkOrganizationYouTubeComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationYouTubeComponentRender )
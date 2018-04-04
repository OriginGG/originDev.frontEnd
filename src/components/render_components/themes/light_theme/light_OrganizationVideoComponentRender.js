/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationVideoComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.video_inner_main}>
                    <h2 style={{
                        color: 'rgb(0, 0, 0)'
                    }}>
                        FEATURED VIDEO
                        <span>
                            <a href="#" style={{
                                color: 'rgb(0, 0, 0)',
                                float: 'right',
                                fontSize: '.8em'
                            }}>More Video</a>
                        </span>
                    </h2>
                    <iframe title="ifr" width="100%" height="500px" frameBorder="0" src={this.props.video1_url}/>
                    <div className={this.props.classes.small_video_container}>
                        <div className={this.props.classes.small_video}>
                            <div>
                                <iframe title="ifr" width="100%" height="200px" frameBorder="0" src={this.props.video2_url}/>
                            </div>
                        </div>
                        <div className={this.props.classes.small_video_middle}>
                            <div>
                                <iframe title="ifr" width="100%" height="200px" frameBorder="0" src={this.props.video3_url}/>
                            </div>
                        </div>
                        <div className={this.props.classes.small_video}>
                            <div>
                                <iframe title="ifr" width="100%" height="200px" frameBorder="0" src={this.props.video4_url}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LightOrganizationVideoComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationVideoComponentRender )
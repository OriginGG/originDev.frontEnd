/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationVideoComponentRender extends Component {
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
                    <iframe title="ifr" width="100%" height="500px" src="https://www.youtube.com/embed/oS9ACN5XQ0M" frameBorder="0"/>
                    <div className={this.props.classes.small_video_container}>
                        <div className={this.props.classes.small_video}>
                            <div>
                                <iframe title="ifr" width="100%" height="200px" src="https://www.youtube.com/embed/rh8HEF63rx4" frameBorder="0"/>
                            </div>
                        </div>
                        <div className={this.props.classes.small_video_middle}>
                            <div>
                                <iframe title="ifr" width="100%" height="200px" src="https://www.youtube.com/embed/Cdb-X9aQmPY" frameBorder="0"/>
                            </div>
                        </div>
                        <div className={this.props.classes.small_video}>
                            <div>
                                <iframe title="ifr" width="100%" height="200px" src="https://www.youtube.com/embed/7D-Jd0BYsBc" frameBorder="0"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

OrganizationVideoComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationVideoComponentRender )
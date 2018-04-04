/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationVideoComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.darkBG}>
                <div className={this.props.classes.section_title_container}>
                    <h2>Videos</h2>
                </div>
                <h2 style={{
                    color: 'rgb(56, 56, 56)'
                }}>
                    FEATURED VIDEO
                    <span>
                        <a href="#" style={{
                            color: 'rgb(56, 56, 56)',
                            float: 'right',
                            fontSize: '.8em'
                        }}>More Video</a>
                    </span>
                </h2>
                <iframe title="ifr" width="100%" height="500px" frameBorder="0" allowFullScreen src={this.props.video1_url}/>
                <div className="ui stackable three column grid">
                    <div className="column">
                        <iframe title="ifr" width="100%" height="200px" frameBorder="0" allowFullScreen src={this.props.video2_url}/>
                    </div>
                    <div className="column">
                        <iframe title="ifr" width="100%" height="200px" frameBorder="0" allowFullScreen src={this.props.video3_url}/>
                    </div>
                    <div className="column">
                        <iframe title="ifr" width="100%" height="200px" frameBorder="0" allowFullScreen src={this.props.video4_url}/>
                    </div>
                </div>
            </div>
        )
    }
}

DarkOrganizationVideoComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationVideoComponentRender )
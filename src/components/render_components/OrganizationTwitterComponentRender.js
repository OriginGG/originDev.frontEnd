/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationTwitterComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.twitter_bar}/>
                <div className={this.props.classes.twitter_title}>
                    <p>LATEST TWEETS</p>
                </div>
                <iframe id="twitter-widget-4" scrolling="no" style={{
                    position: 'static',
                    visibility: 'visible',
                    display: 'inline-block',
                    width: '100%',
                    height: '300px',
                    padding: '0px',
                    border: 'none',
                    maxWidth: '100%',
                    minWidth: '180px',
                    marginTop: '0px',
                    marginBottom: '0px',
                    minHeight: '200px'
                }} data-widget-id="profile:AscendantLLC" title="Twitter Timeline" className="twitter-timeline twitter-timeline-rendered" allowFullScreen="true" allowTransparency="true" frameBorder="0"/>
            </div>
        )
    }
}

OrganizationTwitterComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationTwitterComponentRender )
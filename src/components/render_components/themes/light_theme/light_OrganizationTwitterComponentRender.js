/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationTwitterComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div id="twitter_container" className={this.props.classes.twitter_container}>
                    <div className={this.props.classes.twitter_bar}/>
                    <div className={this.props.classes.twitter_title}>
                        <p>LATEST TWEETS</p>
                    </div>
                    <div >{this.props.feed}</div>
                </div>
            </div>
        )
    }
}

LightOrganizationTwitterComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationTwitterComponentRender )
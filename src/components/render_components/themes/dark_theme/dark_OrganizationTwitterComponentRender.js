/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationTwitterComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.darkBG}>
                <div className={this.props.classes.dark_section_title_container}>
                    <p>LATEST TWEETS</p>
                </div>
                <div >{this.props.feed}</div>
            </div>
        )
    }
}

DarkOrganizationTwitterComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationTwitterComponentRender )
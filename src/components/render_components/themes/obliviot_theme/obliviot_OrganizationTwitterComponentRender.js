/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class ObliviotOrganizationTwitterComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.obliviotNavBG}>
                <div className={this.props.classes.obliviot_section_title_container}>
                    <h2>LATEST TWEETS</h2>
                </div>
                <div >{this.props.feed}</div>
            </div>
        )
    }
}

ObliviotOrganizationTwitterComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( ObliviotOrganizationTwitterComponentRender )
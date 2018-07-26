/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationMatchesComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.darkNavBG}>
                <div className="ui stackable three column grid">
                    <div >{this.props.recent_matches}</div>
                </div>
            </div>
        )
    }
}

DarkOrganizationMatchesComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationMatchesComponentRender )
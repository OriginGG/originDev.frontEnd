/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationMatchesComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.lightNavBG}>
                <div>
                    <div className="ui stackable three column grid">{this.props.recent_matches}</div>
                </div>
            </div>
        )
    }
}

LightOrganizationMatchesComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationMatchesComponentRender )
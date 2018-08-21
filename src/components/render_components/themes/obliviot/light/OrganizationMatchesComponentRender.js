/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationMatchesComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div>
                    <div className={this.props.classes.obliviot_light_matches_holder}>{this.props.recent_matches}</div>
                </div>
            </div>
        )
    }
}

LightOrganizationMatchesComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationMatchesComponentRender )
/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationTeamComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.felzec_team_container}>
                <div className={this.props.classes.felzec_team_container} style={this.props.bg_style}></div>
                <div className={this.props.classes.felzec_team_inner_container}></div>
            </div>
        )
    }
}

LightOrganizationTeamComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationTeamComponentRender )
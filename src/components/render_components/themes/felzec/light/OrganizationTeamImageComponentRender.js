/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationTeamImageComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.felzec_team_image_container}>
                <img className={this.props.classes.felzec_team_image} src={this.props.team_image}/>
                <div className={this.props.classes.felzec_team_overlay} style={this.props.felzec_overlay_style}>
                    <span className={this.props.classes.felzec_team_overlay_name}>{this.props.felzec_team_name}</span>
                    <span className={this.props.classes.felzec_team_overlay_handle}>{this.props.felzec_team_handle}</span>
                    <div className={this.props.classes.felzec_team_overlay_button}/>
                </div>
            </div>
        )
    }
}

LightOrganizationTeamImageComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationTeamImageComponentRender )
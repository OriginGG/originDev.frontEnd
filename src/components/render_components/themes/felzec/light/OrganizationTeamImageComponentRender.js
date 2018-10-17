/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationTeamImageComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.felzec_team_image_container}>
                <img className={this.props.classes.felzec_team_image} onClick={( ) => {
                    this
                        .props
                        .handleImageClick( this.props.felzec_overlay_style );
                }} src={this.props.team_image}/>
                <div className={this.props.classes.felzec_team_overlay} onClick={( ) => {
                    this
                        .props
                        .handleImageClick( this.props.felzec_overlay_style );
                }} style={this.props.felzec_overlay_style}>
                    <div className={this.props.classes.felzec_team_overlay_name}>{this.props.felzec_team_name}</div>
                    <div className={this.props.classes.felzec_team_overlay_handle}>{this.props.felzec_team_handle}</div>
                    <div className={this.props.classes.felzec_team_overlay_button} key={this.props.individual_id} onClick={( ) => {
                        this
                            .props
                            .handleIndividualClick( this.props.individual_id );
                    }}>PROFILE</div>
                </div>
            </div>
        )
    }
}

LightOrganizationTeamImageComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationTeamImageComponentRender )
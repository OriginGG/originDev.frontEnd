/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationTeamImageComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.enigma2_teammember_container}>
                <img className={this.props.classes.enigma2_teammember_image} src={this.props.team_image}/>
                <div className={this.props.classes.enigma2_player_handle} style={this.props.enigma2_profile_handle_style}>{this.props.felzec_team_handle}</div>
                <div className={this.props.classes.enigma2_player_name}>{this.props.felzec_team_name}</div>
                <div className={this.props.classes.enigma2_profile_button} style={this.props.enigma2_profile_button_style} key={this.props.individual_id} onClick={( ) => {
                    this
                        .props
                        .handleIndividualClick( this.props.individual_id );
                }}>VIEW PROFILE</div>
            </div>
        )
    }
}

DarkOrganizationTeamImageComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationTeamImageComponentRender )
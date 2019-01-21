/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationTeamGameComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.enigma2_team_game_container}>
                <img className={this.props.classes.enigma2_team_game_media} src={this.props.game_banner}/>
                <div className={this.props.classes.enigma2_team_game_overlay}>
                    <div className={this.props.classes.enigma2_team_game_overlay_button} style={this.props.show_team_color} onClick={this.props.handleShowClick}>{this.props.button_text}</div>
                    <div className={this.props.classes.enigma2_team_game_overlay_text} style={this.props.team_game_color}>{this.props.game_name}</div>
                </div>
                <div className={this.props.classes.enigma2_teamamte_container} style={this.props.container_style}>{this.props.container_teams}</div>
            </div>
        )
    }
}

DarkOrganizationTeamGameComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationTeamGameComponentRender )
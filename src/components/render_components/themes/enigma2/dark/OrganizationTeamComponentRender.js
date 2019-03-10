/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationTeamComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.enigma2_team_main_container}>
                <div className={this.props.classes.enigma2_team_title_container} style={this.props.title_color}>
                    TEAMS
                </div>
                <div className={this.props.classes.enigma2_team_info_container}>
                    <div className={this.props.classes.enigma2_team_info_box}>
                        <div className={this.props.classes.enigma2_team_info_count} style={this.props.team_count_color}>{this.props.team_count}</div>
                        <div className={this.props.classes.enigma2_team_info_title} style={this.props.team_title_color}>Teams</div>
                    </div>
                    <div className={this.props.classes.enigma2_team_info_box}>
                        <div className={this.props.classes.enigma2_team_info_count} style={this.props.player_count_color}>{this.props.player_count}</div>
                        <div className={this.props.classes.enigma2_team_info_title} style={this.props.player_title_color}>Players</div>
                    </div>
                </div>
                <div className={this.props.classes.enigma2_game_container}>{this.props.roster_games}</div>
            </div>
        )
    }
}

DarkOrganizationTeamComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationTeamComponentRender )
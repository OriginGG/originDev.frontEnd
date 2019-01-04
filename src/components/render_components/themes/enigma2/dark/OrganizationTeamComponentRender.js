/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationTeamComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.felzec_team_main_container}>
                <div className={this.props.classes.felzec_team_container} style={this.props.bg_style}></div>
                <div className={this.props.classes.felzec_team_filter_container} style={this.props.filter_style}/>
                <div className={this.props.classes.felzec_team_inner_container}>
                    <div className={this.props.classes.felzec_game_container}>{this.props.roster_games}</div>
                    <div className={this.props.classes.felzec_teammate_container}>{this.props.roster_teams}</div>
                </div>
            </div>
        )
    }
}

DarkOrganizationTeamComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationTeamComponentRender )
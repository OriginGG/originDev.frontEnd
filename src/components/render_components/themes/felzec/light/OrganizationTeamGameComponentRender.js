/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationTeamGameComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.felzec_team_game_container}>
                <img className={this.props.classes.felzec_team_game_media} src={this.props.game_media_1}/>
            </div>
        )
    }
}

LightOrganizationTeamGameComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationTeamGameComponentRender )
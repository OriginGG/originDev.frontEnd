/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationMatchesComponentElementRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.felzec_light_match_container}>
                    <div className="ui stackable two column grid">
                        <div className="seven wide column">
                            <div className={this.props.classes.enigma2_matches_game}>{this.props.matches_game}</div>
                            <div className={this.props.classes.enigma2_matches_league}>{this.props.matches_league}</div>
                            <div className={this.props.classes.enigma2_matches_date}>{this.props.matches_date}</div>
                        </div>
                        <div className="nine wide column">
                            <div className="ui three column grid">
                                <div className="column">
                                    <div className={this.props.classes.felzec_light_match_vs_image_container}>
                                        <img className={this.props.classes.felzec_light_match_vs_image} src={this.props.matches_image_3}/>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className={this.props.classes.felzec_light_match_vs_score}>{this.props.matches_score}</div>
                                </div>
                                <div className="column">
                                    <div className={this.props.classes.felzec_light_match_vs_image_container}>
                                        <img className={this.props.classes.felzec_light_match_vs_image} src={this.props.matches_image_2}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

DarkOrganizationMatchesComponentElementRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationMatchesComponentElementRender )
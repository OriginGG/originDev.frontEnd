/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationMatchesMobileComponentElementRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.felzec_light_match_container}>
                    <div className="ui stackable three column grid">
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '0px!important'
                        }} className="column">
                            <img className={this.props.classes.felzec_light_mobile_match_vs_image} src={this.props.matches_image_1}/>
                            <div className={this.props.classes.felzec_light_mobile_match_vs_score}>{this.props.matches_score}</div>
                            <img className={this.props.classes.felzec_light_mobile_match_vs_image} src={this.props.matches_image_2}/>
                        </div>
                        <div style={{
                            padding: '0px!important'
                        }} className="column">
                            <div className={this.props.classes.felzec_matches_mobile_game}>{this.props.matches_game}</div>
                            <div className={this.props.classes.felzec_matches_league}>{this.props.matches_league}</div>
                            <div className={this.props.classes.felzec_matches_date}>{this.props.matches_date}</div>
                        </div>
                        <div style={{
                            padding: '0px!important'
                        }} className="column">
                            <div className={this.props.classes.felzec_match_mobile_info_container}>
                                <a target="_blank" href={this.props.more_url}>SEE MORE</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LightOrganizationMatchesMobileComponentElementRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationMatchesMobileComponentElementRender )
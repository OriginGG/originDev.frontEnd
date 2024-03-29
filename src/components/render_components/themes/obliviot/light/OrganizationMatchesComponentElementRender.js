/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationMatchesComponentElementRender extends Component {
    render( ) {
        return (
            <div style={{
                display: 'inline-block'
            }}>
                <div className={this.props.classes.obliviot_light_match_container}>
                    <div className={this.props.classes.obliviot_light_match_vs_container}>
                        <div className={this.props.classes.obliviot_light_match_vs_image_holder}>
                            <img className={this.props.classes.obliviot_light_match_vs_image} src={this.props.matches_image_1}/>
                        </div>
                        <div className={this.props.classes.obliviot_light_match_vs_score}>{this.props.matches_score}</div>
                        <div className={this.props.classes.obliviot_light_match_vs_image_holder}>
                            <img className={this.props.classes.obliviot_light_match_vs_image} src={this.props.matches_image_2}/>
                        </div>
                    </div>
                    <div className={this.props.classes.obliviot_light_match_vs_date}>{this.props.matches_date}</div>
                    <div className={this.props.classes.obliviot_light_corner_win} style={this.props.win_style}/>
                </div>
            </div>
        )
    }
}

LightOrganizationMatchesComponentElementRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationMatchesComponentElementRender )
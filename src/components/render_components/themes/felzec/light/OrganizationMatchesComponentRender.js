/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationMatchesComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.felzec_matches_container}>
                <div className={this.props.classes.felzec_matches_container} style={this.props.bg_style}></div>
                <div className={this.props.classes.felzec_matches_filter_container} style={this.props.filter_style}/>
                <div className={this.props.classes.felzec_matches_inner_container}>
                    <div className={this.props.classes.felzec_switch_container}>
                        <div className={this.props.classes.felzec_switch_upcoming_container} style={this.props.upcoming_style} onClick={this.props.handleUpcomingClick}>UPCOMING MATCHES</div>
                        <div className={this.props.classes.felzec_switch_recent_container} style={this.props.recent_style} onClick={this.props.handleRecentClick}>LATEST RESULTS</div>
                    </div>
                    <div className={this.props.classes.felzec_match_element_container}>{this.props.recent_matches}</div>
                </div>
            </div>
        )
    }
}

LightOrganizationMatchesComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationMatchesComponentRender )
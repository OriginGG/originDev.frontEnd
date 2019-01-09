/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationMatchesComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.enigma2_matches_container}>
                <div className={this.props.classes.enigma2_matches_container} style={this.props.bg_style}></div>
                <div className={this.props.classes.enigma2_matches_filter_container} style={this.props.filter_style}/>
                <div className={this.props.classes.enigma2_matches_inner_container}>
                    <div style={{
                        padding: '0px'
                    }} className="ui stackable three column grid">
                        <div className="five wide column">
                            <div className={this.props.classes.enigma2_switch_matches_title} style={this.props.switch_title_color}>MATCHES.</div>
                            <div className={this.props.classes.enigma2_switch_matches_description}>RECENT AND UPCOMING</div>
                            <div className={this.props.classes.enigma2_switch_container}>
                                <div className={this.props.classes.enigma2_switch_upcoming_container} style={this.props.upcoming_style} onClick={this.props.handleUpcomingClick}>UPCOMING</div>
                                <div className={this.props.classes.enigma2_switch_recent_container} style={this.props.recent_style} onClick={this.props.handleRecentClick}>RECENT</div>
                            </div>
                        </div>
                        <div className="eleven wide column">
                            <div style={this.props.rm_style}>
                                <div className={this.props.classes.enigma2_match_element_container}>{this.props.recent_matches}</div>
                            </div>
                            <div style={this.props.fm_style}>
                                <div className={this.props.classes.enigma2_match_element_container}>{this.props.future_matches}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

DarkOrganizationMatchesComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationMatchesComponentRender )
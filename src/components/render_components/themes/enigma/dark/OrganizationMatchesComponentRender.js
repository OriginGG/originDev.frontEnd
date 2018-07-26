/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationMatchesComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.darkNavBG}>
                <div id="recent_matches_container" className={this.props.classes.recent_matches_container}>
                    <div style={{
                        paddingTop: '0px'
                    }}>
                        <div className={this.props.classes.dark_section_title_container}>
                            <h2>RECENT MATCHES</h2>
                        </div>
                        <div className={this.props.classes.dark_recent_matches_body}>
                            <div className={this.props.classes.dark_recent_matches_element_title_container}>
                                <div className="ui three column grid">
                                    <div className="column">
                                        <div className={this.props.classes.dark_recent_matches_element_title}>Game</div>
                                    </div>
                                    <div className="column">
                                        <div className={this.props.classes.dark_recent_matches_element_title}>Vs</div>
                                    </div>
                                    <div className="column">
                                        <div className={this.props.classes.dark_recent_matches_element_title}>Score</div>
                                    </div>
                                </div>
                            </div>
                            <div >{this.props.recent_matches}</div>
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
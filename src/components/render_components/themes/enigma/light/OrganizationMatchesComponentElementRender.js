/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationMatchesComponentElementRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.darkNavBG}>
                <div className={this.props.classes.dark_recent_matches_element_container}>
                    <div className="ui three column grid">
                        <div className="column">
                            <img className={this.props.classes.dark_recent_matches_element_image} src={this.props.matches_image_1}/>
                        </div>
                        <div className="column">
                            <img className={this.props.classes.dark_recent_matches_element_image} src={this.props.matches_image_2}/>
                        </div>
                        <div className="column">
                            <div className={this.props.classes.light_recent_matches_element_score}>{this.props.matches_score}</div>
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
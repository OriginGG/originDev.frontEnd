/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationLogoComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.darkBG}>
                <img className={this.props.classes.dark_main_image} src={this.props.image_src}/>
                <div className={this.props.classes.dark_main_image_text_container} style={this.props.roster_style}>
                    <div className={this.props.classes.dark_main_image_text}>{this.props.roster_games}</div>
                </div>
            </div>
        )
    }
}

DarkOrganizationLogoComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationLogoComponentRender )
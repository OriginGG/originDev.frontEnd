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
                <div className={this.props.classes.dark_main_image_text_container}>
                    <div className={this.props.classes.dark_main_image_text}>Call of Duty</div>
                    <div className={this.props.classes.dark_main_image_text}>Halo</div>
                    <div className={this.props.classes.dark_main_image_text}>Ms Pacman</div>
                </div>
            </div>
        )
    }
}

DarkOrganizationLogoComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationLogoComponentRender )
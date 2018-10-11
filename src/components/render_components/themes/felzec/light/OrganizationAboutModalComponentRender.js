/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationAboutModalComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.blankBG}>
                <div className={this.props.classes.felzec_about_header} style={this.props.bg_style}/>
                <div className={this.props.classes.felzec_about_container}>
                    <div className={this.props.classes.felzec_about_container_inner}>
                        <div className={this.props.classes.felzec_about_title}>ABOUT US</div>
                        <div className={this.props.classes.felzec_about_text}>{this.props.about_content}</div>
                    </div>
                    <div className={this.props.classes.felzec_about_container_lower}/>
                </div>
            </div>
        )
    }
}

LightOrganizationAboutModalComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationAboutModalComponentRender )
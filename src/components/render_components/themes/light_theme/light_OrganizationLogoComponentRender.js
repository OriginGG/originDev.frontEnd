/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationLogoComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.organization_container}>
                    <img className={this.props.classes.organization_image_logo} src={this.props.image_src}/>
                    <div className={this.props.classes.organization_type_container}>{this.props.roster_games}</div>
                </div>
            </div>
        )
    }
}

LightOrganizationLogoComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationLogoComponentRender )
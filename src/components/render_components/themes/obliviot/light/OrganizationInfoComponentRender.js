/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationInfoComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.obliviot_light_info_container}>
                    <img className={this.props.classes.obliviot_light_info_image} src={this.props.info_image}/>
                    <div className={this.props.classes.obliviot_light_info_content_container}/>
                    <span >{this.props.info_name}</span>
                </div>
            </div>
        )
    }
}

LightOrganizationInfoComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationInfoComponentRender )
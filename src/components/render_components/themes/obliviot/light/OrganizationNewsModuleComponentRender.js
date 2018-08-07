/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationNewsModuleComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div id="news_container">
                    <div id="organization_news_items" className={this.props.classes.obliviot_light_news_constraint}>{this.props.news_items}</div>
                </div>
            </div>
        )
    }
}

LightOrganizationNewsModuleComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationNewsModuleComponentRender )
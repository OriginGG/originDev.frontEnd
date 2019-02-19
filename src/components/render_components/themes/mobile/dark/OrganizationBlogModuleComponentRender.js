/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationBlogModuleComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div id="news_container">
                    <div id="organization_news_items">{this.props.blog_items}</div>
                </div>
            </div>
        )
    }
}

DarkOrganizationBlogModuleComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationBlogModuleComponentRender )
/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class ObliviotOrganizationNewsModuleComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div id="news_container" className={this.props.classes.obliviot_news_container}>
                    <div className={this.props.classes.section_title_container}>
                        <h2>LATEST NEWS</h2>
                    </div>
                    <div id="organization_news_items">{this.props.news_items}</div>
                </div>
            </div>
        )
    }
}

ObliviotOrganizationNewsModuleComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( ObliviotOrganizationNewsModuleComponentRender )
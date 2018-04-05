/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationNewsComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div id="news_container" className={this.props.classes.news_container}>
                    <div className={this.props.classes.section_title_container}>
                        <h2>LATEST NEWS</h2>
                    </div>
                    <div id="organization_news_items">
                        <div >{this.props.news_items}</div>
                    </div>
                </div>
            </div>
        )
    }
}

LightOrganizationNewsComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationNewsComponentRender )
/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class ObliviotOrganizationAboutModalComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.obliviotBG}>
                <div className="header">
                    <div className={this.props.classes.modal_about_header}>{this.props.about_title}</div>
                </div>
                <div id="modal_news_body" className={this.props.classes.modal_news_body}>
                    <div className={this.props.classes.modal_news_body_text}>{this.props.about_content}</div>
                </div>
            </div>
        )
    }
}

ObliviotOrganizationAboutModalComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( ObliviotOrganizationAboutModalComponentRender )
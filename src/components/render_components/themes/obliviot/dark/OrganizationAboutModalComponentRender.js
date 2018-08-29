/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationAboutModalComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.blankBG}>
                <div className="header">
                    <div className={this.props.classes.dark_modal_about_header}>{this.props.about_title}</div>
                </div>
                <div id="modal_news_body" className={this.props.classes.modal_about_body}>
                    <div className={this.props.classes.dark_modal_news_body_text}>{this.props.about_content}</div>
                </div>
                <div style={{
                    width: '100%',
                    paddingTop: '50px',
                    paddingBottom: '20px'
                }}>
                    <h1 style={{
                        color: 'white'
                    }}>Staff</h1>
                </div>
            </div>
        )
    }
}

DarkOrganizationAboutModalComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationAboutModalComponentRender )
/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationNewsModalComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.darkBG}>
                <div id="about_modal" className="ui modal" style={this.props.extra_style}>
                    <i className="close icon" onClick={this.props.closeModal}/>
                    <div className={this.props.classes.modal_inner}>
                        <div className="header">
                            <div className={this.props.classes.modal_news_header}>
                                <img className={this.props.classes.modal_news_header_image} src={this.props.blog_media}/>
                            </div>
                        </div>
                        <div id="modal_news_body" className={this.props.classes.modal_news_body}>
                            <div className={this.props.classes.modal_news_body_text}>{this.props.blog_content}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LightOrganizationNewsModalComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationNewsModalComponentRender )
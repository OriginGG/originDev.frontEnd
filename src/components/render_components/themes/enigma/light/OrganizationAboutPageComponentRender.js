/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class ObliviotOrganizationAboutPageComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.darkMainBG}>
                <div className={this.props.classes.dark_pageTestContraint}>
                    <header className={this.props.classes.darkHeader}>
                        <div className="container col-sm-12">
                            <marquee behavior="scroll" direction="left" scrollamount="20">
                                <div style={{
                                    width: '274px',
                                    float: 'left'
                                }} className="container col-sm-4">
                                    <img alt="Change Logo" style={{
                                        height: '50px'
                                    }} className={this.props.classes.dark_header_logo}/>
                                </div>
                                <div style={{
                                    width: '274px',
                                    float: 'left'
                                }} className="container col-sm-4">
                                    <img alt="Change Logo" style={{
                                        height: '50px'
                                    }} className={this.props.classes.dark_header_logo}/>
                                </div>
                                <div style={{
                                    width: '274px',
                                    float: 'left'
                                }} className="container col-sm-4">
                                    <img alt="Change Logo" style={{
                                        height: '50px'
                                    }} className={this.props.classes.dark_header_logo}/>
                                </div>
                                <div style={{
                                    width: '274px',
                                    float: 'left'
                                }} className="container col-sm-4">
                                    <img alt="Change Logo" style={{
                                        height: '50px'
                                    }} className={this.props.classes.dark_header_logo}/>
                                </div>
                            </marquee>
                        </div>
                    </header>
                    <div className={this.props.classes.roster_body_container}>
                        <div className="header">
                            <div className={this.props.classes.modal_about_header}>{this.props.about_title}</div>
                        </div>
                        <div id="modal_news_body" className={this.props.classes.modal_about_body}>
                            <div className={this.props.classes.modal_news_body_text}>{this.props.about_content}</div>
                        </div>
                        <div className="header">
                            <div className={this.props.classes.modal_about_header}>
                                Staff
                            </div>
                        </div>
                    </div>
                </div>
                <div className={this.props.classes.orgFooter}>
                    <p className={this.props.classes.orgFooterText}>© Origin. All rights reserved.</p>
                </div>
            </div>
        )
    }
}

ObliviotOrganizationAboutPageComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( ObliviotOrganizationAboutPageComponentRender )
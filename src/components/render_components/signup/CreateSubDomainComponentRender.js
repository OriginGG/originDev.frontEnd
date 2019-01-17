/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class CreateSubDomainComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.signupBGImage}>
                <header className={this.props.classes.signupHeader}>
                    <div className="ui container">
                        <a href="/" className="header item">
                            <img className="logo" src={this.props.header_image_src}/>
                        </a>
                    </div>
                </header>
                <div id="modal_container" className="container">
                    <div id="sign_up" className={this.props.classes.signupModal}>
                        <div className={this.props.classes.subdomain_header}>{this.props.namestring}</div>
                        <div className={this.props.classes.subdomainModalContent}>
                            <form className="ui large form">
                                <div className="ui stacked segment">
                                    <div className={this.props.classes.form_body}>
                                        <div className={this.props.classes.input_title}>{this.props.input_title}</div>
                                        <div className={this.props.classes.domain_video_container}>
                                            <iframe width="100%" height="100%" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" className={this.props.classes.domain_video} frameBorder="0" src={this.props.video1_url}/>
                                        </div>
                                        <div className={this.props.classes.domain_credit_container}>{this.props.payWallContent}</div>
                                        <div className="field" style={this.props.input_style}>
                                            <div className="ui labeled input">
                                                <input type="text" style={{
                                                    backgroundColor: 'transparent',
                                                    borderColor: '#fff',
                                                    color: '#fff',
                                                    height: '45px',
                                                    fontSize: '16px'
                                                }} name="email" placeholder="Create Your Domain" className={this.props.classes.input_box} onChange={this.props.handleDomainChange}/>
                                                <div className="ui label">
                                                    .origin.gg
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{
                                            width: '304px',
                                            height: '78px',
                                            marginLeft: 'auto',
                                            marginRight: 'auto'
                                        }}>
                                            <div >{this.props.submitButton}</div>
                                        </div>
                                    </div>
                                    <div className="ui error message"/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={this.props.classes.signupFooter}>
                        <p className={this.props.classes.signupFooterText}>© Origin. All rights reserved.</p>
                    </div>
                </div>
            </div>
        )
    }
}

CreateSubDomainComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( CreateSubDomainComponentRender )
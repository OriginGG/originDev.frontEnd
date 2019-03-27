/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationFooterMobileComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.felzec_nav_constraint}>
                <div style={{
                    padding: '0px'
                }} className="ui one column grid">
                    <div style={{
                        padding: '0px'
                    }} className="column">
                        <div className={this.props.classes.felzec_footer_inner}>
                            <div className={this.props.classes.felzec_footer_title_left}>About</div>
                            <div className={this.props.classes.felzec_footer_text_left}>{this.props.footer_about}</div>
                            <div className={this.props.classes.felzec_footer_sponsor_container}>
                                <div className="ui four column grid">
                                    <div className="column">
                                        <img className={this.props.classes.felzec_footer_mobile_sponsor_image} src={this.props.sponsor_image_1}/>
                                    </div>
                                    <div className="column">
                                        <img className={this.props.classes.felzec_footer_mobile_sponsor_image} src={this.props.sponsor_image_2}/>
                                    </div>
                                    <div className="column">
                                        <img className={this.props.classes.felzec_footer_mobile_sponsor_image} src={this.props.sponsor_image_3}/>
                                    </div>
                                    <div className="column">
                                        <img className={this.props.classes.felzec_footer_mobile_sponsor_image} src={this.props.sponsor_image_4}/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div style={{
                                    width: '100%'
                                }}>
                                    <div className={this.props.classes.felzec_footer_title_mobile_left}>Support</div>
                                    <div className={this.props.classes.felzec_footer_email_left} onClick={this.props.handleSupportClick}>{this.props.footer_support}</div>
                                </div>
                                <div style={{
                                    width: '100%'
                                }}>
                                    <div className={this.props.classes.felzec_footer_title_mobile_left}>Business enquiries</div>
                                    <div className={this.props.classes.felzec_footer_email_left} onClick={this.props.handleBusinessClick}>{this.props.footer_business}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

DarkOrganizationFooterMobileComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationFooterMobileComponentRender )
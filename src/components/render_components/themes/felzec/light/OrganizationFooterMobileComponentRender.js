/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationFooterComponentRender extends Component {
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
                            <div className="ui two column grid">
                                <div className="column">
                                    <div className={this.props.classes.felzec_footer_title_left}>Support</div>
                                    <div className={this.props.classes.felzec_footer_email_left} onClick={this.props.handleSupportClick}>{this.props.footer_support}</div>
                                </div>
                                <div className="column">
                                    <div className={this.props.classes.felzec_footer_title_right}>Business enquiries</div>
                                    <div className={this.props.classes.felzec_footer_email_right} onClick={this.props.handleBusinessClick}>{this.props.footer_business}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LightOrganizationFooterComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationFooterComponentRender )
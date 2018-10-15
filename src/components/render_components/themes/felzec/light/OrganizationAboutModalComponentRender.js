/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationAboutModalComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.blankBG}>
                <div className={this.props.classes.felzec_about_header} style={this.props.bg_style}/>
                <div className={this.props.classes.felzec_about_container}>
                    <div className={this.props.classes.felzec_about_container_inner}>
                        <div className={this.props.classes.felzec_about_title}>ABOUT US</div>
                        <div className={this.props.classes.felzec_about_text}>{this.props.about_content}</div>
                    </div>
                    <div className={this.props.classes.felzec_about_container_lower}>
                        <div className="ui stackable two column grid">
                            <div className="column">
                                <div className={this.props.classes.felzec_lower_about_title}>CONTACT US</div>
                                <div className={this.props.classes.felzec_lower_about_text}>If you want to contact us you can always send us an email</div>
                            </div>
                            <div className="column">
                                <div className={this.props.classes.felzec_lower_email_button}>
                                    <div className={this.props.classes.felzec_about_email_title}>SUPPORT</div>
                                    <div className={this.props.classes.felzec_about_email_text} onClick={this.props.handleSupportClick}>{this.props.about_support_email}</div>
                                </div>
                                <div className={this.props.classes.felzec_lower_email_button}>
                                    <div className={this.props.classes.felzec_about_email_title}>MANAGEMENT</div>
                                    <div className={this.props.classes.felzec_about_email_text} onClick={this.props.handleBusinessClick}>{this.props.about_business_email}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={this.props.classes.felzec_staff_container}>
                    <div className={this.props.classes.felzec_staff_container} style={this.props.staff_style}></div>
                    <div className={this.props.classes.felzec_staff_filter_container} style={this.props.filter_style}/>
                    <div className={this.props.classes.felzec_staff_inner_container}>
                        <div className={this.props.classes.felzec_coworker_container}>{this.props.about_staff}</div>
                    </div>
                </div>
            </div>
        )
    }
}

LightOrganizationAboutModalComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationAboutModalComponentRender )
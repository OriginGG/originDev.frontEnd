/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationEmailComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.org_email_container} style={this.props.org_email_container}>
                    <div className={this.props.classes.org_email_data_container}>
                        <div className={this.props.classes.org_email_close} onClick={this.props.handleCustomerEmailClose}>X</div>
                        <div className={this.props.classes.org_email_data_title}>Let's Connect</div>
                        <div className={this.props.classes.org_email_data_subtitle}>Join our fans who enjoy news weekly</div>
                        <div className={this.props.classes.org_email_data_input_container}>
                            <input placeholder="Enter your email here ..." className={this.props.classes.org_email_data_input} value={this.props.customer_email_value} onChange={e => {
                                this
                                    .props
                                    .handleEmailChange( e );
                            }}/>
                            <div className={this.props.classes.org_email_data_button} style={this.props.org_email_button} onClick={this.props.handleCustomerEmailSubmit}>Sign Up</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LightOrganizationEmailComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationEmailComponentRender )
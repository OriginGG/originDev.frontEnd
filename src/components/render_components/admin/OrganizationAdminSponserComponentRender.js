/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationAdminSponserComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.admin_title_box}>
                    <h2>Add Sponsors</h2>
                </div>
                <div className={this.props.classes.admin_social_box}>
                    <div >{this.props.sponsor_element1}</div>
                    <div >{this.props.sponsor_element2}</div>
                    <div >{this.props.sponsor_element3}</div>
                    <div >{this.props.sponsor_element4}</div>
                </div>
                <div className={this.props.classes.admin_submit_box}>
                    <div className={this.props.classes.admin_submit_button} onClick={this.props.handleSubmit}>Submit</div>
                </div>
            </div>
        )
    }
}

OrganizationAdminSponserComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminSponserComponentRender )
/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationSponserComponentRender extends Component {
    render( ) {
        return (
            <div >{this.props.sponsor_content}</div>
        )
    }
}

OrganizationSponserComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationSponserComponentRender )
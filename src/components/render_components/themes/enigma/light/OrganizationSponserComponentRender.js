/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class ObliviotOrganizationSponserComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.obliviotBG}>
                <div className="container col-sm-12">{this.props.sponsor_content}</div>
            </div>
        )
    }
}

ObliviotOrganizationSponserComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( ObliviotOrganizationSponserComponentRender )
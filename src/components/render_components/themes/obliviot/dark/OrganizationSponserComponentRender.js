/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationSponserComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div style={{
                    marginTop: '30px'
                }} className="ui stackable four column grid">{this.props.sponsor_content}</div>
            </div>
        )
    }
}

DarkOrganizationSponserComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationSponserComponentRender )
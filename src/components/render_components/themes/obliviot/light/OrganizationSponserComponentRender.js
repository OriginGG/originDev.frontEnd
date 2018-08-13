/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationSponserComponentRender extends Component {
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

LightOrganizationSponserComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationSponserComponentRender )
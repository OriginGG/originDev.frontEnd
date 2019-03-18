/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationSponserComponentElementRender extends Component {
    render( ) {
        return (
            <div>
                <div style={{
                    minWidth: '25%',
                    float: 'center'
                }} onClick={this.props.handleClick}>
                    <img alt="Change Logo" className={this.props.classes.felzec_header_logo} src={this.props.sponsor_image}/>
                </div>
            </div>
        )
    }
}

LightOrganizationSponserComponentElementRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationSponserComponentElementRender )
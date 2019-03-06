/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationSponserComponentElementRender extends Component {
    render( ) {
        return (
            <div>
                <div style={{
                    minWidth: '25%',
                    float: 'center'
                }} onClick={this.props.handleClick}>
                    <img alt="Change Logo" style={{
                        height: '35px'
                    }} className={this.props.classes.header_logo} src={this.props.sponsor_image} style={this.props.spons_style}/>
                </div>
            </div>
        )
    }
}

DarkOrganizationSponserComponentElementRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationSponserComponentElementRender )
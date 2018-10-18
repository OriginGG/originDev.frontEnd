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
                    width: '25%',
                    float: 'left'
                }} className="container col-sm-4" onClick={this.props.handleClick}>
                    <img alt="Change Logo" style={{
                        width: '100%',
                        height: '100%'
                    }} className={this.props.classes.header_logo} src={this.props.sponsor_image}/>
                </div>
            </div>
        )
    }
}

LightOrganizationSponserComponentElementRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationSponserComponentElementRender )
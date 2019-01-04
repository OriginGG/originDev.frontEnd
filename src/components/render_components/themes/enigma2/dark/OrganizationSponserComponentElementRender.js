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
                    width: '25%',
                    float: 'left'
                }} className="container col-sm-4" onClick={this.props.handleClick}>
                    <img alt="Change Logo" className={this.props.classes.felzec_header_logo} src={this.props.sponsor_image}/>
                </div>
            </div>
        )
    }
}

DarkOrganizationSponserComponentElementRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationSponserComponentElementRender )
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
                    width: '274px',
                    float: 'left'
                }} className="container col-sm-4" onClick={this.props.handleClick}>
                    <img alt="Change Logo" style={{
                        height: '35px'
                    }} className={this.props.classes.header_logo} src={this.props.sponsor_image}/>
                </div>
            </div>
        )
    }
}

DarkOrganizationSponserComponentElementRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationSponserComponentElementRender )
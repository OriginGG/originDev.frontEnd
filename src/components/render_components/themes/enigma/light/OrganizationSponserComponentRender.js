/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class ObliviotOrganizationSponserComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.obliviotBG}>
                <div style={{
                    width: '274px',
                    float: 'left'
                }} className="container col-sm-4">
                    <img alt="Change Logo" style={{
                        height: '75px'
                    }} className={this.props.classes.header_logo} src={this.props.sponsor_image1}/>
                </div>
            </div>
        )
    }
}

ObliviotOrganizationSponserComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( ObliviotOrganizationSponserComponentRender )
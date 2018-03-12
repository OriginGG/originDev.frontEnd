/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationSponserComponentRender extends Component {
    render( ) {
        return (
            <div>
                <marquee behavior="scroll" direction="left" scrollamount="20">
                    <div style={{
                        width: '274px',
                        float: 'left'
                    }} className="container col-sm-4">
                        <img alt="Change Logo" style={{
                            height: '35px'
                        }} className={this.props.classes.header_logo} src={this.props.sponsor_image1}/>
                    </div>
                    <div style={{
                        width: '274px',
                        float: 'left'
                    }} className="container col-sm-4">
                        <img alt="Change Logo" style={{
                            height: '35px'
                        }} className={this.props.classes.header_logo} src={this.props.sponsor_image2}/>
                    </div>
                    <div style={{
                        width: '274px',
                        float: 'left'
                    }} className="container col-sm-4">
                        <img alt="Change Logo" style={{
                            height: '35px'
                        }} className={this.props.classes.header_logo} src={this.props.sponsor_image3}/>
                    </div>
                    <div style={{
                        width: '274px',
                        float: 'left'
                    }} className="container col-sm-4">
                        <img alt="Change Logo" style={{
                            height: '35px'
                        }} className={this.props.classes.header_logo} src={this.props.sponsor_image4}/>
                    </div>
                </marquee>
            </div>
        )
    }
}

OrganizationSponserComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationSponserComponentRender )
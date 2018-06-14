/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class ObliviotOrganizationSponserComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.obliviotBG}>
                <div className="container col-sm-12">
                    <marquee behavior="scroll" direction="left" scrollamount="20">
                        <div style={{
                            width: '274px',
                            float: 'left'
                        }} className="container col-sm-4">
                            <img alt="Change Logo" style={{
                                height: '75px'
                            }} className={this.props.classes.header_logo} src={this.props.sponsor_image1}/>
                        </div>
                        <div style={{
                            width: '274px',
                            float: 'left'
                        }} className="container col-sm-4">
                            <img alt="Change Logo" style={{
                                height: '75px'
                            }} className={this.props.classes.header_logo} src={this.props.sponsor_image2}/>
                        </div>
                        <div style={{
                            width: '274px',
                            float: 'left'
                        }} className="container col-sm-4">
                            <img alt="Change Logo" style={{
                                height: '75px'
                            }} className={this.props.classes.header_logo} src={this.props.sponsor_image3}/>
                        </div>
                        <div style={{
                            width: '274px',
                            float: 'left'
                        }} className="container col-sm-4">
                            <img alt="Change Logo" style={{
                                height: '75px'
                            }} className={this.props.classes.header_logo} src={this.props.sponsor_image4}/>
                        </div>
                    </marquee>
                </div>
            </div>
        )
    }
}

ObliviotOrganizationSponserComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( ObliviotOrganizationSponserComponentRender )
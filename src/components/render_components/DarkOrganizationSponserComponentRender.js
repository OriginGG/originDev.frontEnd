/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationSponserComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.darkBG}>
                <div className="container col-sm-12">
                    <marquee behavior="scroll" direction="left" scrollamount="20">
                        <div style={{
                            width: '274px',
                            float: 'left'
                        }} className="container col-sm-4">
                            <img alt="Change Logo" style={{
                                height: '75px'
                            }} className={this.props.classes.header_logo}/>
                        </div>
                        <div style={{
                            width: '274px',
                            float: 'left'
                        }} className="container col-sm-4">
                            <img alt="Change Logo" style={{
                                height: '75px'
                            }} className={this.props.classes.header_logo}/>
                        </div>
                        <div style={{
                            width: '274px',
                            float: 'left'
                        }} className="container col-sm-4">
                            <img alt="Change Logo" style={{
                                height: '75px'
                            }} className={this.props.classes.header_logo}/>
                        </div>
                        <div style={{
                            width: '274px',
                            float: 'left'
                        }} className="container col-sm-4">
                            <img alt="Change Logo" style={{
                                height: '75px'
                            }} className={this.props.classes.header_logo}/>
                        </div>
                    </marquee>
                </div>
            </div>
        )
    }
}

DarkOrganizationSponserComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationSponserComponentRender )
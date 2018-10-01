/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationSponsersPageComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.lightMainBG}>
                <div className={this.props.classes.light_pageTestContraint}>
                    <header className={this.props.classes.lightHeader}>
                        <div className="container col-sm-12">
                            <marquee behavior="scroll" direction="left" scrollamount="20">
                                <div style={{
                                    width: '274px',
                                    float: 'left'
                                }} className="container col-sm-4">
                                    <img alt="Change Logo" style={{
                                        height: '50px'
                                    }} className={this.props.classes.light_header_logo}/>
                                </div>
                                <div style={{
                                    width: '274px',
                                    float: 'left'
                                }} className="container col-sm-4">
                                    <img alt="Change Logo" style={{
                                        height: '50px'
                                    }} className={this.props.classes.light_header_logo}/>
                                </div>
                                <div style={{
                                    width: '274px',
                                    float: 'left'
                                }} className="container col-sm-4">
                                    <img alt="Change Logo" style={{
                                        height: '50px'
                                    }} className={this.props.classes.light_header_logo}/>
                                </div>
                                <div style={{
                                    width: '274px',
                                    float: 'left'
                                }} className="container col-sm-4">
                                    <img alt="Change Logo" style={{
                                        height: '50px'
                                    }} className={this.props.classes.light_header_logo}/>
                                </div>
                            </marquee>
                        </div>
                    </header>
                    <div className={this.props.classes.roster_body_container}></div>
                </div>
                <div className={this.props.classes.orgFooter}>
                    <p className={this.props.classes.orgFooterText}>© Origin. All rights reserved.</p>
                </div>
            </div>
        )
    }
}

LightOrganizationSponsersPageComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationSponsersPageComponentRender )
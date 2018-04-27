/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class ObliviotOrganizationMobileNavComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.obliviotNavBG}>
                <div className={this.props.classes.obliviot_mobile_nav_container}>
                    <div className={this.props.classes.obliviot_mobile_nav_left}>
                        <img id="nav_img" alt="" className={this.props.classes.obliviot_nav_mobile_img} src={this.props.image_src}/>
                    </div>
                    <div className={this.props.classes.obliviot_mobile_nav_right}>
                        <i className="fa fa-bars"/>
                    </div>
                </div>
            </div>
        )
    }
}

ObliviotOrganizationMobileNavComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( ObliviotOrganizationMobileNavComponentRender )
/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationNavComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.nav_left}>
                    <div className={this.props.classes.nav_header}>
                        <img id="nav_img" alt="" className={this.props.classes.nav_img} src={this.props.image_src}/>
                    </div>
                    <div className={this.props.classes.social_menu_container}>{this.props.social_links}</div>
                </div>
                <div className={this.props.classes.nav_right}>
                    <div className={this.props.classes.org_menu_container}>
                        <div id="nav_mobile" className={this.props.classes.org_hidden_menu_item}><i className="sidebar icon"/></div>
                        <div id="nav_login" className={this.props.classes.org_menu_item} onClick={this.props.handleLoginClick}>Login</div>
                        <div id="nav_store" className={this.props.classes.org_menu_item} style={this.props.store_style} onClick={this.props.handleStoreClick}>Store</div>
                        <div id="nav_about" className={this.props.classes.org_menu_item} style={this.props.about_style} onClick={this.props.handleAboutClick}>About</div>
                        <div id="nav_home" className={this.props.classes.org_menu_item}>Home</div>
                    </div>
                </div>
                <div id="modal_about"></div>
            </div>
        )
    }
}

LightOrganizationNavComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationNavComponentRender )
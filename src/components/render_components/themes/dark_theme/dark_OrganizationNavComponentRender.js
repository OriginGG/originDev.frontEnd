/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationNavComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.darkBG}>
                <div className="ui stackable three column grid">
                    <div className="column">
                        <div className={this.props.classes.nav_left}>
                            <div className={this.props.classes.dark_social_menu_container}>{this.props.social_links}</div>
                        </div>
                    </div>
                    <div className="column">
                        <div className={this.props.classes.dark_nav_center}>
                            <div className={this.props.classes.dark_nav_header}>
                                <img id="nav_img" alt="" className={this.props.classes.dark_nav_img} src={this.props.image_src}/>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className={this.props.classes.dark_nav_right}>
                            <div className={this.props.classes.dark_org_menu_container}>
                                <a href="#">
                                    <div id="menu_login" className={this.props.classes.org_menu_dark_item}>Login</div>
                                </a>
                                <a href="#">
                                    <div id="menu_store" className={this.props.classes.org_menu_dark_item} style={this.props.store_style} onClick={this.props.handleStoreClick}>Store</div>
                                </a>
                                <a href="#">
                                    <div id="menu_about" className={this.props.classes.org_menu_dark_item} style={this.props.about_style} onClick={this.props.handleAboutClick}>About</div>
                                </a>
                                <a href="#home_cont">
                                    <div id="menu_home" className={this.props.classes.org_menu_dark_item}>Home</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

DarkOrganizationNavComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationNavComponentRender )
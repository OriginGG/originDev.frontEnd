/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class ObliviotOrganizationNavComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.obliviotNavBG}>
                <div className="ui stackable three column grid">
                    <div className="column">
                        <div className={this.props.classes.nav_left}>
                            <div className={this.props.classes.obliviot_social_menu_container}>
                                <div className={this.props.classes.obliviot_social_menu_item}>{this.props.social_link1}</div>
                                <div className={this.props.classes.obliviot_social_menu_item}>{this.props.social_link2}</div>
                                <div className={this.props.classes.obliviot_social_menu_item}>{this.props.social_link3}</div>
                                <div className={this.props.classes.obliviot_social_menu_item}>{this.props.social_link4}</div>
                                <div className={this.props.classes.obliviot_social_menu_item}>{this.props.social_link5}</div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className={this.props.classes.obliviot_nav_center}>
                            <div className={this.props.classes.obliviot_nav_header}>
                                <img id="nav_img" alt="" className={this.props.classes.obliviot_nav_img} src={this.props.image_src}/>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className={this.props.classes.obliviot_nav_right}>
                            <div className={this.props.classes.obliviot_org_menu_container}>
                                <a>
                                    <div id="menu_login" className={this.props.classes.org_menu_obliviot_item} onClick={this.props.handleLoginClick}>Login</div>
                                </a>
                                <a>
                                    <div id="menu_store" className={this.props.classes.org_menu_obliviot_item} style={this.props.store_style} onClick={this.props.handleStoreClick}>Store</div>
                                </a>
                                <a>
                                    <div id="menu_about" className={this.props.classes.org_menu_obliviot_item} style={this.props.about_style} onClick={this.props.handleAboutClick}>About</div>
                                </a>
                                <a href="#home_cont">
                                    <div id="menu_home" className={this.props.classes.org_menu_obliviot_item} style={this.props.home_style}>Home</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ObliviotOrganizationNavComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( ObliviotOrganizationNavComponentRender )
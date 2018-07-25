/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationNavComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className="ui stackable two column grid">
                    <div className="six wide column">
                        <img className={this.props.classes.obliviot_darkLogo} src={this.props.image_src}/>
                        <div className={this.props.classes.obliviot_dark_social_menu_container}>
                            <div className={this.props.classes.obliviot_dark_social_menu_item}>{this.props.social_link1}</div>
                            <div className={this.props.classes.obliviot_dark_social_menu_item}>{this.props.social_link2}</div>
                            <div className={this.props.classes.obliviot_dark_social_menu_item}>{this.props.social_link3}</div>
                            <div className={this.props.classes.obliviot_dark_social_menu_item}>{this.props.social_link4}</div>
                            <div className={this.props.classes.obliviot_dark_social_menu_item}>{this.props.social_link5}</div>
                        </div>
                    </div>
                    <div className="ten wide column">
                        <div className={this.props.classes.obliviot_nav_right}>
                            <div className={this.props.classes.obliviot_org_menu_dark_container}>
                                <a href="#video_cont">
                                    <div id="menu_login" className={this.props.classes.org_menu_obliviot_dark_item} onClick={this.props.handleLoginClick}>Login</div>
                                </a>
                                <a href="#news_cont">
                                    <div id="menu_news" className={this.props.classes.org_menu_obliviot_dark_item} style={this.props.store_style} onClick={this.props.handleStoreClick}>Store</div>
                                </a>
                                <a href="#">
                                    <div id="sponsers_button" className={this.props.classes.org_menu_obliviot_dark_item} style={this.props.sponsers_style} onClick={this.props.handleSponsersClick}>Sponsers</div>
                                </a>
                                <a href="#">
                                    <div id="about_button" className={this.props.classes.org_menu_obliviot_dark_item} style={this.props.about_style} onClick={this.props.handleAboutClick}>About</div>
                                </a>
                                <a href="#">
                                    <div id="news_button" className={this.props.classes.org_menu_obliviot_dark_item}>News</div>
                                </a>
                                <a href="#home_cont">
                                    <div id="menu_home" className={this.props.classes.org_menu_obliviot_dark_item} style={this.props.home_style}>Home</div>
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
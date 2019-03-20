/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationNavComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.felzec_nav_constraint}>
                    <div style={{
                        padding: '0px'
                    }} className="ui stackable three column grid">
                        <div style={{
                            padding: '0px'
                        }} className="seven wide column">
                            <div className={this.props.classes.obliviot_light_social_menu_container}>
                                <div className={this.props.classes.felzec_light_social_menu_item}>{this.props.social_link1}</div>
                                <div className={this.props.classes.felzec_light_social_menu_item}>{this.props.social_link2}</div>
                                <div className={this.props.classes.felzec_light_social_menu_item}>{this.props.social_link3}</div>
                                <div className={this.props.classes.felzec_light_social_menu_item}>{this.props.social_link4}</div>
                                <div className={this.props.classes.felzec_light_social_menu_item}>{this.props.social_link5}</div>
                                <div className={this.props.classes.felzec_light_social_menu_item}>{this.props.social_link6}</div>
                            </div>
                        </div>
                        <div style={{
                            padding: '0px'
                        }} className="two wide column">
                            <div className={this.props.classes.felzec_light_nav_logo_holder}>
                                <img className={this.props.classes.felzec_light_nav_logo} src={this.props.nav_logo}/>
                            </div>
                        </div>
                        <div style={{
                            padding: '0px'
                        }} className="seven wide column">
                            <div className={this.props.classes.obliviot_nav_right}>
                                <div className={this.props.classes.felzec_light_navicon_menu_item}>{this.props.navicon}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={this.props.classes.felzec_menu_container} style={this.props.felzec_menu_style}>
                    <div className={this.props.classes.obliviot_org_menu_light_container}>
                        <div id="menu_login" className={this.props.classes.org_menu_felzec_light_item} onClick={this.props.handleLoginClick}>Login</div>
                        <div id="menu_news" className={this.props.classes.org_menu_felzec_light_item} style={this.props.store_style} onClick={this.props.handleStoreClick}>Store</div>
                        <div id="sponsers_button" className={this.props.classes.org_menu_felzec_light_item} style={this.props.sponsers_style} onClick={this.props.handleSponsersClick}>Sponsors</div>
                        <div id="news_button" className={this.props.classes.org_menu_felzec_light_item} style={this.props.news_style} onClick={this.props.handleViewBlogClick}>News</div>
                        <div id="about_button" className={this.props.classes.org_menu_felzec_light_item} style={this.props.about_style} onClick={this.props.handleAboutClick}>About</div>
                        <a href="#home_cont">
                            <div id="menu_home" className={this.props.classes.org_menu_felzec_light_item} style={this.props.home_style}>Home</div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

LightOrganizationNavComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationNavComponentRender )
/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationFooterComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.felzec_nav_constraint}>
                <div style={{
                    padding: '0px'
                }} className="ui stackable three column grid">
                    <div style={{
                        padding: '0px'
                    }} className="eight wide column">
                        <div className={this.props.classes.felzec_footer_inner}>
                            <div className={this.props.classes.felzec_footer_title_left}>About</div>
                            <div className={this.props.classes.felzec_footer_text_left}>{this.props.footer_about}</div>
                            <div className="ui stackable two column grid">
                                <div className="column">
                                    <div className={this.props.classes.felzec_footer_title_left}>Support</div>
                                    <div className={this.props.classes.felzec_footer_email_left}>{this.props.footer_support}</div>
                                </div>
                                <div className="column">
                                    <div className={this.props.classes.felzec_footer_title_right}>Business enquiries</div>
                                    <div className={this.props.classes.felzec_footer_text_right}>{this.props.footer_business}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="five wide column">
                        <div className={this.props.classes.felzec_footer_title_left}>Latest Posts</div>
                        <div >{this.props.blog_items}</div>
                    </div>
                    <div style={{
                        padding: '0px'
                    }} className="three wide column">
                        <div className={this.props.classes.felzec_footer_title_right}>Menu</div>
                        <div id="menu_home" className={this.props.classes.footer_menu_felzec_light_item} style={this.props.home_style}>Home</div>
                        <div id="about_button" className={this.props.classes.footer_menu_felzec_light_item} style={this.props.about_style} onClick={this.props.handleAboutClick}>About</div>
                        <div id="news_button" className={this.props.classes.footer_menu_felzec_light_item} style={this.props.news_style} onClick={this.props.handleViewBlogClick}>News</div>
                        <div id="sponsers_button" className={this.props.classes.footer_menu_felzec_light_item} style={this.props.sponsers_style} onClick={this.props.handleSponsersClick}>Sponsors</div>
                        <div id="menu_blog" className={this.props.classes.footer_menu_felzec_light_item} style={this.props.blog_style} onClick={this.props.handleBlogClick}>Blog</div>
                        <div id="menu_news" className={this.props.classes.footer_menu_felzec_light_item} style={this.props.store_style} onClick={this.props.handleStoreClick}>Store</div>
                        <div id="menu_login" className={this.props.classes.footer_menu_felzec_light_item} onClick={this.props.handleLoginClick}>Login</div>
                    </div>
                </div>
            </div>
        )
    }
}

LightOrganizationFooterComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationFooterComponentRender )
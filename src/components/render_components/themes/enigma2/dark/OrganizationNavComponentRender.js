/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationNavComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.enigma2_nav_constraint}>
                <div style={{
                    padding: '0px'
                }} className="ui stackable three column grid">
                    <div style={{
                        padding: '0px'
                    }} className="three wide column">
                        <div style={{
                            height: '80px',
                            maxWidth: '50%',
                            float: 'left'
                        }}>
                            <img className={this.props.classes.enigma2_darkLogo} src={this.props.image_src}/>
                        </div>
                    </div>
                    <div style={{
                        padding: '0px',
                        display: 'flex',
                        justifyContent: 'left'
                    }} className="ten wide column">
                        <div className={this.props.classes.obliviot_org_menu_light_container}>
                            <div id="menu_login" className={this.props.classes.org_menu_enigma2_light_item} onClick={this.props.handleLoginClick}>Login</div>
                            <div id="menu_news" className={this.props.classes.org_menu_enigma2_light_item} style={this.props.enigma2_store_style} onClick={this.props.handleStoreClick}>Store</div>
                            <div id="sponsers_button" className={this.props.classes.org_menu_enigma2_light_item} style={this.props.enigma2_sponsers_style} onClick={this.props.handleSponsersClick}>Sponsors</div>
                            <div id="news_button" className={this.props.classes.org_menu_enigma2_light_item} style={this.props.enigma2_news_style} onClick={this.props.handleViewBlogClick}>News</div>
                            <div id="about_button" className={this.props.classes.org_menu_enigma2_light_item} style={this.props.enigma2_about_style} onClick={this.props.handleAboutClick}>About</div>
                            <div id="menu_home" className={this.props.classes.org_menu_enigma2_light_item} style={this.props.enigma2_home_style} onClick={this.props.handleHomeClick}>Home</div>
                        </div>
                    </div>
                    <div style={{
                        padding: '0px'
                    }} className="three wide column">
                        <div className={this.props.classes.obliviot_light_social_menu_container}>
                            <div className={this.props.classes.enigma2_light_social_menu_item}>{this.props.social_link1}</div>
                            <div className={this.props.classes.enigma2_light_social_menu_item}>{this.props.social_link2}</div>
                            <div className={this.props.classes.enigma2_light_social_menu_item}>{this.props.social_link3}</div>
                            <div className={this.props.classes.enigma2_light_social_menu_item}>{this.props.social_link4}</div>
                            <div className={this.props.classes.enigma2_light_social_menu_item}>{this.props.social_link5}</div>
                            <div className={this.props.classes.enigma2_light_social_menu_item}>{this.props.social_link6}</div>
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
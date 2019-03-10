/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationPageComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.darkMainBG}>
                <div className={this.props.classes.dark_pageTestContraint}>
                    <header className={this.props.classes.newDarkHeader}>
                        <div id="dark_header">
                            <div >{this.props.topSponsorContent}</div>
                        </div>
                    </header>
                    <div className={this.props.classes.body_container}>
                        <div id="home_cont" className={this.props.classes.dark_nav_container}>
                            <div >{this.props.navContent}</div>
                        </div>
                        <div id="logo_cont" className={this.props.classes.dark_main_image_container}>
                            <div >{this.props.logoContent}</div>
                        </div>
                        <div id="theme_about_modal"></div>
                        <div id="roster_component">{this.props.rosterContent}</div>
                        <div id="#news_cont" className="ui stackable three column grid">
                            <div id="news_component" className="column">
                                <div >{this.props.newsContent}</div>
                            </div>
                            <div id="twitter_compontent" className="column">
                                <div >{this.props.twitterContent}</div>
                            </div>
                            <div id="matches_component" className="column">
                                <div >{this.props.matchesContent}</div>
                            </div>
                        </div>
                        <div id="video_cont" className={this.props.classes.dark_media_container}>
                            <div >{this.props.videoContent}</div>
                        </div>
                    </div>
                    <div id="email_component">{this.props.emailContent}</div>
                </div>
                <div className={this.props.classes.orgFooter} style={this.props.footer_style}>
                    <p className={this.props.classes.orgFooterText}>{this.props.copyright}</p>
                </div>
                <div className={this.props.classes.universal_footer_dark}>Website by
                    <span style={{
                        cursor: 'pointer',
                        marginLeft: '5px'
                    }} onClick={this.props.handleWebClick}>
                        OriginGG</span>
                </div>
            </div>
        )
    }
}

DarkOrganizationPageComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationPageComponentRender )
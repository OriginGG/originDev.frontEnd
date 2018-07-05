/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class ObliviotOrganizationPageComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.obliviotMainBG}>
                <div className={this.props.classes.obliviot_pageTestContraint}>
                    <header className={this.props.classes.obliviotHeader}>
                        <div id="obliviot_header">
                            <div >{this.props.topSponsorContent}</div>
                        </div>
                    </header>
                    <div className={this.props.classes.body_container}>
                        <div id="home_cont" className={this.props.classes.obliviot_nav_container}>
                            <div >{this.props.navContent}</div>
                        </div>
                        <div id="logo_cont" className={this.props.classes.obliviot_main_image_container}>
                            <div >{this.props.logoContent}</div>
                        </div>
                        <div id="theme_about_modal"></div>
                        <div id="roster_component">{this.props.rosterContent}</div>
                    </div>
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
                    <div id="video_cont" className={this.props.classes.obliviot_media_container}>
                        <div >{this.props.videoContent}</div>
                    </div>
                </div>
                <div className={this.props.classes.orgFooter} style={this.props.footer_style}>
                    <p className={this.props.classes.orgFooterText}>{this.props.copyright}</p>
                </div>
            </div>
        )
    }
}

ObliviotOrganizationPageComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( ObliviotOrganizationPageComponentRender )
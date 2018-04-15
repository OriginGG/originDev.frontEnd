/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationPageComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.organizationTestBG}>
                <div className={this.props.classes.pageTestContraint}>
                    <header className={this.props.classes.organizationHeader}>
                        <div id="organization_sponsers" className="container col-sm-12">
                            <div >{this.props.topSponsorContent}</div>
                        </div>
                    </header>
                    <div className={this.props.classes.body_container}>
                        <div id="organization_nav_logo" className={this.props.classes.nav_container}>
                            <div >{this.props.navContent}</div>
                        </div>
                        <div id="organization_main_logo">
                            <div >{this.props.logoContent}</div>
                        </div>
                        <div className={this.props.classes.powered_by}>
                            <img/>
                        </div>
                        <div className={this.props.classes.news_main_container}>
                            <div id="news_component">
                                <div >{this.props.newsContent}</div>
                            </div>
                            <div className={this.props.classes.social_news_container}>
                                <div >{this.props.twitterContent}</div>
                                <div id="recent_matches_container" className={this.props.classes.recent_matches_container}>
                                    <div >{this.props.matchesContent}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="organization_video_feed">
                        <div >{this.props.videoContent}</div>
                    </div>
                    <div className={this.props.classes.organizationFooter}>
                        <div id="organization_sponsers_footer" className="container col-sm-12">
                            <div >{this.props.bottomSponsorContent}</div>
                        </div>
                    </div>
                    <div className={this.props.classes.orgFooter} style={this.props.footer_style}>
                        <p className={this.props.classes.orgFooterText}>© Origin. All rights reserved.</p>
                    </div>
                </div>
            </div>
        )
    }
}

LightOrganizationPageComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationPageComponentRender )
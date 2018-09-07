/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationPageComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.lightObliotBG}>
                <div>
                    <img id="bg_img" alt="" className={this.props.classes.obliviot_light_bg_img}/>
                    <div className={this.props.classes.obliviot_light_bg_filter} style={this.props.obliviot_page_style}/>
                    <div className={this.props.classes.obliviot_lightContraint}>
                        <header className={this.props.classes.obliviot_lightHeader}>
                            <div >{this.props.navContent}</div>
                        </header>
                        <div id="sponsors">{this.props.topSponsorContent}</div>
                        <div id="roster_component" style={{
                            paddingTop: '30px'
                        }}>{this.props.rosterContent}</div>
                        <div className={this.props.classes.obliviot_lightBlogContainer}>
                            <div >{this.props.blogContent}</div>
                        </div>
                        <div className={this.props.classes.obliviot_light_section_control_container} style={this.props.obliviot_hidden_style}>
                            <div className={this.props.classes.obliviot_light_section_divider}/>
                            <div className={this.props.classes.obliviot_light_section_title}>STREAMS</div>
                            <div className={this.props.classes.obliviot_light_section_view_more}>VIEW MORE</div>
                        </div>
                        <div className={this.props.classes.obliviot_light_twitch_container}>
                            <div >{this.props.twitchContent}</div>
                        </div>
                        <div style={this.props.obliviot_hidden_style}>
                            <div className="ui stackable two column grid">
                                <div className="ten wide column">
                                    <div className={this.props.classes.obliviot_light_section_control_container}>
                                        <div className={this.props.classes.obliviot_light_section_divider}/>
                                        <div className={this.props.classes.obliviot_light_section_title}>NEWS</div>
                                        <div className={this.props.classes.obliviot_light_section_view_more}>VIEW MORE</div>
                                    </div>
                                    <div id="news_div" className={this.props.classes.obliviot_light_news_outer_constraint}>
                                        <div>
                                            <div >{this.props.newsContent}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="six wide column">
                                    <div className={this.props.classes.obliviot_light_section_control_container}>
                                        <div className={this.props.classes.obliviot_light_section_divider}/>
                                        <div className={this.props.classes.obliviot_light_section_title}>VIDEOS</div>
                                        <div className={this.props.classes.obliviot_light_section_view_more}>VIEW MORE</div>
                                    </div>
                                    <div id="video_div">
                                        <div >{this.props.videoContent}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={this.props.classes.obliviot_light_section_control_container} style={this.props.obliviot_hidden_style}>
                            <div className={this.props.classes.obliviot_light_section_divider}/>
                            <div className={this.props.classes.obliviot_light_section_title}>MATCHES</div>
                            <div className={this.props.classes.obliviot_light_section_view_more}>VIEW MORE</div>
                        </div>
                        <div id="matches_container">{this.props.matchesContent}</div>
                        <footer className={this.props.classes.obliviot_darkHeader}>
                            <div >{this.props.navContent}</div>
                        </footer>
                    </div>
                    <div className={this.props.classes.obliviot_orgFooter}>
                        <p className={this.props.classes.obliviot_orgFooterText}>© Origin. All rights reserved.</p>
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
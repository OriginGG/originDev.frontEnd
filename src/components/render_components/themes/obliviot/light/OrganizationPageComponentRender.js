/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationPageComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.lightObliotBG}>
                <div className={this.props.classes.light_pageTestContraint}>
                    <img id="bg_img" alt="" className={this.props.classes.obliviot_light_bg_img}/>
                    <div className={this.props.classes.obliviot_light_bg_filter} style={this.props.obliviot_page_style}/>
                    <div className={this.props.classes.obliviot_lightContraint}>
                        <header className={this.props.classes.obliviot_lightHeader}>
                            <div >{this.props.navContent}</div>
                        </header>
                        <div id="sponsors">{this.props.topSponsorContent}</div>
                        <div id="roster_component">{this.props.rosterContent}</div>
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
                        <div >{this.props.newsObliviotContent}</div>
                        <div className={this.props.classes.obliviot_light_section_control_container} style={this.props.obliviot_hidden_style}>
                            <div className={this.props.classes.obliviot_light_section_divider}/>
                            <div className={this.props.classes.obliviot_light_section_title}>MATCHES</div>
                            <div className={this.props.classes.obliviot_light_section_view_more}>VIEW MORE</div>
                        </div>
                        <div id="matches_container">{this.props.matchesContent}</div>
                        <div id="bottom_nav" className={this.props.classes.obliviot_light_bottom_nav} style={this.props.obliviot_hidden_style}>
                            <div className="ui stackable five column grid">
                                <div className="column">
                                    <img className={this.props.classes.obliviot_light_bottom_nav_logo} src={this.props.image_src}/>
                                </div>
                                <div className="column">
                                    <div className={this.props.classes.obliviot_light_bottom_nav_title}>NAVIGATION</div>
                                    <div className={this.props.classes.obliviot_light_bottom_nav_sub}>Teams</div>
                                    <div className={this.props.classes.obliviot_light_bottom_nav_sub}>News</div>
                                    <div className={this.props.classes.obliviot_light_bottom_nav_sub}>Partners</div>
                                    <div className={this.props.classes.obliviot_light_bottom_nav_sub}>Streams</div>
                                </div>
                                <div className="column">
                                    <div className={this.props.classes.obliviot_light_bottom_nav_title}>ABOUT</div>
                                    <div className={this.props.classes.obliviot_light_bottom_nav_sub}>About</div>
                                    <div className={this.props.classes.obliviot_light_bottom_nav_sub}>Media Resources</div>
                                    <div className={this.props.classes.obliviot_light_bottom_nav_sub}>Careers</div>
                                </div>
                                <div className="column">
                                    <div className={this.props.classes.obliviot_light_bottom_nav_title}>CONTENT</div>
                                    <div className={this.props.classes.obliviot_light_bottom_nav_sub}>About</div>
                                    <div className={this.props.classes.obliviot_light_bottom_nav_sub}>Comtact</div>
                                </div>
                                <div className="column">
                                    <div className={this.props.classes.obliviot_light_bottom_nav_title}>TEAMS</div>
                                    <div className={this.props.classes.obliviot_light_bottom_nav_sub}>About</div>
                                    <div className={this.props.classes.obliviot_light_bottom_nav_sub}>Media Resources</div>
                                    <div className={this.props.classes.obliviot_light_bottom_nav_sub}>Careers</div>
                                </div>
                            </div>
                        </div>
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
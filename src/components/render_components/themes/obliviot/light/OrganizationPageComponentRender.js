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
                    <div className={this.props.classes.obliviot_light_bg_filter}/>
                    <div className={this.props.classes.obliviot_lightContraint}>
                        <header className={this.props.classes.obliviot_lightHeader}>
                            <div >{this.props.navContent}</div>
                        </header>
                        <div id="sponsors">{this.props.topSponsorContent}</div>
                        <div className={this.props.classes.obliviot_lightBlogContainer}>
                            <div >{this.props.blogContent}</div>
                        </div>
                        <div className={this.props.classes.obliviot_light_section_control_container}>
                            <div className={this.props.classes.obliviot_light_section_divider}/>
                            <div className={this.props.classes.obliviot_light_section_title}>STREAMS</div>
                            <div className={this.props.classes.obliviot_light_section_view_more}>VIEW MORE</div>
                        </div>
                        <div className={this.props.classes.obliviot_light_twitch_container}>
                            <div className="ui stackable three column grid">
                                <div >{this.props.stitchContent}</div>
                            </div>
                        </div>
                        <div>
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
                        <div className={this.props.classes.obliviot_light_section_control_container}>
                            <div className={this.props.classes.obliviot_light_section_divider}/>
                            <div className={this.props.classes.obliviot_light_section_title}>MATCHES</div>
                            <div className={this.props.classes.obliviot_light_section_view_more}>VIEW MORE</div>
                        </div>
                        <div id="matches_container">{this.props.matchesContent}</div>
                        <div id="bottom_nav" className={this.props.classes.obliviot_light_bottom_nav}>
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
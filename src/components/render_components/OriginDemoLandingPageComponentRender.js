/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OriginDemoLandingPageComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.landing_body}>
                    <header className={this.props.classes.landing_header}>
                        <i id="menu_open" style={{
                            color: '#fff',
                            fontSize: '35px',
                            cursor: 'pointer'
                        }} className="bars icon"/>
                    </header>
                    <div id="landing_welcome" className={this.props.classes.landing_outer_welcome_container}>
                        <div className={this.props.classes.landing_welcome_container}>
                            <div className={this.props.classes.landing_welcome_lines_container}>
                                <img className={this.props.classes.landing_welcome_lines_image}/>
                            </div>
                        </div>
                    </div>
                    <div id="landing_organization" className={this.props.classes.landing_content_container}>
                        <div className="ui stackable two column grid">
                            <div className="column">
                                <div id="org_title" className={this.props.classes.landing_org_header_text}>
                                    Your Team
                                    <span className={this.props.classes.landing_org_header_text_blue}>Origin</span>ates Here
                                </div>
                                <div id="org_body" className={this.props.classes.landing_org_body}>
                                    <p>Building an Esports team is difficult. Recruiting players, practicing, and getting your teams to events is a full-time job. Allow us to handle the rest. Origin.gg makes it easy for you to set up a pro style organization.<br/><br/>After choosing your domain name, you'll have the opportunity to fill out your basic details and choose one of our beautiful themes. From there, upload your own custom graphics or choose some of our in-house images.
                                        <br/><br/>You'll be able to keep your fans updated with news, match updates, and rosters quickly and easily through our in-house CMS system.<br/><br/>What are you waiting on? Spawn your team now!</p>
                                </div>
                            </div>
                            <div className="column">
                                <div id="org_create" className={this.props.classes.landing_org_diagram}>
                                    <div className={this.props.classes.landing_org_arrow_box}>
                                        Create Your Domain
                                    </div>
                                    <div className={this.props.classes.landing_org_line}/>
                                    <div className={this.props.classes.landing_org_arrow}/>
                                </div>
                                <div id="org_add" className={this.props.classes.landing_org_diagram}>
                                    <div className={this.props.classes.landing_org_arrow_box}>
                                        Add Your Details
                                    </div>
                                    <div className={this.props.classes.landing_org_line}/>
                                    <div className={this.props.classes.landing_org_arrow}/>
                                </div>
                                <div id="org_grow" className={this.props.classes.landing_org_diagram}>
                                    <div className={this.props.classes.landing_org_arrow_box}>
                                        Grow Your Empire
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="landing_individual" className={this.props.classes.landing_individual_container}>
                        <div className="ui stackable two column grid">
                            <div className="column">
                                <div className="ui three column grid">
                                    <div className="column">
                                        <div className={this.props.classes.landing_individual_image_container}>
                                            <img className={this.props.classes.landing_individual_image_container}/>
                                        </div>
                                        <div className={this.props.classes.landing_individual_image_container}>
                                            <img className={this.props.classes.landing_individual_image_container}/>
                                        </div>
                                        <div className={this.props.classes.landing_individual_image_container}>
                                            <img className={this.props.classes.landing_individual_image_container}/>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className={this.props.classes.landing_individual_image_container}>
                                            <img className={this.props.classes.landing_individual_image_container}/>
                                        </div>
                                        <div className={this.props.classes.landing_individual_image_container}>
                                            <img className={this.props.classes.landing_individual_image_container}/>
                                        </div>
                                        <div className={this.props.classes.landing_individual_image_container}>
                                            <img className={this.props.classes.landing_individual_image_container}/>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className={this.props.classes.landing_individual_image_container}>
                                            <img className={this.props.classes.landing_individual_image_container}/>
                                        </div>
                                        <div className={this.props.classes.landing_individual_image_container}>
                                            <img className={this.props.classes.landing_individual_image_container}/>
                                        </div>
                                        <div className={this.props.classes.landing_individual_image_container}>
                                            <img className={this.props.classes.landing_individual_image_container}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div id="indie_text" className={this.props.classes.landing_individual_body}>
                                    <div className={this.props.classes.landing_individual_header}>
                                        Individuals
                                    </div>
                                    <div className={this.props.classes.landing_individual_text}>
                                        <p>Our aim with Individual profiles is to help players and streamers create and build their personal brand. If you are a player looking for a team, you will easily be able to display your accomplishments. When you are picked up by one of our teams, they'll simply be able to add your profile to their roster!
                                            <br/>
                                            <br/>Likewise, if you are a streamer, your brand is important. No matter what streaming service you use, people need access to your brand outside of your social media channels. We want to make it easy for sponsors to find you, get the information they need, and pay you!<br/><br/>We are currently building our Individual's platform. We'll let you know as soon as we launch.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={this.props.classes.coming_soon_div}>
                            Coming Soon
                        </div>
                    </div>
                    <div id="landing_why" className={this.props.classes.landing_content_container}>
                        <div id="why_content" className={this.props.classes.landing_why_content}>
                            <div className={this.props.classes.landing_why_header}>WHY ORIGIN.GG</div>
                            <div className={this.props.classes.landing_why_body}>
                                <p>Our belief at Origin.gg is that if our teams and players don't succeed, then we don't succeed. It is our daily mission to make sure that YOUR FANS love your team and your brand.<br id="the-individuals"/>We will continually build and implement things that will improve your fan retention, increase your sponsorships, and ultimately build your team into a SUCCESS.</p>
                            </div>
                        </div>
                    </div>
                    <div id="landing_upcoming" className={this.props.classes.landing_content_container}>
                        <div className="ui stackable two column grid">
                            <div className="column">
                                <div className={this.props.classes.upcoming_header}>Upcoming Features</div>
                                <div id="up_rosters" className={this.props.classes.upcoming_opacity}>
                                    <div className={this.props.classes.upcoming_title}>Team Rosters</div>
                                    <div className={this.props.classes.upcoming_body}>
                                        Showcase the talented players your organization represents with our new option to display your teams & rosters on your website.
                                    </div>
                                </div>
                                <div id="up_blogs" className={this.props.classes.upcoming_opacity}>
                                    <div className={this.props.classes.upcoming_title}>Blog Posts</div>
                                    <div className={this.props.classes.upcoming_body}>
                                        Keep your fans up to date with your successes by creating content to share to the world. Our blogging platform allows you to create content quickly & easily.
                                    </div>
                                </div>
                                <div id="up_custom" className={this.props.classes.upcoming_opacity}>
                                    <div className={this.props.classes.upcoming_title}>Customize Elements</div>
                                    <div className={this.props.classes.upcoming_body}>
                                        Customize every feature, colors, images, and more with our deeply integrated customization platform. Make your brand unique and looking like no others.
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className={this.props.classes.landing_upcoming_video}>
                                    <iframe title="ifr" width="560" height="315" style={{
                                        borderWidth: '1px',
                                        borderColor: 'white',
                                        borderStyle: 'solid',
                                        marginLeft: 'auto',
                                        marginRight: 'auto'
                                    }} frameBorder="0"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="menu_modal_container" className={this.props.classes.landing_menu_modal}>
                        <div className={this.props.classes.menu_modal_header}>
                            <div id="menu_close" className={this.props.classes.menu_close}>X</div>
                        </div>
                        <div id="menu_welcome" className={this.props.classes.menu_modal_item_container}>Welcome</div>
                        <div id="menu_organization" className={this.props.classes.menu_modal_item_container}>Organization</div>
                        <div id="menu_individual" className={this.props.classes.menu_modal_item_container}>Individual</div>
                        <div id="menu_why" className={this.props.classes.menu_modal_item_container}>Why Origin?</div>
                        <div id="menu_upcoming" className={this.props.classes.menu_modal_item_container}>Upcoming Features</div>
                    </div>
                    <div className={this.props.classes.landing_page_button_container}>
                        <div className={this.props.classes.landing_page_join_button}>Build Your Empire Now</div>
                    </div>
                    <div className={this.props.classes.landing_footer}>
                        <p className={this.props.classes.landing_footer_text}>© Origin. All rights reserved.</p>
                    </div>
                </div>
            </div>
        )
    }
}

OriginDemoLandingPageComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OriginDemoLandingPageComponentRender )
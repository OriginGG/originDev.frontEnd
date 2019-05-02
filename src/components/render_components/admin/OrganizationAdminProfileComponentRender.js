/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationAdminProfileComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.admin_title_box}>
                    <h2>Company Profile</h2>
                </div>
                <div className={this.props.classes.admin_main_logo_box}>
                    <div className="ui stackable two column grid">
                        <div className="column">
                            <div className={this.props.classes.admin_main_logo_button} onClick={this.props.handleFileClick}>COMPANY LOGO</div>
                            <img id="admin_main_logo" className={this.props.classes.admin_main_logo_image} src={this.props.logo_src}/>
                        </div>
                        <div className="column">
                            <div className={this.props.classes.admin_main_logo_spacer}/>
                            <div className="ui fluid input">
                                <input type="text" placeholder="Company Name" value={this.props.company_name_value} onChange={e => {
                                    this
                                        .props
                                        .handleChange( 'company_name_value', e );
                                }}/>
                            </div>
                            <div className={this.props.classes.admin_main_logo_spacer}/>
                            <div className="ui fluid input">
                                <input type="text" placeholder="Company Store" value={this.props.company_store_value} onChange={e => {
                                    this
                                        .props
                                        .handleChange( 'company_store_value', e );
                                }}/>
                            </div>
                            <div className={this.props.classes.admin_main_logo_spacer}/>
                            <label className={this.props.classes.admin_color_label}>Primary Color</label>
                            <input type="color" id="primary_color" value="#0a9ab4" className={this.props.classes.admin_color_picker} value={this.props.primary_color_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'primary_color_value', e );
                            }}/>
                        </div>
                    </div>
                </div>
                <div className={this.props.classes.admin_title_box}>
                    <h2>Social Media</h2>
                </div>
                <div className={this.props.classes.admin_social_box}>
                    <div className="ui stackable two column grid">
                        <div className="column">
                            <div className="ui fluid input">
                                <input type="text" placeholder="Facebook link" value={this.props.facebook_value} onChange={e => {
                                    this
                                        .props
                                        .handleChange( 'facebook_value', e );
                                }}/>
                            </div>
                            <div className={this.props.classes.admin_social_box_divider}/>
                            <div className="ui fluid input">
                                <input type="text" placeholder="Twitter link" value={this.props.twitter_value} onChange={e => {
                                    this
                                        .props
                                        .handleChange( 'twitter_value', e );
                                }}/>
                            </div>
                            <div className={this.props.classes.admin_social_box_divider}/>
                            <div className="ui fluid input">
                                <input type="text" placeholder="Twitch link" value={this.props.twitch_value} onChange={e => {
                                    this
                                        .props
                                        .handleChange( 'twitch_value', e );
                                }}/>
                            </div>
                            <div className={this.props.classes.admin_social_box_divider}/>
                            <div className="ui fluid input">
                                <input type="text" placeholder="Twitch Team link" value={this.props.twitch_team_value} onChange={e => {
                                    this
                                        .props
                                        .handleChange( 'twitch_team_value', e );
                                }}/>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui fluid input">
                                <input type="text" placeholder="Instagram link" value={this.props.insta_value} onChange={e => {
                                    this
                                        .props
                                        .handleChange( 'insta_value', e );
                                }}/>
                            </div>
                            <div className={this.props.classes.admin_social_box_divider}/>
                            <div className="ui fluid input">
                                <input type="text" placeholder="YouTube link" value={this.props.youtube_value} onChange={e => {
                                    this
                                        .props
                                        .handleChange( 'youtube_value', e );
                                }}/>
                            </div>
                            <div className={this.props.classes.admin_social_box_divider}/>
                            <div className="ui fluid input">
                                <input type="text" placeholder="Discord link" value={this.props.discord_value} onChange={e => {
                                    this
                                        .props
                                        .handleChange( 'discord_value', e );
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={this.props.classes.admin_title_box}>
                    <h2>Twitter Feed</h2>
                </div>
                <div className={this.props.classes.admin_social_box}>
                    <div className="ui stackable two column grid">
                        <div className="column">
                            <div className="ui fluid input">
                                <input type="text" placeholder="Twitter Username" value={this.props.twitter_username_value} onChange={e => {
                                    this
                                        .props
                                        .handleChange( 'twitter_username_value', e );
                                }}/>
                            </div>
                        </div>
                        <div className="column"/>
                    </div>
                </div>
                <div className={this.props.classes.admin_title_box}>
                    <h2>Contact Emails</h2>
                </div>
                <div className={this.props.classes.admin_social_box}>
                    <div className="ui stackable two column grid">
                        <div className="column">
                            <div className="ui fluid input">
                                <input type="text" placeholder="Support Email" value={this.props.support_email_value} onChange={e => {
                                    this
                                        .props
                                        .handleChange( 'support_email_value', e );
                                }}/>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui fluid input">
                                <input type="text" placeholder="Business Email" value={this.props.business_email_value} onChange={e => {
                                    this
                                        .props
                                        .handleChange( 'business_email_value', e );
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={this.props.classes.admin_submit_box}>
                    <div className={this.props.classes.admin_submit_button} onClick={this.props.handleSubmit}>Submit</div>
                </div>
            </div>
        )
    }
}

OrganizationAdminProfileComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminProfileComponentRender )
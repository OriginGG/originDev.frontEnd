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
                    <div className={this.props.classes.admin_main_logo_box_inner}>
                        <div className={this.props.classes.admin_main_logo_button}>COMPANY LOGO</div>
                        <img id="admin_main_logo" className={this.props.classes.admin_main_logo_image}/>
                    </div>
                    <div className={this.props.classes.admin_main_logo_box_inner}>
                        <div className={this.props.classes.admin_main_logo_spacer}/>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Company Name"/>
                        </div>
                        <div className={this.props.classes.admin_main_logo_spacer}/>
                        <label className={this.props.classes.admin_color_label}>Primary Color</label>
                        <input type="color" id="primary_color" onchange="clickColor(0, -1, -1, 5)" value="#0a9ab4" className={this.props.classes.admin_color_picker}/>
                    </div>
                </div>
                <div className={this.props.classes.admin_title_box}>
                    <h2>Social Media</h2>
                </div>
                <div className={this.props.classes.admin_social_box}>
                    <div className={this.props.classes.admin_social_box_inner}>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Facebook link"/>
                        </div>
                        <div className={this.props.classes.admin_social_box_divider}/>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Twitter link"/>
                        </div>
                    </div>
                    <div className={this.props.classes.admin_social_box_inner}>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Instagram link"/>
                        </div>
                        <div className={this.props.classes.admin_social_box_divider}/>
                        <div className="ui fluid input">
                            <input type="text" placeholder="TSelect Rss newsfeed URL"/>
                        </div>
                    </div>
                </div>
                <div className={this.props.classes.admin_title_box}>
                    <h2>Twitter Feed</h2>
                </div>
                <div className={this.props.classes.admin_social_box}>
                    <div className={this.props.classes.admin_social_box_inner}>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Twitter Username"/>
                        </div>
                    </div>
                </div>
                <div className={this.props.classes.admin_title_box}>
                    <h2>Twitch Channel</h2>
                </div>
                <div className={this.props.classes.admin_social_box}>
                    <div className={this.props.classes.admin_social_box_inner}>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Twitch Channel Name"/>
                        </div>
                    </div>
                </div>
                <div className={this.props.classes.admin_submit_box}>
                    <div className={this.props.classes.admin_submit_button}>Submit</div>
                </div>
            </div>
        )
    }
}

OrganizationAdminProfileComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminProfileComponentRender )
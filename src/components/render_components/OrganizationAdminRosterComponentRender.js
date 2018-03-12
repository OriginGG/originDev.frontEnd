/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationAdminRosterComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.admin_title_box}>
                    <h2>Roster</h2>
                </div>
                <div className={this.props.classes.roster_buttons_box}>
                    <select className="ui dropdown">
                        <option value="">Game</option>
                        <option value="1">Call of Duty</option>
                        <option value="0">Overwatch</option>
                    </select>
                    <div className={this.props.classes.roster_team_button}>Create Team</div>
                </div>
                <div className={this.props.classes.media_title_box}>
                    <h2>Add Twitch Channels</h2>
                </div>
                <div className={this.props.classes.admin_social_box}>
                    <div className={this.props.classes.admin_roster_box_inner}>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Channel 1"/>
                        </div>
                        <div className={this.props.classes.admin_social_box_divider}/>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Channel 5"/>
                        </div>
                    </div>
                    <div className={this.props.classes.admin_roster_box_inner}>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Channel 2"/>
                        </div>
                        <div className={this.props.classes.admin_social_box_divider}/>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Channel 6"/>
                        </div>
                    </div>
                    <div className={this.props.classes.admin_roster_box_inner}>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Channel 3"/>
                        </div>
                        <div className={this.props.classes.admin_social_box_divider}/>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Channel 7"/>
                        </div>
                    </div>
                    <div className={this.props.classes.admin_roster_box_inner}>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Channel 4"/>
                        </div>
                        <div className={this.props.classes.admin_social_box_divider}/>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Channel 8"/>
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

OrganizationAdminRosterComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminRosterComponentRender )
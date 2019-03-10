/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationAdminRosterSocialStatsComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div id="game_modal" className="ui modal">
                    <i className="close icon"/>
                    <div className={this.props.classes.modal_inner}>
                        <div className="header"></div>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Team Name"/>
                        </div>
                        <div style={{
                            marginTop: '30px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }} className="ui simple selection dropdown">
                            <input type="hidden" name="gender"/>
                            <i className="dropdown icon"/>
                            <div className="default text">Game</div>
                            <div className="menu">
                                <div data-value="0" className="item">Call of Duty</div>
                                <div data-value="1" className="item">Halo</div>
                                <div data-value="2" className="item">World of Warcraft</div>
                                <div data-value="3" className="item">Overwatch</div>
                                <div data-value="4" className="item">Super Smash Brothers</div>
                                <div data-value="5" className="item">Starcraft II</div>
                                <div data-value="6" className="item">Street Fighter</div>
                            </div>
                        </div>
                        <div className="actions">
                            <div style={{
                                float: 'right'
                            }} className={this.props.classes.team_add_actions}>
                                <div className="ui black deny button">
                                    Cancel
                                </div>
                                <div className="ui positive right labeled icon button">
                                    Save
                                    <i className="checkmark icon"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="member_modal" className="ui modal">
                    <i className="close icon"/>
                    <div className={this.props.classes.modal_inner}>
                        <div className="header">
                            <div className={this.props.classes.admin_title_box}>
                                <h2>Add New Teammate</h2>
                            </div>
                        </div>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Member Username"/>
                        </div>
                        <div className="actions">
                            <div className={this.props.classes.team_add_actions}>
                                <div className="ui black deny button">
                                    Cancel
                                </div>
                                <div className="ui positive right labeled icon button">
                                    Save
                                    <i className="checkmark icon"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <table id="game_table" className="ui selectable celled striped table">
                    <thead>
                        <tr>
                            <th colSpan="2">Game</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td >{this.props.game_list}</td>
                        </tr>
                    </tbody>
                    <tfoot className="full-width">
                        <tr>
                            <th colSpan="1">
                                <div id="add_game"/>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

OrganizationAdminRosterSocialStatsComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminRosterSocialStatsComponentRender )
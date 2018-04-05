/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationAdminMatchesComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.admin_title_box}>
                    <h2>Recent Matches</h2>
                </div>
                <div className={this.props.classes.admin_search_container}>
                    <div className="ui action fluid input">
                        <input type="text" placeholder="Search..."/>
                        <div className="ui button">Search</div>
                    </div>
                </div>
                <table className="ui compact celled data table">
                    <thead>
                        <tr>
                            <th>Game</th>
                            <th>Opposite Team</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody >{this.props.recent_matches}</tbody>
                    <tfoot className="full-width">
                        <tr>
                            <th/>
                            <th colSpan="4">
                                <div id="add_match_button" className="ui right floated small primary labeled icon button" onClick={this.props.addMatch}>
                                    <i className="user icon"/>
                                    Add Recent
                                </div>
                            </th>
                        </tr>
                    </tfoot>
                </table>
                <div id="match_modal" className="ui modal">
                    <i className="close icon"/>
                    <div className={this.props.classes.modal_inner}>
                        <div className="header">
                            <div className={this.props.classes.admin_title_box}>
                                <h2>Add New Recent Match</h2>
                            </div>
                        </div>
                        <div className="ui stackable two column grid">
                            <div className="column">
                                <div className={this.props.classes.admin_sponser_button}>
                                    <label className="class.admin_sponser_label" htmlFor="hidden-new-file">
                                        <i className="cloud icon"/>
                                        Select Game Logo
                                    </label>
                                    <input type="file" id="hidden-new-file" style={{
                                        display: 'none'
                                    }}/>
                                </div>
                                <div className={this.props.classes.modal_blog_media_container}>
                                    <img id="blog_media_preview" className={this.props.classes.modal_blog_media_preview}/>
                                </div>
                            </div>
                            <div className="column">
                                <div className={this.props.classes.admin_sponser_button}>
                                    <label className="class.admin_sponser_label" htmlFor="hidden-new-file">
                                        <i className="cloud icon"/>
                                        Upload Opposite Team Logo
                                    </label>
                                    <input type="file" id="hidden-new-file" style={{
                                        display: 'none'
                                    }}/>
                                </div>
                                <div className={this.props.classes.modal_blog_media_container}>
                                    <img id="blog_media_preview" className={this.props.classes.modal_blog_media_preview}/>
                                </div>
                            </div>
                        </div>
                        <div className="ui stackable two column grid">
                            <div className="column">
                                <div className="ui fluid input">
                                    <input type="text" placeholder="Add Your Score"/>
                                </div>
                            </div>
                            <div className="column">
                                <div className="ui fluid input">
                                    <input type="text" placeholder="Add Their Score"/>
                                </div>
                            </div>
                        </div>
                        <div className="actions">
                            <div className={this.props.classes.blog_add_actions}>
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
            </div>
        )
    }
}

OrganizationAdminMatchesComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminMatchesComponentRender )
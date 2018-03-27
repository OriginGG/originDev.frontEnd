/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationAdminCollaboratorComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div id="collaborators_main">
                    <div className={this.props.classes.admin_title_box}>
                        <h2>Manage Collaborators</h2>
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
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Password</th>
                            </tr>
                        </thead>
                        <tbody >{this.props.tableData}</tbody>
                        <tfoot className="full-width">
                            <tr>
                                <th/>
                                <th colSpan="4">
                                    <div className="ui right floated small primary labeled icon button" onClick={this.props.addTeam}>
                                        <i className="user icon"/>
                                        Add Team
                                    </div>
                                    <div className="ui right floated pagination menu">
                                        <a className="icon item">
                                            <i className="left chevron icon"/>
                                        </a>
                                        <a className="item">1</a>
                                        <a className="item">2</a>
                                        <a className="item">3</a>
                                        <a className="item">4</a>
                                        <a className="icon item">
                                            <i className="right chevron icon"/>
                                        </a>
                                    </div>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        )
    }
}

OrganizationAdminCollaboratorComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminCollaboratorComponentRender )
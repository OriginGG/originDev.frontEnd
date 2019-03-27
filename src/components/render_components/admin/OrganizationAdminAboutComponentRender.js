/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationAdminAboutComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.admin_title_box}>
                    <h2>Manage About Page</h2>
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
                            <th>Page Title</th>
                            <th>Page Sub Title</th>
                            <th>Page Key</th>
                            <th>Page Content</th>
                            <th>Page Registered</th>
                            <th>Page Edit</th>
                        </tr>
                    </thead>
                    <tbody >{this.props.rows}</tbody>
                    <tfoot className="full-width">
                        <tr>
                            <th colSpan="6">
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
        )
    }
}

OrganizationAdminAboutComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminAboutComponentRender )
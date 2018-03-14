/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationAdminPageComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div id="toggle" className="ui top attached demo menu">
                    <a className="item" onClick={this.props.handleClick}>
                        <i className="sidebar icon"/>
                        Menu
                    </a>
                </div>
                <div className="ui bottom attached segment pushable">
                    <div id="admin_menu" className="ui inverted labeled icon left inline vertical wide sidebar menu"></div>
                    <div className="pusher">
                        <div className="ui basic segment">
                            <div className={this.props.classes.admin_main}>
                                <div id="company_profile_main"></div>
                                <div id="user_list_main"></div>
                                <div id="collaborators_main"></div>
                                <div id="theme_main"></div>
                                <div id="about_main"></div>
                                <div id="roster_main"></div>
                                <div id="blog_main"></div>
                                <div id="media_main"></div>
                                <div id="matches_main"></div>
                                <div id="sponsers_main"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

OrganizationAdminPageComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminPageComponentRender )
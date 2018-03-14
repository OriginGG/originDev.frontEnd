/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationAdminMenuComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className="ui bottom segment">
                    <div className="ui inverted labeled icon left inline  vertical menu">
                        <div className={this.props.classes.menu_box_container}>
                            <div className={this.props.classes.menu_title_container}>
                                <div className={this.props.classes.menu_title_logo}>
                                    <img alt="logo" className={this.props.classes.menu_title_image}/>
                                </div>
                                <div className={this.props.classes.menu_title_text}>
                                    Admin Panel
                                </div>
                            </div>
                            <div className={this.props.classes.menu_user_container}>
                                <div className={this.props.classes.menu_user_logo}>
                                    <img className={this.props.classes.menu_user_iamge}/>
                                </div>
                                <div className={this.props.classes.menu_user_text}>
                                    qwertytest
                                </div>
                            </div>
                            <a className="item">
                                <div className={this.props.classes.menu_item}>
                                    <div className={this.props.classes.menu_item_icon}>
                                        <i className="home icon"/>
                                    </div>
                                    <div className={this.props.classes.menu_item_label}>
                                        Company Profile
                                    </div>
                                </div>
                            </a>
                            <a className="item">
                                <div className={this.props.classes.menu_item}>
                                    <div className={this.props.classes.menu_item_icon}>
                                        <i className="block layout icon"/>
                                    </div>
                                    <div className={this.props.classes.menu_item_label}>
                                        User LIst
                                    </div>
                                </div>
                            </a>
                            <a className="item">
                                <div className={this.props.classes.menu_item}>
                                    <div className={this.props.classes.menu_item_icon}>
                                        <i className="block layout icon"/>
                                    </div>
                                    <div className={this.props.classes.menu_item_label}>
                                        Collaborators
                                    </div>
                                </div>
                            </a>
                            <div className="ui inverted accordion">
                                <div>
                                    <div className="title">Manage<i className="dropdown icon"/></div>
                                    <div className="content">
                                        <div className="vertical menu">
                                            <a hrwf="#" className="item">Theme</a>
                                            <a href="#" className="item">About</a>
                                            <a href="#" className="item">Roster</a>
                                            <a href="#" className="item">Blog</a>
                                            <a href="#" className="item">Media</a>
                                            <a href="#" className="item">Recent Matches</a>
                                            <a href="#" className="item">Sponsers</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

OrganizationAdminMenuComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminMenuComponentRender )
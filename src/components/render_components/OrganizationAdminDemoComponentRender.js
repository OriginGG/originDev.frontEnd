/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationAdminDemoComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div id="toggle" className="ui top attached demo menu">
                    <a className="item">
                        <i className="sidebar icon"/>
                        Menu
                    </a>
                </div>
                <div className="ui bottom attached segment pushable">
                    <div className="ui inverted labeled icon left inline vertical wide sidebar menu">
                        <div className={this.props.classes.menu_title_container}>
                            <div className={this.props.classes.menu_title_logo}>
                                <img src="http://api.originbeta.net/adminTemplate/1520546366661frcn0rmeg8t98jjor.jpeg" alt="logo" className={this.props.classes.menu_title_image}/>
                            </div>
                            <div className={this.props.classes.menu_title_text}>
                                Admin Panel
                            </div>
                        </div>
                        <div className={this.props.classes.menu_user_container}>
                            <div className={this.props.classes.menu_user_logo}>
                                <img src="" className={this.props.classes.menu_user_iamge}/>
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

OrganizationAdminDemoComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminDemoComponentRender )
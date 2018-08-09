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
                                    <img alt="logo" className={this.props.classes.menu_title_image} src={this.props.image_src}/>
                                </div>
                                <div className={this.props.classes.menu_title_text}>
                                    Admin Panel
                                </div>
                            </div>
                            <div className={this.props.classes.menu_user_container}>
                                <div className={this.props.classes.menu_user_logo}>
                                    <img className={this.props.classes.menu_user_image}/>
                                </div>
                                <div className={this.props.classes.menu_user_text}>{this.props.fullname}</div>
                            </div>
                            <a className="item" onClick={e => {
                                this
                                    .props
                                    .handleMainMenuClick( 'company', e );
                            }}>
                                <div className={this.props.classes.menu_item}>
                                    <div className={this.props.classes.menu_item_icon}>
                                        <i className="home icon"/>
                                    </div>
                                    <div className={this.props.classes.menu_item_label}>
                                        Company Profile
                                    </div>
                                </div>
                            </a>
                            <a className="item" onClick={e => {
                                this
                                    .props
                                    .handleMainMenuClick( 'members', e );
                            }}>
                                <div className={this.props.classes.menu_item}>
                                    <div className={this.props.classes.menu_item_icon}>
                                        <i className="users icon"/>
                                    </div>
                                    <div className={this.props.classes.menu_item_label}>
                                        Members
                                    </div>
                                </div>
                            </a>
                            <a className="item" onClick={e => {
                                this
                                    .props
                                    .handleMainMenuClick( 'subscription', e );
                            }}>
                                <div className={this.props.classes.menu_item}>
                                    <div className={this.props.classes.menu_item_icon}>
                                        <i className="dollar icon"/>
                                    </div>
                                    <div className={this.props.classes.menu_item_label}>
                                        Subscription
                                    </div>
                                </div>
                            </a>
                            <div className="ui inverted accordion">
                                <div >{this.props.dropdown}</div>
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
/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationAdminThemeComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.admin_title_box}>
                    <h2>Manage Theme</h2>
                </div>
                <div className={this.props.classes.theme_type_container}>
                    <div className="ui form">
                        <div className="inline fields">
                            <label>Please Select Theme Type:</label>
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input type="radio" name="frequency" checked="checked"/>
                                    <label>Light Theme</label>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input type="radio" name="frequency"/>
                                    <label>Dark Theme</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p>Change Jumbotron Images</p>
                <div className={this.props.classes.jumbotron_container}>
                    <img className={this.props.classes.jumbotron_image}/>
                    <div id="theme_modal_button" className={this.props.classes.jumbotron_overlay}>
                        <div className={this.props.classes.jumbotron_model_switch}>Edit Jubotron Image</div>
                    </div>
                </div>
                <div id="theme_modal" className="ui modal">
                    <i className="close icon"/>
                    <div className={this.props.classes.modal_inner}>
                        <div className="header">
                            <div className={this.props.classes.admin_title_box}>
                                <h2>Section 1 Background Image</h2>
                            </div>
                        </div>
                        <div className={this.props.classes.admin_file_button}>
                            <label className="class.admin_sponser_label" htmlFor="hidden-new-file">
                                <i className="cloud icon"/>
                                Choose File
                            </label>
                            <input type="file" id="hidden-new-file" style={{
                                display: 'none'
                            }} onchange="readURL(this);"/>
                        </div>
                        <div className={this.props.classes.modal_blog_media_container}>
                            <img id="blog_media_preview" className={this.props.classes.modal_blog_media_preview}/>
                        </div>
                        <p className={this.props.classes.theme_modal_OR}>OR</p>
                        <div className={this.props.classes.theme_modal_small_container}>
                            <img className={this.props.classes.theme_modal_small_img}/>
                            <img className={this.props.classes.theme_modal_small_img}/>
                            <img className={this.props.classes.theme_modal_small_img}/>
                        </div>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Color"/>
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
                <div className={this.props.classes.admin_submit_box}>
                    <div className={this.props.classes.admin_submit_button}>Save</div>
                </div>
            </div>
        )
    }
}

OrganizationAdminThemeComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminThemeComponentRender )
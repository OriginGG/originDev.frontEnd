/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationAdminThemeModalComponentRender extends Component {
    render( ) {
        return (
            <div>
                <form className="ui large form">
                    <div id="theme_modal">
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
                                }} onChange={this.props.uploadFile}/>
                            </div>
                            <div className={this.props.classes.modal_blog_media_container}>
                                <img id="blog_media_preview" className={this.props.classes.modal_blog_media_preview} src={this.props.preview_image}/>
                            </div>
                            <p className={this.props.classes.theme_modal_OR}>OR</p>
                            <div className={this.props.classes.theme_modal_small_container}>
                                <img className={this.props.classes.theme_modal_small_img} onClick={( ) => {
                                    this
                                        .props
                                        .handleImageClick( this.props.default_image1 );
                                }} src={this.props.default_image1}/>
                                <img className={this.props.classes.theme_modal_small_img} onClick={( ) => {
                                    this
                                        .props
                                        .handleImageClick( this.props.default_image2 );
                                }} src={this.props.default_image2}/>
                                <img className={this.props.classes.theme_modal_small_img} onClick={( ) => {
                                    this
                                        .props
                                        .handleImageClick( this.props.default_image3 );
                                }} src={this.props.default_image3}/>
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
                </form>
            </div>
        )
    }
}

OrganizationAdminThemeModalComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminThemeModalComponentRender )
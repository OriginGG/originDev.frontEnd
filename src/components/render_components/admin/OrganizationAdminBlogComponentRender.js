/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationAdminBlogComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.admin_title_box}>
                    <h2>Manage Blog</h2>
                </div>
                <div className={this.props.classes.admin_search_container}>
                    <div className="ui action fluid input">
                        <input type="text" placeholder="Search..."/>
                        <div className="ui button">Search</div>
                    </div>
                </div>
                <div className="ui modal">
                    <i className="close icon"/>
                    <div className={this.props.classes.modal_inner}>
                        <div className="header">
                            <div className={this.props.classes.admin_title_box}>
                                <h2>Add New Manage Blog</h2>
                            </div>
                        </div>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Title"/>
                        </div>
                        <div className={this.props.classes.admin_sponser_button}>
                            <label className="class.admin_sponser_label" htmlFor="hidden-new-file">
                                <i className="cloud icon"/>
                                Attach Media
                            </label>
                            <input type="file" id="hidden-new-file" style={{
                                display: 'none'
                            }}/>
                        </div>
                        <h2>16:9 ratio images used for all themes</h2>
                        <div className={this.props.classes.modal_blog_media_container}>
                            <img id="blog_media_preview" className={this.props.classes.modal_blog_media_preview}/>
                        </div>
                        <textarea cols="80" rows="10" id="blog_content" name="content"></textarea>
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
                <table className="ui compact celled data table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Image</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody >{this.props.blog_list}</tbody>
                    <tfoot className="full-width">
                        <tr>
                            <th/>
                            <th colSpan="4">
                                <div id="blog_modal" className="ui right floated small primary labeled icon button" onClick={this.props.handleClick}>
                                    <i className="share icon"/>Add Blog
                                </div>
                                <div style={{
                                    width: '10px,display'
                                }} className={this.props.classes.spacer}/>
                                <div className="ui right floated pagination menu">{this.props.pagination_content}</div>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

OrganizationAdminBlogComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminBlogComponentRender )
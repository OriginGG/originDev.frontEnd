/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationAdminSponserComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.admin_title_box}>
                    <h2>Add Sponsers</h2>
                </div>
                <div className={this.props.classes.admin_social_box}>
                    <div className={this.props.classes.admin_social_box_inner}>
                        <div className={this.props.classes.admin_sponser_button}>
                            <label className="class.admin_sponser_label" htmlFor="hidden-new-file">
                                <i className="cloud icon"/>
                                Upload Sponser 1
                            </label>
                            <input type="file" id="hidden-new-file" style={{
                                display: 'none'
                            }}/>
                        </div>
                        <div className={this.props.classes.admin_sponser_image_box}>
                            <img className={this.props.classes.admin_sponser_image}/>
                        </div>
                    </div>
                    <div className={this.props.classes.admin_social_box_inner}>
                        <div className={this.props.classes.admin_sponser_button}>
                            <label className="class.admin_sponser_label" htmlFor="hidden-new-file">
                                <i className="cloud icon"/>
                                Upload Sponser 2
                            </label>
                            <input type="file" id="hidden-new-file" style={{
                                display: 'none'
                            }}/>
                        </div>
                        <div className={this.props.classes.admin_sponser_image_box}>
                            <img className={this.props.classes.admin_sponser_image}/>
                        </div>
                    </div>
                    <div className={this.props.classes.admin_social_box_inner}>
                        <div className={this.props.classes.admin_sponser_button}>
                            <label className="class.admin_sponser_label" htmlFor="hidden-new-file">
                                <i className="cloud icon"/>
                                Upload Sponser 3
                            </label>
                            <input type="file" id="hidden-new-file" style={{
                                display: 'none'
                            }}/>
                        </div>
                        <div className={this.props.classes.admin_sponser_image_box}>
                            <img className={this.props.classes.admin_sponser_image}/>
                        </div>
                    </div>
                    <div className={this.props.classes.admin_social_box_inner}>
                        <div className={this.props.classes.admin_sponser_button}>
                            <label className="class.admin_sponser_label" htmlFor="hidden-new-file">
                                <i className="cloud icon"/>
                                Upload Sponser 4
                            </label>
                            <input type="file" id="hidden-new-file" style={{
                                display: 'none'
                            }}/>
                        </div>
                        <div className={this.props.classes.admin_sponser_image_box}>
                            <img className={this.props.classes.admin_sponser_image}/>
                        </div>
                    </div>
                </div>
                <div className={this.props.classes.admin_submit_box}>
                    <div className={this.props.classes.admin_submit_button}>Submit</div>
                </div>
            </div>
        )
    }
}

OrganizationAdminSponserComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminSponserComponentRender )
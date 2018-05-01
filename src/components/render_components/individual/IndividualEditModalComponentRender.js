/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class IndividualEditModalComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div id="edit_modal" style={{ maxWidth: '95%' }}>
                    <i className="close icon"/>
                    <div className={this.props.classes.modal_inner}>
                        <div className="header">
                            <div className={this.props.classes.modal_edit_banner_container}>
                                <img className={this.props.classes.modal_edit_banner}/>
                            </div>
                            <div className={this.props.classes.modal_edit_image_upload}>
                                <label className={this.props.classes.individual_image_label} htmlFor="hidden-new-file1">
                                    <i className="cloud icon"/>
                                    Upload Banner Image
                                </label>
                                <input type="file" id="hidden-new-file1" style={{
                                    display: 'none'
                                }}/>
                            </div>
                            <div className={this.props.classes.modal_edit_image_container}>
                                <img className={this.props.classes.modal_edit_image}/>
                            </div>
                            <div className={this.props.classes.modal_edit_image_upload}>
                                <label className={this.props.classes.individual_image_label} htmlFor="hidden-new-file1">
                                    <i className="cloud icon"/>
                                    Upload Profile Picture
                                </label>
                                <input type="file" id="hidden-new-file1" style={{
                                    display: 'none'
                                }}/>
                            </div>
                        </div>
                        <div id="modal_individual_edit_body" className={this.props.classes.modal_individual_edit_body}>
                            <input placeholder="Name" className={this.props.classes.modal_individual_edit_input}/>
                            <input placeholder="Twitter Handle" className={this.props.classes.modal_individual_edit_input}/>
                            <input placeholder="Email" className={this.props.classes.modal_individual_edit_input}/>
                            <input placeholder="Contact Number" className={this.props.classes.modal_individual_edit_input}/>
                            <textarea rows="10" placeholder="About" className={this.props.classes.modal_individual_edit_about}/>
                            <textarea rows="10" placeholder="Accomplishments" className={this.props.classes.modal_individual_edit_about}/>
                            <input placeholder="Twitch" className={this.props.classes.modal_individual_edit_input}/>
                            <input placeholder="Youtube" className={this.props.classes.modal_individual_edit_input}/>
                            <input placeholder="Youtube Video 1" className={this.props.classes.modal_individual_edit_input}/>
                            <input placeholder="Youtube Video 2" className={this.props.classes.modal_individual_edit_input}/>
                            <input placeholder="Youtube Video 3" className={this.props.classes.modal_individual_edit_input}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

IndividualEditModalComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( IndividualEditModalComponentRender )
/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class IndividualEditModalComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div id="edit_modal" style={{
                    maxWidth: 600
                }}>
                    <i className="close icon" onClick={this.props.closeModal}/>
                    <div className={this.props.classes.modal_inner}>
                        <div className="header">
                            <div className={this.props.classes.modal_edit_banner_container}>
                                <img className={this.props.classes.modal_edit_banner} src={this.props.bannerImageUrl}/>
                            </div>
                            <div className={this.props.classes.modal_edit_image_upload} onClick={( ) => {
                                this
                                    .props
                                    .handleFileClick( 'banner' );
                            }}>
                                <label className={this.props.classes.individual_image_label} htmlFor="hidden-new-filexx">
                                    <i className="cloud icon"/>
                                    Upload Banner Image
                                </label>
                            </div>
                            <div className={this.props.classes.modal_edit_image_container}>
                                <img className={this.props.classes.modal_edit_image} src={this.props.profileImageUrl}/>
                            </div>
                            <div className={this.props.classes.modal_edit_image_upload} onClick={( ) => {
                                this
                                    .props
                                    .handleFileClick( 'profile' );
                            }}>
                                <label className={this.props.classes.individual_image_label} htmlFor="hidden-new-file2">
                                    <i className="cloud icon"/>
                                    Upload Profile Picture
                                </label>
                            </div>
                        </div>
                        <div id="modal_individual_edit_body" className={this.props.classes.modal_individual_edit_body}>
                            <input placeholder="Name" className={this.props.classes.modal_individual_edit_input} value={this.props.firstName} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'firstName', e );
                            }}/>
                            <input placeholder="Twitter Handle" className={this.props.classes.modal_individual_edit_input} value={this.props.twitterHandle} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'twitterHandle', e );
                            }}/>
                            <input placeholder="Email" className={this.props.classes.modal_individual_edit_input} value={this.props.email} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'email', e );
                            }}/>
                            <input placeholder="Contact Number" className={this.props.classes.modal_individual_edit_input} value={this.props.contactNumber} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'contactNumber', e );
                            }}/>
                            <textarea rows="10" placeholder="About" className={this.props.classes.modal_individual_edit_about} value={this.props.about} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'about', e );
                            }}/>
                            <textarea rows="10" placeholder="Accomplishments" className={this.props.classes.modal_individual_edit_about} value={this.props.accomplishments} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'accomplishments', e );
                            }}/>
                            <input placeholder="Twitch" className={this.props.classes.modal_individual_edit_input} value={this.props.twitchUrl} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'twitchUrl', e );
                            }}/>
                            <input placeholder="Youtube" className={this.props.classes.modal_individual_edit_input} value={this.props.youtubeChannel} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'youtubeChannel', e );
                            }}/>
                            <input placeholder="Youtube Video 1" className={this.props.classes.modal_individual_edit_input} value={this.props.youtubeVideo1Url} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'youtubeVideo1Url', e );
                            }}/>
                            <input placeholder="Youtube Video 2" className={this.props.classes.modal_individual_edit_input} value={this.props.youtubeVideo2Url} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'youtubeVideo2Url', e );
                            }}/>
                            <input placeholder="Youtube Video 3" className={this.props.classes.modal_individual_edit_input} value={this.props.youtubeVideo3Url} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'youtubeVideo3Url', e );
                            }}/>
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
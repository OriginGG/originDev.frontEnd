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
                    <i style={{
                        cursor: 'pointer'
                    }} className="close icon" onClick={this.props.closeModal}/>
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
                            <div className={this.props.classes.individual_label}>First Name</div>
                            <input placeholder="First Name" className={this.props.classes.modal_individual_edit_input} value={this.props.firstName} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'firstName', e );
                            }}/>
                            <div className={this.props.classes.individual_label}>Last Name</div>
                            <input placeholder="Last Name" className={this.props.classes.modal_individual_edit_input} value={this.props.lastName} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'lastName', e );
                            }}/>
                            <div className={this.props.classes.individual_label}>Username</div>
                            <input placeholder="Username" className={this.props.classes.modal_individual_edit_input} value={this.props.username} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'username', e );
                            }}/>
                            <div className={this.props.classes.individual_label}>Contact Email</div>
                            <input placeholder="Contact Email" className={this.props.classes.modal_individual_edit_input} value={this.props.contactEmail} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'contactEmail', e );
                            }}/>
                            <div className={this.props.classes.individual_label}>About</div>
                            <textarea rows="10" placeholder="About" className={this.props.classes.modal_individual_edit_about} value={this.props.about} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'about', e );
                            }}/>
                            <div className={this.props.classes.individual_label}>Accomplishments</div>
                            <textarea rows="10" placeholder="Accomplishments" className={this.props.classes.modal_individual_edit_about} value={this.props.accomplishments} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'accomplishments', e );
                            }}/>
                            <div style={{
                                marginBottom: '20px'
                            }}>{this.props.renderButtons}</div>
                            <button role="button" style={{
                                marginBottom: '2em',
                                marginTop: '3em',
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }} className="ui youtube button" onClick={( ) => {
                                this
                                    .props
                                    .redirectAuth( 'youtube' );
                            }}><i aria-hidden="true" className="youtube icon"/>Connect with Youtube</button>
                            <button role="button" style={{
                                marginBottom: '2em',
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }} className="ui twitter button" onClick={( ) => {
                                this
                                    .props
                                    .redirectAuth( 'twitter' );
                            }}><i aria-hidden="true" className="twitter icon"/>Connect with Twitter</button>
                            <button role="button" style={{
                                marginBottom: '2em',
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }} className="ui twitch button" onClick={( ) => {
                                this
                                    .props
                                    .redirectAuth( 'twitch' );
                            }}><i aria-hidden="true" className="twitch icon"/>Connect with Twitch</button>
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
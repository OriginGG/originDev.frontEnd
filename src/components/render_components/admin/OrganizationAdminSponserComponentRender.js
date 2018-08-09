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
                            <label className="class.admin_sponser_label" htmlFor="hidden-new-file1">
                                <i className="cloud icon"/>
                                Upload Sponser 1
                            </label>
                            <input type="file" id="hidden-new-file1" style={{
                                display: 'none'
                            }} onChange={f => {
                                this
                                    .props
                                    .uploadFile( 'sponsor_image1', f );
                            }}/>
                        </div>
                        <div className={this.props.classes.admin_sponser_image_box}>
                            <img className={this.props.classes.admin_sponser_image} src={this.props.sponsor_image1}/>
                        </div>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Sponsor Name" value={this.props.sponsor_name1_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'sponsor_name1_value', e );
                            }}/>
                        </div>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Sponsor link (Valid URL)" value={this.props.http_link1_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'http_link1_value', e );
                            }}/>
                        </div>
                        <div className="ui fluid input">
                            <textarea placeholder="Sponsor description ..." className={this.props.classes.admin_sponser_description} value={this.props.sponsor_desc1_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'sponsor_desc1_value', e );
                            }}/>
                        </div>
                    </div>
                    <div className={this.props.classes.admin_social_box_inner}>
                        <div className={this.props.classes.admin_sponser_button}>
                            <label className="class.admin_sponser_label" htmlFor="hidden-new-file2">
                                <i className="cloud icon"/>
                                Upload Sponser 2
                            </label>
                            <input type="file" id="hidden-new-file2" style={{
                                display: 'none'
                            }} onChange={f => {
                                this
                                    .props
                                    .uploadFile( 'sponsor_image2', f );
                            }}/>
                        </div>
                        <div className={this.props.classes.admin_sponser_image_box}>
                            <img className={this.props.classes.admin_sponser_image} src={this.props.sponsor_image2}/>
                        </div>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Sponsor Name" value={this.props.sponsor_name2_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'sponsor_name2_value', e );
                            }}/>
                        </div>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Sponsor link (Valid URL)" value={this.props.http_link2_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'http_link2_value', e );
                            }}/>
                        </div>
                        <div className="ui fluid input">
                            <textarea placeholder="Sponsor description ..." className={this.props.classes.admin_sponser_description} value={this.props.sponsor_desc2_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'sponsor_desc2_value', e );
                            }}/>
                        </div>
                    </div>
                    <div className={this.props.classes.admin_social_box_inner}>
                        <div className={this.props.classes.admin_sponser_button}>
                            <label className="class.admin_sponser_label" htmlFor="hidden-new-file3">
                                <i className="cloud icon"/>
                                Upload Sponser 3
                            </label>
                            <input type="file" id="hidden-new-file3" style={{
                                display: 'none'
                            }} onChange={f => {
                                this
                                    .props
                                    .uploadFile( 'sponsor_image3', f );
                            }}/>
                        </div>
                        <div className={this.props.classes.admin_sponser_image_box}>
                            <img className={this.props.classes.admin_sponser_image} src={this.props.sponsor_image3}/>
                        </div>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Sponsor Name" value={this.props.sponsor_name3_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'sponsor_name3_value', e );
                            }}/>
                        </div>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Sponsor link (Valid URL)" value={this.props.http_link3_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'http_link3_value', e );
                            }}/>
                        </div>
                        <div className="ui fluid input">
                            <textarea placeholder="Sponsor description ..." className={this.props.classes.admin_sponser_description} value={this.props.sponsor_desc3_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'sponsor_desc3_value', e );
                            }}/>
                        </div>
                    </div>
                    <div className={this.props.classes.admin_social_box_inner}>
                        <div className={this.props.classes.admin_sponser_button}>
                            <label className="class.admin_sponser_label" htmlFor="hidden-new-file4">
                                <i className="cloud icon"/>
                                Upload Sponser 4
                            </label>
                            <input type="file" id="hidden-new-file4" style={{
                                display: 'none'
                            }} onChange={f => {
                                this
                                    .props
                                    .uploadFile( 'sponsor_image4', f );
                            }}/>
                        </div>
                        <div className={this.props.classes.admin_sponser_image_box}>
                            <img className={this.props.classes.admin_sponser_image} src={this.props.sponsor_image4}/>
                        </div>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Sponsor Name" value={this.props.sponsor_name4_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'sponsor_name4_value', e );
                            }}/>
                        </div>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Sponsor link (Valid URL)" value={this.props.http_link4_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'http_link4_value', e );
                            }}/>
                        </div>
                        <div className="ui fluid input">
                            <textarea placeholder="Sponsor description ..." className={this.props.classes.admin_sponser_description} value={this.props.sponsor_desc4_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'sponsor_desc4_value', e );
                            }}/>
                        </div>
                    </div>
                </div>
                <div className={this.props.classes.admin_submit_box}>
                    <div className={this.props.classes.admin_submit_button} onClick={this.props.handleSubmit}>Submit</div>
                </div>
            </div>
        )
    }
}

OrganizationAdminSponserComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminSponserComponentRender )
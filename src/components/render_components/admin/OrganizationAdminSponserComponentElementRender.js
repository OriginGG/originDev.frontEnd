/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationAdminSponserComponentElementRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.admin_social_box_inner}>
                    <div style={this.props.element_style_disable} onClick={this.props.subscriptionClick}>
                        <img style={this.props.element_style_disable_image} src={this.props.element_disable_image_src}/>
                    </div>
                    <div style={this.props.element_style_disable_under}>
                        <div className={this.props.classes.admin_sponser_button}>
                            <label className="class.admin_sponser_label" htmlFor="hidden-new-file1">{this.props.upload_title}</label>
                            <input type="file" id="hidden-new-file1" style={{
                                display: 'none'
                            }} onChange={f => {
                                this
                                    .props
                                    .uploadFile( this.props.image_state_var, f );
                            }}/>
                        </div>
                        <div className={this.props.classes.admin_sponser_image_box}>
                            <img className={this.props.classes.admin_sponser_image} src={this.props.sponsor_image}/>
                        </div>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Sponsor Name" value={this.props.sponsor_name_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( this.props.sponsor_name_state_var, e );
                            }}/>
                        </div>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Sponsor link (Valid URL)" value={this.props.http_link_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( this.props.http_state_var, e );
                            }}/>
                        </div>
                        <div className="ui fluid input">
                            <textarea placeholder="Sponsor description ..." className={this.props.classes.admin_sponser_description} value={this.props.sponsor_desc_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( this.props.state_desc_var, e );
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

OrganizationAdminSponserComponentElementRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminSponserComponentElementRender )
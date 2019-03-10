/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationRosterItemComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.light_roster_item_container}>
                    <div className="ui stackable two column grid">
                        <div className="three wide column">
                            <div className={this.props.classes.roster_item_img_container}>
                                <img className={this.props.classes.roster_item_img} src={this.props.roster_image}/>
                            </div>
                        </div>
                        <div className="thirteen wide column">
                            <div style={{
                                display: 'table',
                                paddingTop: '10px',
                                paddingBottom: '10px'
                            }}>
                                <div className={this.props.classes.roster_item_name_container}>
                                    <span className={this.props.classes.light_roster_name}>{this.props.roster_name}</span>
                                    <span className={this.props.classes.light_roster_divider}>|</span>
                                    <span className={this.props.classes.light_roster_name}>{this.props.roster_nickname}</span>
                                </div>
                                <div className={this.props.classes.roster_item_about_container}>
                                    <span className={this.props.classes.light_roster_about_text}>{this.props.roster_about}</span>
                                </div>
                                <div className={this.props.classes.roster_item_social_container}>
                                    <div className={this.props.classes.light_roster_item_social_icon} onClick={( ) => {
                                        this
                                            .props
                                            .handle_social( 'twitter', this.props.ind_user );
                                    }} style={this.props.twitter_style}><i className="fab fa-twitter"/></div>
                                    <div className={this.props.classes.light_roster_item_social_icon} onClick={( ) => {
                                        this
                                            .props
                                            .handle_social( 'facebook', this.props.ind_user );
                                    }} style={this.props.facebook_style}><i className="fab fa-facebook"/></div>
                                    <div className={this.props.classes.light_roster_item_social_icon} onClick={( ) => {
                                        this
                                            .props
                                            .handle_social( 'instagram', this.props.ind_user );
                                    }} style={this.props.instagram_style}><i className="fab fa-instagram"/></div>
                                    <div className={this.props.classes.light_roster_item_social_icon} onClick={( ) => {
                                        this
                                            .props
                                            .handle_social( 'youtube', this.props.ind_user );
                                    }} style={this.props.youtube_style}><i className="fab fa-youtube"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LightOrganizationRosterItemComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationRosterItemComponentRender )
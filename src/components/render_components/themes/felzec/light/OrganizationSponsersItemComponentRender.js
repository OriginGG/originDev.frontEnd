/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationSponsersItemComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.felzec_roster_item_container} style={this.props.bg_style}>
                    <div className={this.props.classes.felzec_roster_filter_container} style={this.props.filter_style}/>
                    <div className={this.props.classes.felzec_roster_inner_container}>
                        <div className="ui stackable two column grid">
                            <div className="four wide column">
                                <div className={this.props.classes.felzec_ponser_item_img_container}>
                                    <img className={this.props.classes.felzec_sponser_item_img} src={this.props.sponser_image}/>
                                </div>
                            </div>
                            <div className="twelve wide column">
                                <div style={{
                                    display: 'table',
                                    paddingTop: '10px',
                                    paddingBottom: '10px'
                                }}>
                                    <div className={this.props.classes.felzec_roster_item_about_container}>
                                        <span className={this.props.classes.felzec_roster_about_text}>{this.props.sponser_desc}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={this.props.classes.felzec_roster_nav_container} style={this.props.nav_style}>
                        <div className="ui stackable two column grid">
                            <div className="column">
                                <div className="ui stackable four column grid">
                                    <div className="column">
                                        <div className={this.props.classes.felzec_sponsor_icon_container}>{this.props.social_link1}</div>
                                    </div>
                                    <div className="column">
                                        <div className={this.props.classes.felzec_sponsor_icon_container}>{this.props.social_link2}</div>
                                    </div>
                                    <div className="column">
                                        <div className={this.props.classes.felzec_sponsor_icon_container}>{this.props.social_link3}</div>
                                    </div>
                                    <div className="column">
                                        <div className={this.props.classes.felzec_sponsor_icon_container}>{this.props.social_link4}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className={this.props.classes.felzec_sponsor_list_button}>{this.props.sponsor_link}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LightOrganizationSponsersItemComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationSponsersItemComponentRender )
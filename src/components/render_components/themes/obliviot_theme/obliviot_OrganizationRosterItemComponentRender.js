/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class ObliviotOrganizationRosterItemComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.roster_item_container}>
                    <div className="ui stackable two column grid">
                        <div className="three wide column">
                            <div className={this.props.classes.roster_item_img_container}>
                                <img className={this.props.classes.roster_item_img}/>
                            </div>
                        </div>
                        <div className="thirteen wide column">
                            <div style={{
                                display: 'table',
                                paddingTop: '10px',
                                paddingBottom: '10px'
                            }}>
                                <div className={this.props.classes.roster_item_name_container}>
                                    <span className={this.props.classes.roster_name}>Bobby Jones</span>
                                    <span className={this.props.classes.roster_divider}>|</span>
                                    <span className={this.props.classes.roster_name}>ThunderDude</span>
                                </div>
                                <div className={this.props.classes.roster_item_about_container}>
                                    <span className={this.props.classes.roster_about_text}>Bobby Jones is is a player for Ascendant Gaming. He is most known for playing for Team Kaliber for over 2.5 years. Bobby Jones is is a player for Ascendant Gaming. He is most known for playing for Team Kaliber for over 2.5 years. Bobby Jones is is a player for Ascendant Gaming. He is most known for playing for Team Kaliber for over 2.5 years. Bobby Jones is is a player for Ascendant Gaming. He is most known for playing for Team Kaliber for over 2.5 years.</span>
                                </div>
                                <div className={this.props.classes.roster_item_social_container}>
                                    <div className={this.props.classes.roster_item_social_icon}><i className="fa fa-twitter"/></div>
                                    <div className={this.props.classes.roster_item_social_icon}><i className="fa fa-facebook"/></div>
                                    <div className={this.props.classes.roster_item_social_icon}><i className="fa fa-instagram"/></div>
                                    <div className={this.props.classes.roster_item_social_icon}><i className="fa fa-youtube"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ObliviotOrganizationRosterItemComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( ObliviotOrganizationRosterItemComponentRender )
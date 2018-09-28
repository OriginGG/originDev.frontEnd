/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationSponsersItemComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.felzec_roster_item_container}>
                    <div className="ui stackable two column grid">
                        <div className="three wide column">
                            <div className={this.props.classes.sponser_item_img_container}>
                                <img className={this.props.classes.sponser_item_img} src={this.props.sponser_image}/>
                            </div>
                        </div>
                        <div className="thirteen wide column">
                            <div style={{
                                display: 'table',
                                paddingTop: '10px',
                                paddingBottom: '10px'
                            }}>
                                <div className={this.props.classes.felzec_roster_item_name_container}>
                                    <span className={this.props.classes.felzec_roster_name}>{this.props.sponser_name}</span>
                                </div>
                                <div className={this.props.classes.roster_item_about_container}>
                                    <span className={this.props.classes.felzec_roster_about_text}>{this.props.sponser_desc}</span>
                                </div>
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
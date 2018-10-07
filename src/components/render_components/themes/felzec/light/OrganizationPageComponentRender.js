/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationPageComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.lightObliotBG}>
                <div>
                    <img id="bg_img" alt="" className={this.props.classes.felzec_light_bg_img}/>
                    <div className={this.props.classes.obliviot_light_bg_filter} style={this.props.obliviot_page_style}/>
                    <div>
                        <header className={this.props.classes.felzec_lightHeader}>
                            <div >{this.props.navContent}</div>
                        </header>
                        <div id="sponsors">{this.props.topSponsorContent}</div>
                        <div id="blog">{this.props.blogContent}</div>
                        <div id="team_component">{this.props.teamContent}</div>
                        <div id="matches_container">{this.props.matchesContent}</div>
                        <div id="media_container">{this.props.mediaContent}</div>
                        <div id="roster_component" style={{
                            paddingTop: '30px'
                        }}>{this.props.rosterContent}</div>
                        <footer className={this.props.classes.obliviot_darkHeader}>
                            <div >{this.props.navContent}</div>
                        </footer>
                    </div>
                    <div className={this.props.classes.obliviot_orgFooter}>
                        <p className={this.props.classes.obliviot_orgFooterText}>© Origin. All rights reserved.</p>
                    </div>
                </div>
            </div>
        )
    }
}

LightOrganizationPageComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationPageComponentRender )
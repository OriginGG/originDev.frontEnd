/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationPageComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.lightFelzecBG}>
                <div>
                    <img id="bg_img" alt="" className={this.props.classes.felzec_light_bg_img}/>
                    <div className={this.props.classes.obliviot_light_bg_filter} style={this.props.obliviot_page_style}/>
                    <div>
                        <header className={this.props.classes.enigma2_darkHeader}>
                            <div >{this.props.navContent}</div>
                        </header>
                        <div id="sponsors">{this.props.topSponsorContent}</div>
                        <div id="blog">{this.props.blogContent}</div>
                        <div id="team_component">{this.props.teamContent}</div>
                        <div id="matches_container">{this.props.matchesContent}</div>
                        <div id="media_container">{this.props.mediaContent}</div>
                        <div id="roster_component" style={{
                            paddingTop: '0px',
                            paddingBottom: '0px'
                        }}>{this.props.rosterContent}</div>
                        <footer className={this.props.classes.felzec_darkFooter} style={this.props.felzec_footer_style}>
                            <div >{this.props.footerContent}</div>
                        </footer>
                    </div>
                </div>
            </div>
        )
    }
}

DarkOrganizationPageComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationPageComponentRender )
/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationMediaComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.e2_media_container}>
                <div className={this.props.classes.enigma2_media_container} style={this.props.bg_style}></div>
                <div className={this.props.classes.enigma2_media_filter_container} style={this.props.filter_style}/>
                <div className={this.props.classes.enigma2_media_inner_container}>
                    <div style={{
                        padding: '0px'
                    }} className="ui stackable three column grid">
                        <div className="five wide column">
                            <div className={this.props.classes.enigma2_switch_matches_title} style={this.props.switch_title_color}>STREAMS.</div>
                            <div className={this.props.classes.enigma2_switch_matches_description}>YOUTUBE AND TWITCH</div>
                            <div className={this.props.classes.enigma2_switch_container}>
                                <div className={this.props.classes.enigma2_switch_upcoming_container} style={this.props.upcoming_style} onClick={this.props.handleYoutubeClick}>YOUTUBE</div>
                                <div className={this.props.classes.enigma2_switch_recent_container} style={this.props.recent_style} onClick={this.props.handleTwitchClick}>TWITCH</div>
                            </div>
                        </div>
                        <div className="eleven wide column">
                            <div style={this.props.yt_style}>
                                <div className={this.props.classes.enigma2_media_element_container} ref={c => {
                                    this
                                        .props
                                        .storeRef( c );
                                }}>{this.props.youtube_videos}</div>
                            </div>
                            <div style={this.props.tw_style}>
                                <div className={this.props.classes.enigma2_media_element_container} ref={t => {
                                    this
                                        .props
                                        .storeRef2( t );
                                }}>{this.props.twitch_videos}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

DarkOrganizationMediaComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationMediaComponentRender )
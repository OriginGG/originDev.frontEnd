/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationMediaComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.felzec_matches_container}>
                <div className={this.props.classes.felzec_matches_container} style={this.props.bg_style}></div>
                <div className={this.props.classes.felzec_matches_filter_container} style={this.props.filter_style}/>
                <div className={this.props.classes.felzec_matches_inner_container}>
                    <div className={this.props.classes.felzec_switch_container}>
                        <div className={this.props.classes.felzec_switch_upcoming_container} style={this.props.youtube_style} onClick={this.props.handleYoutubeClick}>YOUTUBE</div>
                        <div className={this.props.classes.felzec_switch_recent_container} style={this.props.twitch_style} onClick={this.props.handleTwitchClick}>TWITCH</div>
                    </div>
                    <div style={this.props.yt_style}>
                        <div className={this.props.classes.felzec_media_element_container} ref={c => {
                            this
                                .props
                                .storeRef( c );
                        }}>{this.props.youtube_videos}</div>
                    </div>
                    <div style={this.props.tw_style}>
                        <div className={this.props.classes.felzec_media_element_container} ref={c => {
                            this
                                .props
                                .storeRef( c );
                        }}>{this.props.twitch_videos}</div>
                    </div>
                </div>
                <div className={this.props.classes.felzec_dark_twitch_left_arrow} onClick={this.props.handleLeftScroll}><i className="fa fa-arrow-left"/></div>
                <div className={this.props.classes.felzec_dark_twitch_right_arrow} onClick={this.props.handleRightScroll}><i className="fa fa-arrow-right"/></div>
            </div>
        )
    }
}

LightOrganizationMediaComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationMediaComponentRender )
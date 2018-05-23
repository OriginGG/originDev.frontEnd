/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class IndividualYoutubeStatsComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.individual_social_box}>
                    <h2 className={this.props.classes.individual_social_header}>
                        YouTube Stats
                    </h2>
                    <div id="channel_name" className={this.props.classes.individual_social_content}>
                        <h2 className={this.props.classes.individual_social_empty}>{this.props.channel_name}</h2>
                    </div>
                    <div id="yt_views" className={this.props.classes.indiviual_stats_container}>
                        <span className={this.props.classes.individual_stats_title}>Views:
                        </span>
                        <span className={this.props.classes.individual_stats_data}>{this.props.channel_views}</span>
                    </div>
                    <div id="yt_subscribers" className={this.props.classes.indiviual_stats_container}>
                        <span className={this.props.classes.individual_stats_title}>Subscribers:
                        </span>
                        <span className={this.props.classes.individual_stats_data}>{this.props.channel_subscribers}</span>
                    </div>
                    <div id="yt_comments" className={this.props.classes.indiviual_stats_container}>
                        <span className={this.props.classes.individual_stats_title}>Comments:
                        </span>
                        <span className={this.props.classes.individual_stats_data}>{this.props.channel_comments}</span>
                    </div>
                    <div id="yt_videos" className={this.props.classes.indiviual_stats_container}>
                        <span className={this.props.classes.individual_stats_title}>Videos:
                        </span>
                        <span className={this.props.classes.individual_stats_data}>{this.props.channel_videos}</span>
                    </div>
                    <div id="yt_vpv" className={this.props.classes.indiviual_stats_container}>
                        <span className={this.props.classes.individual_stats_title}>Views Per Video:
                        </span>
                        <span className={this.props.classes.individual_stats_data}>{this.props.channel_views_per_video}</span>
                    </div>
                </div>
            </div>
        )
    }
}

IndividualYoutubeStatsComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( IndividualYoutubeStatsComponentRender )
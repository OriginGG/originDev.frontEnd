/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class IndividualTwitterStatsComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.individual_social_box}>
                    <h2 className={this.props.classes.individual_social_header} onClick={( ) => {
                        this
                            .props
                            .handle_redirect( 'twitter' );
                    }}>
                        Twitter Stats
                    </h2>
                    <div id="twitter_stats" className={this.props.classes.individual_social_content}>
                        <h2 className={this.props.classes.individual_social_empty}>{this.props.twitter_username}</h2>
                        <span id="twitter_screen_name" className={this.props.classes.individual_social_content}>
                            <h2 className={this.props.classes.individual_social_empty}>{this.props.twitter_screen_name}</h2>
                        </span>
                    </div>
                    <div id="twitter_followers_count" className={this.props.classes.indiviual_stats_container}>
                        <span className={this.props.classes.individual_stats_title}>Followers:
                        </span>
                        <span className={this.props.classes.individual_stats_data}>{this.props.twitter_followers_count}</span>
                    </div>
                    <div id="twitter_status_count" className={this.props.classes.indiviual_stats_container}>
                        <span className={this.props.classes.individual_stats_title}>Tweets:
                        </span>
                        <span className={this.props.classes.individual_stats_data}>{this.props.twitter_status_count}</span>
                    </div>
                    <div id="twitter_favorites_count" className={this.props.classes.indiviual_stats_container}>
                        <span className={this.props.classes.individual_stats_title}>Favorites:</span>
                        <span className={this.props.classes.individual_stats_data}>{this.props.twitter_favourite_count}</span>
                    </div>
                </div>
            </div>
        )
    }
}

IndividualTwitterStatsComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( IndividualTwitterStatsComponentRender )
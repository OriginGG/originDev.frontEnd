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
                </div>
                <div id="twitter_stats" className={this.props.classes.individual_social_content}>
                    <h2 className={this.props.classes.individual_social_empty}>{this.props.username}</h2>
                    <h2 className={this.props.classes.individual_social_empty}/>
                </div>
                <div id="twitter_followers_count" className={this.props.classes.indiviual_stats_container}>
                    <span className={this.props.classes.individual_stats_title}>Followers:
                    </span>
                    <span className={this.props.classes.individual_stats_data}>{this.props.twitter_followers_count}</span>
                </div>
                <div id="twitter_statues_count" className={this.props.classes.indiviual_stats_container}>
                    <span className={this.props.classes.individual_stats_title}>Statuses:
                    </span>
                    <span className={this.props.classes.individual_stats_data}>{this.props.twitter_statues_count}</span>
                </div>
                <div id="twitter_favorites_count" className={this.props.classes.indiviual_stats_container}>
                    <span className={this.props.classes.individual_stats_title}>Favorites:</span>
                    <span className={this.props.classes.individual_stats_data}>{this.props.twitter_favorites_count}</span>
                </div>
            </div>
        )
    }
}

IndividualTwitterStatsComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( IndividualTwitterStatsComponentRender )
/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class IndividualTwitchStatsComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.individual_social_box}>
                    <h2 className={this.props.classes.individual_social_header} onClick={( ) => {
                        this
                            .props
                            .handle_redirect( 'youtube' );
                    }}>
                        Twitch Stats
                    </h2>
                    <div className={this.props.classes.individual_twitch_image_holder}>
                        <img className={this.props.classes.individual_twitch_image} src={this.props.twitch_image}/>
                    </div>
                    <div id="tw_name" className={this.props.classes.indiviual_stats_container}>
                        <span className={this.props.classes.individual_stats_title}>Name:
                        </span>
                        <span className={this.props.classes.individual_stats_data}>{this.props.twitch_name}</span>
                    </div>
                    <div id="tw_type" className={this.props.classes.indiviual_stats_container}>
                        <span className={this.props.classes.individual_stats_title}>Broadcst Type:
                        </span>
                        <span className={this.props.classes.individual_stats_data}>{this.props.twitch_type}</span>
                    </div>
                    <div id="tw_description" className={this.props.classes.indiviual_stats_description_container}>
                        <span className={this.props.classes.individual_stats_title}>Description:
                        </span>
                        <span className={this.props.classes.individual_stats_data}>{this.props.twitch_description}</span>
                    </div>
                    <div id="tw_views" className={this.props.classes.indiviual_stats_container}>
                        <span className={this.props.classes.individual_stats_title}>Views:
                        </span>
                        <span className={this.props.classes.individual_stats_data}>{this.props.twitch_views}</span>
                    </div>
                </div>
            </div>
        )
    }
}

IndividualTwitchStatsComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( IndividualTwitchStatsComponentRender )
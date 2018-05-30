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
                    <h2 className={this.props.classes.individual_social_header}>
                        Twitter Stats
                    </h2>
                    <div className={this.props.classes.individual_social_content}>{this.props.twitch_stats}</div>
                </div>
            </div>
        )
    }
}

IndividualTwitterStatsComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( IndividualTwitterStatsComponentRender )
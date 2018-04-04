/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class IndividualSocialStatsComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.individual_social_box}>
                    <h2 className={this.props.classes.individual_social_header}>
                        Twitch Stats
                    </h2>
                    <div className={this.props.classes.individual_social_content}>
                        <h2 className={this.props.classes.individual_social_empty}>No Data Found</h2>
                    </div>
                </div>
            </div>
        )
    }
}

IndividualSocialStatsComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( IndividualSocialStatsComponentRender )
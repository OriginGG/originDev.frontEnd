/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationMatchesComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div style={{
                    position: 'relative'
                }}>
                    <div className={this.props.classes.obliviot_light_matches_holder} ref={c => {
                        this.scrollRef = c;
                    }}>{this.props.recent_matches}</div>
                    <div className={this.props.classes.obliviot_dark_twitch_left_arrow} onClick={this.props.handleLeftScroll}><i className="fa fa-arrow-left"/></div>
                    <div className={this.props.classes.obliviot_dark_twitch_right_arrow} onClick={this.props.handleRightScroll}><i className="fa fa-arrow-right"/></div>
                </div>
            </div>
        )
    }
}

LightOrganizationMatchesComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationMatchesComponentRender )
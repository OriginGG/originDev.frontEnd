/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationTwitchHolderComponentRender extends Component {
    render( ) {
        return (
            <div style={{
                position: 'relative'
            }}>
                <div className={this.props.classes.obliviot_light_twitch_container} ref={c => {
                    this
                        .props
                        .storeRef( c );
                }}>{this.props.twitch_items}</div>
                <div className={this.props.classes.obliviot_dark_twitch_left_arrow} onClick={this.props.handleLeftScroll}><i className="fa fa-arrow-left"/></div>
                <div className={this.props.classes.obliviot_dark_twitch_right_arrow} onClick={this.props.handleRightScroll}><i className="fa fa-arrow-right"/></div>
            </div>
        )
    }
}

LightOrganizationTwitchHolderComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationTwitchHolderComponentRender )
/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationTwitchHolderComponentRender extends Component {
    insertScript = () => {
        const script = document.createElement("script");
        script.src="https://embed.twitch.tv/embed/v1.js";
        script.async = true;
        document.body.appendChild(script);
    }

    componentDidMount() {
        this.insertScript();
    }

    render() {
        return (
            <div style={{
                position: 'relative'
            }}>
                <div className={this.props.classes.obliviot_dark_twitch_container} ref={c => {
                    this
                        .props
                        .storeRef( c );
                }}>
                {this.props.twitch_items.map((a, i) => Object.assign(a, {key: i}))}</div>
                <div className={this.props.classes.obliviot_dark_twitch_left_arrow} onClick={this.props.handleLeftScroll}><i className="fa fa-arrow-left"/></div>
                <div className={this.props.classes.obliviot_dark_twitch_right_arrow} onClick={this.props.handleRightScroll}><i className="fa fa-arrow-right"/></div>
            </div>
        )
    }
}

DarkOrganizationTwitchHolderComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationTwitchHolderComponentRender )

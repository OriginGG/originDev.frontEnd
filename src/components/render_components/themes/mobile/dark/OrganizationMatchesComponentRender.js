/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationMatchesComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div style={{
                    position: 'relative'
                }}>
                    <div className={this.props.classes.obliviot_dark_matches_holder} ref={c => {
                        this
                            .props
                            .storeRef( c );
                    }}>{this.props.recent_matches}</div>
                    <div className={this.props.classes.obliviot_dark_matches_left_arrow} onClick={this.props.handleLeftScroll}><i className="fa fa-arrow-left"/></div>
                    <div className={this.props.classes.obliviot_dark_matches_right_arrow} onClick={this.props.handleRightScroll}><i className="fa fa-arrow-right"/></div>
                </div>
            </div>
        )
    }
}

DarkOrganizationMatchesComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationMatchesComponentRender )
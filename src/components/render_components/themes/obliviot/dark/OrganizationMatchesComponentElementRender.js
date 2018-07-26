/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationMatchesComponentElementRender extends Component {
    render( ) {
        return (
            <div>
                <div className="column">
                    <div className={this.props.classes.obliviot_dark_match_container}>
                        <div className={this.props.classes.obliviot_dark_match_vs_container}>
                            <img className={this.props.classes.obliviot_dark_match_vs_image} src={this.props.matches_image_1}/>
                            <div className={this.props.classes.obliviot_dark_match_vs_score}>{this.props.matches_score}</div>
                            <img className={this.props.classes.obliviot_dark_match_vs_image} src={this.props.matches_image_2}/>
                        </div>
                        <div className={this.props.classes.obliviot_dark_match_vs_date}>{this.props.matches_date}</div>
                        <div className={this.props.classes.obliviot_dark_corner_win}/>
                    </div>
                </div>
            </div>
        )
    }
}

DarkOrganizationMatchesComponentElementRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationMatchesComponentElementRender )
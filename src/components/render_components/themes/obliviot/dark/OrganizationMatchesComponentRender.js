/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationMatchesComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.darkNavBG}>
                <div className="column">
                    <div className={this.props.classes.obliviot_dark_match_container}>
                        <div className={this.props.classes.obliviot_dark_match_vs_container}>
                            <img className={this.props.classes.obliviot_dark_match_vs_image}/>
                            <div className={this.props.classes.obliviot_dark_match_vs_score}>10-8</div>
                            <img className={this.props.classes.obliviot_dark_match_vs_image}/>
                        </div>
                        <div className={this.props.classes.obliviot_dark_match_vs_date}>22 AUG 2018</div>
                        <div className={this.props.classes.obliviot_dark_corner_win}/>
                    </div>
                </div>
            </div>
        )
    }
}

DarkOrganizationMatchesComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationMatchesComponentRender )
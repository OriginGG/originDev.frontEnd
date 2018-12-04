/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class IndividualPageComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.individual_bg}>
                    <div className={this.props.classes.individual_inner_bg}>
                        <div className={this.props.classes.individual_header}>
                            <img className={this.props.classes.individual_header_image} src={this.props.bannerImageUrl}/>
                            <div id="edit_button" className={this.props.classes.individual_edit_button} onClick={this.props.handleEditClick} style={this.props.button_style}>
                                Edit
                            </div>
                            <div id="login_button" className={this.props.classes.individual_login_button} onClick={this.props.handleLoginClick} style={this.props.login_button_style}>
                                Login
                            </div>
                        </div>
                        <div className="ui stackable two column grid">
                            <div className="six wide column">
                                <div className="ui one column grid">
                                    <div id="basic_info" className="column">{this.props.ColumnOne}</div>
                                </div>
                            </div>
                            <div className="ten wide column">
                                <div className="ui stackable grid">
                                    <div className="eight wide column">
                                        <div className="ui one column grid">
                                            <div id="stats_left" className="column">{this.props.ColumnTwo}</div>
                                        </div>
                                    </div>
                                    <div className="eight wide column">
                                        <div className="ui one column grid">
                                            <div id="stats_right" className="column">{this.props.ColumnThree}</div>
                                        </div>
                                    </div>
                                    <div className="eight wide column">
                                        <div className="ui one column grid">
                                            <div id="stats_leftbottom" className="column">{this.props.ColumnFour}</div>
                                        </div>
                                    </div>
                                    <div className="eight wide column">
                                        <div className="ui one column grid">
                                            <div id="stats_rightbottom" className="column">{this.props.ColumnFive}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={this.props.classes.individual_footer}>
                        © Origin 2018. All rights reserved.
                    </div>
                </div>
            </div>
        )
    }
}

IndividualPageComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( IndividualPageComponentRender )
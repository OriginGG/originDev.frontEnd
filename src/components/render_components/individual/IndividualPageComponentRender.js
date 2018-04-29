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
                            <div id="edit_button" className={this.props.classes.individual_edit_button}>
                                Edit
                            </div>
                        </div>
                        <div className="ui stackable three column grid">
                            <div className="column">
                                <div className="ui one column grid">
                                    <div id="basic_info" className="column">{this.props.ColumnOne}</div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="ui one column grid">
                                    <div id="stats_left" className="column">{this.props.ColumnTwo}</div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="ui one column grid">
                                    <div id="stats_right" className="column">{this.props.ColumnThree}</div>
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
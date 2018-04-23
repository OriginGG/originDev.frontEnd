/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class SignupChoiceComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div id="sign_up" className={this.props.classes.choiceModal}>
                    <div className="ui stackable two column grid">
                        <div className="column">
                            <div>
                                <div className={this.props.classes.landing_page_join_button}>Organization</div>
                            </div>
                        </div>
                        <div className="column">
                            <div>
                                <div className={this.props.classes.landing_page_join_button}>Individual</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SignupChoiceComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( SignupChoiceComponentRender )
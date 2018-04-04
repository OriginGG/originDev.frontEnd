/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class IndividualBasicInfoComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.individual_basic_container}>
                    <div className={this.props.classes.individual_profile_pic_container}>
                        <img className={this.props.classes.individual_profile_pic}/>
                    </div>
                    <div className={this.props.classes.individual_basic_name}>John Doe</div>
                    <div className={this.props.classes.individual_basic_handle}>@JohnDoe</div>
                    <div className={this.props.classes.individual_table_container}>
                        <table className="ui table">
                            <thead>
                                <tr>
                                    <th className="sixteen wide">Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <i className="icon mail"/>
                                        Email Address
                                        <div className={this.props.classes.individual_basic_text}>
                                            <p id="basic_email">johndoe@origin.gg</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <i className="icon phone"/>Contact Number
                                        <div className={this.props.classes.individual_basic_text}>
                                            <p id="basic_phone">4155555555</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><i className="icon user"/>About
                                        <div className={this.props.classes.individual_basic_text}>
                                            <p id="basic_about">
                                                blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={this.props.classes.individual_accomplishment_container}>
                            <h2 className={this.props.classes.individual_accomplishment_header}>Accomplishments</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

IndividualBasicInfoComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( IndividualBasicInfoComponentRender )
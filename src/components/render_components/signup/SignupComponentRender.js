/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class SignupComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div id="sign_up" className={this.props.classes.signupModal}>
                    <div className={this.props.classes.tabular_menu}>
                        <div className={this.props.classes.tabular_menu_item_active}>Sign Up</div>
                        <div className={this.props.classes.tabular_menu_item} onClick={this.props.handleClick}>Sign In</div>
                    </div>
                    <div className={this.props.classes.signupModalContent}>
                        <form className="ui large form" onSubmit={this.props.handleSubmit}>
                            <div className="ui stacked segment">
                                <div className={this.props.classes.form_body}>
                                    <div className={this.props.classes.input_title}>
                                        First Name
                                    </div>
                                    <div className="field">
                                        <div className="ui input">
                                            <input type="text" name="firstName" placeholder="First Name" style={{
                                                backgroundColor: 'transparent',
                                                borderColor: '#fff',
                                                color: '#fff',
                                                height: '45px',
                                                fontSize: '16px'
                                            }} className={this.props.classes.input_box} onBlur={this.props.handleBlur} onChange={this.props.handleChange} value={this.props.values.firstName}/>
                                        </div>
                                    </div>
                                    <div className={this.props.classes.input_title}>
                                        Last Name
                                    </div>
                                    <div className="field">
                                        <div className="ui input">
                                            <input type="text" name="lastName" placeholder="Last Name" style={{
                                                backgroundColor: 'transparent',
                                                borderColor: '#fff',
                                                color: '#fff',
                                                height: '45px',
                                                fontSize: '16px'
                                            }} className={this.props.classes.input_box} onBlur={this.props.handleBlur} onChange={this.props.handleChange} value={this.props.values.lastName}/>
                                        </div>
                                    </div>
                                    <div style={this.props.user_style}>
                                        <div className={this.props.classes.input_title}>
                                            Username
                                        </div>
                                        <div className="field">
                                            <div className="ui input">
                                                <input type="text" name="userName" placeholder="Username" style={{
                                                    backgroundColor: 'transparent',
                                                    borderColor: '#fff',
                                                    color: '#fff',
                                                    height: '45px',
                                                    fontSize: '16px'
                                                }} className={this.props.classes.input_box} onBlur={this.props.handleBlur} onChange={this.props.handleChange} value={this.props.values.userName}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={this.props.classes.input_title}>
                                        Email Address
                                    </div>
                                    <div className="field">
                                        <div className="ui input">
                                            <input type="text" name="email" placeholder="E-mail address" style={{
                                                backgroundColor: 'transparent',
                                                borderColor: '#fff',
                                                color: '#fff',
                                                height: '45px',
                                                fontSize: '16px'
                                            }} className={this.props.classes.input_box} onBlur={this.props.handleBlur} onChange={this.props.handleChange} value={this.props.values.email}/>
                                        </div>
                                    </div>
                                    <div className={this.props.classes.input_title}>
                                        Password
                                    </div>
                                    <div className="field">
                                        <div className="ui input">
                                            <input type="password" name="password" placeholder="Password" style={{
                                                backgroundColor: 'transparent',
                                                borderColor: '#fff',
                                                color: '#fff',
                                                height: '45px',
                                                fontSize: '16px'
                                            }} className={this.props.classes.input_box} onBlur={this.props.handleBlur} onChange={this.props.handleChange} value={this.props.values.password}/>
                                        </div>
                                    </div>
                                    <div >{this.props.createAccountButton}</div>
                                    <div className={this.props.classes.submit_divider}/>
                                    <div className={this.props.classes.submit_or}>OR</div>
                                    <div className={this.props.classes.social_box_outer}>
                                        <div className={this.props.classes.social_box_inner}>
                                            <div className={this.props.classes.social_box_left}>
                                                <img className={this.props.classes.social_image_box}/>
                                                <div className={this.props.classes.social_text_box}>
                                                    Facebook
                                                </div>
                                            </div>
                                        </div>
                                        <div className={this.props.classes.social_box_inner}>
                                            <div className={this.props.classes.social_box_right}>
                                                <img className={this.props.classes.social_image_box}/>
                                                <div className={this.props.classes.social_text_box}>
                                                    Twitch
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ui error message"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

SignupComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( SignupComponentRender )
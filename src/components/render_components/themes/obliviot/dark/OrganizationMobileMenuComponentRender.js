/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationMobileMenuComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.dark_mobile_menu}>
                    <div className={this.props.classes.dark_mobile_menu_item}>
                        <a className={this.props.classes.dark_mobile_menu_item_box}>
                            Home
                        </a>
                    </div>
                    <div className={this.props.classes.dark_mobile_menu_item}>
                        <a className={this.props.classes.dark_mobile_menu_item_box} onClick={this.props.handleAboutClick}>
                            About
                        </a>
                    </div>
                    <div className={this.props.classes.dark_mobile_menu_item}>
                        <a className={this.props.classes.dark_mobile_menu_item_box} onClick={this.props.handleStoreClick}>
                            Store
                        </a>
                    </div>
                    <div className={this.props.classes.dark_mobile_menu_item}>
                        <a className={this.props.classes.dark_mobile_menu_item_box} onClick={this.props.handleLoginClick}>
                            Login
                        </a>
                    </div>
                    <div className={this.props.classes.dark_mobile_menu_item}>
                        <a className={this.props.classes.dark_mobile_menu_item_box} onClick={( ) => {
                            this
                                .props
                                .handleSocial( 'fb' );
                        }}>
                            Facebook
                        </a>
                    </div>
                    <div className={this.props.classes.dark_mobile_menu_item}>
                        <a className={this.props.classes.dark_mobile_menu_item_box} onClick={( ) => {
                            this
                                .props
                                .handleSocial( 'twitter' );
                        }}>
                            Twitter
                        </a>
                    </div>
                    <div className={this.props.classes.dark_mobile_menu_item}>
                        <a className={this.props.classes.dark_mobile_menu_item_box} onClick={( ) => {
                            this
                                .props
                                .handleSocial( 'youtube' );
                        }}>
                            Youtube
                        </a>
                    </div>
                    <div className={this.props.classes.dark_mobile_menu_item} style={this.props.mobile_roster_item}>
                        <div className={this.props.classes.dark_mobile_menu_item_box}>
                            Rosters
                        </div>
                        <div >{this.props.rosterContent}</div>
                    </div>
                </div>
            </div>
        )
    }
}

DarkOrganizationMobileMenuComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationMobileMenuComponentRender )
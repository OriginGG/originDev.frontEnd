/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationNavComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.darkBG}>
                <div className={this.props.classes.nav_left}>
                    <div className={this.props.classes.nav_header}>
                        <img id="nav_img" alt="" className={this.props.classes.nav_img}/>
                    </div>
                    <div className={this.props.classes.social_menu_container}>
                        <div className={this.props.classes.social_menu_dark_item}>
                            <i className="fa fa-instagram"/>
                        </div>
                        <div className={this.props.classes.social_menu_dark_item}>
                            <i className="fa fa-twitter"/>
                        </div>
                    </div>
                </div>
                <div className={this.props.classes.nav_right}>
                    <div className={this.props.classes.org_menu_container}>
                        <a href="#video_cont">
                            <div className={this.props.classes.org_menu_dark_item}>Video</div>
                        </a>
                        <a href="#news_cont">
                            <div className={this.props.classes.org_menu_dark_item}>News</div>
                        </a>
                        <a href="#">
                            <div id="about_button" className={this.props.classes.org_menu_dark_item}>About</div>
                        </a>
                        <a href="#home_cont">
                            <div className={this.props.classes.org_menu_dark_item}>Home</div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

DarkOrganizationNavComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationNavComponentRender )
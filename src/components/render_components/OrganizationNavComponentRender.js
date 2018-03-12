/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationNavComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.nav_left}>
                    <div className={this.props.classes.nav_header}>
                        <img id="nav_img" alt="" className={this.props.classes.nav_img} src={this.props.image_src}/>
                    </div>
                    <div className={this.props.classes.social_menu_container}>
                        <div className={this.props.classes.social_menu_item}>
                            <i className="fa fa-instagram"/>
                        </div>
                        <div className={this.props.classes.social_menu_item}>
                            <i className="fa fa-twitter"/>
                        </div>
                    </div>
                </div>
                <div className={this.props.classes.nav_right}>
                    <div className={this.props.classes.org_menu_container}>
                        <div className={this.props.classes.org_menu_item}>News</div>
                        <div className={this.props.classes.org_menu_item}>About</div>
                        <div className={this.props.classes.org_menu_item}>Home</div>
                    </div>
                </div>
            </div>
        )
    }
}

OrganizationNavComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationNavComponentRender )
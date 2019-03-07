/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationAdminPageComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div id="toggle" className="ui top attached demo menu">
                    <a className="item" onClick={this.props.handleClick}>
                        <i className="sidebar icon"/>
                        Menu
                    </a>
                </div>
                <div className="ui bottom attached segment pushable">
                    <div id="admin_menu" className="ui inverted labeled icon left inline vertical wide sidebar menu"></div>
                    <div>
                        <div className="ui basic segment">
                            <div className={this.props.classes.admin_main}>{this.props.admin_content}</div>
                        </div>
                    </div>
                </div>
                <div className={this.props.classes.admin_navigate_button} style={this.props.navigate_style} onClick={this.props.handleNavClick}>Navigate To Your Site</div>
            </div>
        )
    }
}

OrganizationAdminPageComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminPageComponentRender )
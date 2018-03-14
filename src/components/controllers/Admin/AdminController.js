import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { push as Menu } from 'react-burger-menu';
import { GlobalStyles } from 'Theme/Theme';
import OrganizationAdminPageComponentRender from '../../render_components/OrganizationAdminPageComponentRender';
import OrganizationAdminMenuComponentRender from '../../render_components/OrganizationAdminMenuComponentRender';
// import PropTypes from 'prop-types';

class AdminPageController extends Component {
    state = { isOpen: false };
    handleClick = () => {
        this.setState({ isOpen: true });
    }
    render() {
        return (
            <div id="outer-container">
                <Menu width="350px" pageWrapId="scaleDown" outerContainerId="outer-container" isOpen={this.state.isOpen}>
                    <div id="aaa_menu" style={{ height: '100%', backGroundColor: 'black' }} >
                        <OrganizationAdminMenuComponentRender  />
                    </div>
                </Menu>
                <main id="scaleDown">
                    <OrganizationAdminPageComponentRender handleClick={this.handleClick} />
                </main>
            </div>
        );
    }
}

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminPageController));

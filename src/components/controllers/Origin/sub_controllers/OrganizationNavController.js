import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
// import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import OrganizationNavComponentRender from '../../../render_components/OrganizationNavComponentRender';

class OrganizationNavController extends Component {
    render() {
        return <OrganizationNavComponentRender />;
    }
}

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationNavController));

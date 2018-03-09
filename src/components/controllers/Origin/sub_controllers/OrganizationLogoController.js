import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
// import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import OrganizationLogoComponentRender from '../../../render_components/OrganizationLogoComponentRender';

class OrganizationLogoController extends Component {
    render() {
        return <OrganizationLogoComponentRender />;
    }
}

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationLogoController));

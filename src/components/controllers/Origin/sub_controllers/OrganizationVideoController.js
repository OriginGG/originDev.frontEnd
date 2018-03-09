import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
// import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import OrganizationVideoComponentRender from '../../../render_components/OrganizationVideoComponentRender';

// import { getOrganisationQuery } from './queries/organisation'
class OrganizationVideoController extends Component {
    render() {
        return <OrganizationVideoComponentRender />;
    }
}
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationVideoController));

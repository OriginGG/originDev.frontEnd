import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
// import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import OrganizationSponsorComponentRender from '../../../render_components/OrganizationSponserComponentRender';

// import { getOrganisationQuery } from './queries/organisation'
class OrganizationSponsorController extends Component {
    render() {
        return <OrganizationSponsorComponentRender />;
    }
}
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationSponsorController));

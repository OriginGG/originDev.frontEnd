import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
// import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import OriginSponsorComponentRender from '../../../render_components/OrganizationSponserComponentRender';

// import { getOrganisationQuery } from './queries/organisation'
class OriginSponsorController extends Component {
    render() {
        return <OriginSponsorComponentRender />;
    }
}
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OriginSponsorController));

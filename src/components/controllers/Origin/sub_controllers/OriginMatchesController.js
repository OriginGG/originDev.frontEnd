import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
// import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import OriginMatchesComponentRender from '../../../render_components/OrganizationMatchesComponentRender';

// import { getOrganisationQuery } from './queries/organisation'
class OriginMatchesController extends Component {
    render() {
        return <OriginMatchesComponentRender />;
    }
}
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OriginMatchesController));

import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
// import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import OriginTwitterComponentRender from '../../../render_components/OrganizationTwitterComponentRender';

// import { getOrganisationQuery } from './queries/organisation'
class OriginTwitterController extends Component {
    render() {
        return <OriginTwitterComponentRender />;
    }
}
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OriginTwitterController));

import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { graphql } from 'react-apollo';
// import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import { recentMatchesQuery } from '../../../../queries/matches';
import OrganizationMatchesComponentRender from '../../../render_components/OrganizationMatchesComponentRender';

// import { getOrganisationQuery } from './queries/organisation'
class OrganizationMatchesController extends Component {
    render() {
        if (this.props.data.loading === true) {
            return null;
        }
        return <OrganizationMatchesComponentRender />;
    }
}
OrganizationMatchesController.propTypes = {
    data: PropTypes.object.isRequired,
};

export default graphql(recentMatchesQuery, {
    withRef: true,
    options: props => ({
        fetchPolicy: 'network-only',
        variables: {
            organisation: props.subDomain
        }
    })
})(inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationMatchesController)));


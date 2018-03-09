import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { GlobalStyles } from 'Theme/Theme';
import PropTypes from 'prop-types';
import OrganizationPageComponentRender from '../../render_components/OrganizationPageComponentRender';
import OrganizationVideoController from './sub_controllers/OrganizationVideoController';
import OrganizationTwitterController from './sub_controllers/OrganizationTwitterController';
import OrganizationSponsorController from './sub_controllers/OrganizationSponsorController';
import OrganizationMatchesController from './sub_controllers/OrganizationMatchesController';
import OrganizationNavController from './sub_controllers/OrganizationNavController';
import OrganizationLogoController from './sub_controllers/OrganizationLogoController';
import OrganizationNewsController from './sub_controllers/OrganizationNewsController';
import { getOrganisationQuery } from '../../../queries/organisation';

class OrganizationPageController extends Component {
    state = { visible: false };

    componentWillMount = async () => {
        const domainInfo = this.props.appManager.getDomainInfo();
        const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_THEME_NAME : domainInfo.subDomain;
        const o = await this.props.appManager.executeQuery('query', getOrganisationQuery, { subDomain });
        if (o.resultData === null) {
            console.log('sub domain does not exist!');
        } else {
            this.props.uiStore.setOrganisation(o.resultData);
            this.props.uiStore.setSubDomain(subDomain);
            this.setState({ visible: true });
        }
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { subDomain } = this.props.uiStore.current_organisation;
        return (<OrganizationPageComponentRender
            newsContent={<OrganizationNewsController />}
            twitterContent={<OrganizationTwitterController />}
            matchesContent={<OrganizationMatchesController subDomain={subDomain} />}
            videoContent={<OrganizationVideoController />}
            topSponsorContent={<OrganizationSponsorController />}
            bottomSponsorContent={<OrganizationSponsorController />}
            navContent={<OrganizationNavController />}
            logoContent={<OrganizationLogoController />}
        />);
    }
}
OrganizationPageController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationPageController));

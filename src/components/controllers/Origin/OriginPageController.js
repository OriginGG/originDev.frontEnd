import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { GlobalStyles } from 'Theme/Theme';
import PropTypes from 'prop-types';
import OrganizationPageComponentRender from '../../render_components/OrganizationPageComponentRender';
import OriginVideoController from './sub_controllers/OriginVideoController';
import OriginTwitterController from './sub_controllers/OriginTwitterController';
import OriginSponsorController from './sub_controllers/OriginSponsorController';
import OriginMatchesController from './sub_controllers/OriginMatchesController';
import { getOrganisationQuery } from '../../../queries/organisation';

class OriginPageController extends Component {
    state = { visible: false };

    componentWillMount = async () => {
        const domainInfo = this.props.appManager.getDomainInfo();
        const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_THEME_NAME : domainInfo.subDomain;
        const o = await this.props.appManager.executeQuery('query', getOrganisationQuery, { subDomain });
        if (o.resultData === null) {
            console.log('sub domain does not exist!');
        } else {
            this.props.uiStore.setOrganisation(o.resultData);
            this.setState({ visible: true });
        }
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        return (<OrganizationPageComponentRender
            newsContent={<div>Some news</div>}
            twitterContent={<OriginTwitterController />}
            matchesContent={<OriginMatchesController />}
            videoContent={<OriginVideoController />}
            topSponsorContent={<OriginSponsorController />}
            bottomSponsorContent={<OriginSponsorController />}
        />);
    }
}
OriginPageController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OriginPageController));

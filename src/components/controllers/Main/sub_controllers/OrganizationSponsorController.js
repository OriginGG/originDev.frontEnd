import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import OrganizationSponsorComponentRender from '../../../render_components/OrganizationSponserComponentRender';
import { getSponsorsQuery } from '../../../../queries/sponsors';

// import { getOrganisationQuery } from './queries/organisation'
class OrganizationSponsorController extends Component {
    state = { visible: false };
    componentWillMount = async () => {
        const subDomain = this.props.uiStore.current_subdomain;
        const sponsor_data = await this.props.appManager.executeQueryAuth('query', getSponsorsQuery, { subDomain });
        if (sponsor_data.resultData.edges.length > 0) {
            this.sponsor_image1 = sponsor_data.resultData.edges[0].node.sponsor1;
            this.sponsor_image2 = sponsor_data.resultData.edges[0].node.sponsor2;
            this.sponsor_image3 = sponsor_data.resultData.edges[0].node.sponsor3;
            this.sponsor_image4 = sponsor_data.resultData.edges[0].node.sponsor4;
        }
        this.setState({ visible: true });
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        return <OrganizationSponsorComponentRender
            sponsor_image1={this.sponsor_image1}
            sponsor_image2={this.sponsor_image2}
            sponsor_image3={this.sponsor_image3}
            sponsor_image4={this.sponsor_image4}
        />;
    }
}
OrganizationSponsorController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationSponsorController));

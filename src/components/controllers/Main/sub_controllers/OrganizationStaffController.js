import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { GlobalStyles } from 'Theme/Theme';
import { staffOptions } from '../../Admin/sub_controllers/data/AllPositions';
import { getAllStaffQuery } from '../../../../queries/staff';
import blankProfileImage from '../../../../assets/images/blank_person.png';

// import { getOrganisationQuery } from './queries/organisation'
class OrganizationStaffController extends Component {
    state = { visible: false };
    componentDidMount = async () => {
        const subDomain = this.props.uiStore.current_subdomain;

        // const theme = this.props.uiStore.current_organisation.themeId;
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        const OrganizationRosterItemComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationRosterItemComponentRender`);
        const OrganizationAboutModalComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationAboutModalComponentRender`);
        const roster_data = await this.props.appManager.executeQuery('query', getAllStaffQuery, { subDomain });
        const outer_edges = roster_data.allStaff.edges;
        let p_array = [];
        for (let outer in outer_edges) {                // eslint-disable-line
            const { edges } = outer_edges[outer].node.staffIndividualsByStaffId;
            const p_type = outer_edges[outer].node.positionId;
            const tx = _.find(staffOptions, o => o.position_id === p_type).text;
            const ed_array = [];
            edges.forEach((ed) => {
                const pm = JSON.parse(JSON.stringify(ed));
                pm.node.individualUserByIndividualId.position = tx;
                ed_array.push(pm);
            });
            p_array = p_array.concat(ed_array);
        }
        this.setState({
            roster_list: p_array,
            visible: true,
            OrganizationAboutModalComponentRender: OrganizationAboutModalComponentRender.default,
            OrganizationRosterItemComponentRender: OrganizationRosterItemComponentRender.default
        });
    }
    // handleClick = (link) => {
    //     if (link) {
    //         window.open(link, '_blank');
    //     }
    // }

    handleClick = (i) => {              // eslint-disable-line
        // const x = this.props.appManager.getDomainInfo();
        // let p = x.hostname;
        // if (p.indexOf(x.subDomain) > -1) {
        //     p = p.substr(x.subDomain.length + 1, p.length);
        //     let pt = '';
        //     if (x.port) {
        //         pt = `:${x.port}`;
        //     }
        //     const url = `${x.protocol}//${p}${pt}/individual?u=${i}`;
        //     window.open(url, '_blank');
        // }
    }

    handle_social = (s, ind_user) => {
        switch (s) {
            case 'twitter': {
                const p_string = `https://twitter.com/${ind_user.twitterHandle}`;
                window.open(p_string, '_blank');
                break;
            }
            case 'facebook': {
                window.open(ind_user.facebookLink, '_blank');
                break;
            }
            case 'instagram': {
                window.open(ind_user.instagramLink, '_blank');
                break;
            }
            default: {
                break;
            }
        }
        console.log(s);
    }

    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { OrganizationRosterItemComponentRender } = this.state;
        const { OrganizationAboutModalComponentRender } = this.state;
        const p_array = [];
        this.state.roster_list.forEach((r, i) => {
            const { individualUserByIndividualId } = r.node;
            let im = blankProfileImage;
            if (individualUserByIndividualId.profileImageUrl) {
                im = individualUserByIndividualId.profileImageUrl;
            }
            let twitter_style = { display: 'inherit' };
            if (!individualUserByIndividualId.twitterHandle) {
                twitter_style = { display: 'none' };
            }
            let facebook_style = { display: 'inherit' };
            if (!individualUserByIndividualId.facebookLink) {
                facebook_style = { display: 'none' };
            }
            let youtube_style = { display: 'inherit' };
            if (!individualUserByIndividualId.youtubeChannel) {
                youtube_style = { display: 'none' };
            }
            let instagram_style = { display: 'inherit' };
            if (!individualUserByIndividualId.instagramLink) {
                instagram_style = { display: 'none' };
            }
            p_array.push(<div role="menuItem" tabIndex={-1} onClick={() => { this.handleClick(individualUserByIndividualId.id); }} key={`roster_gm_list_${i}`} style={{ cursor: 'pointer' }}><OrganizationRosterItemComponentRender
                roster_nickname={individualUserByIndividualId.position}
                roster_about={individualUserByIndividualId.about}
                roster_name={individualUserByIndividualId.firstName}
                roster_image={im}
                ind_user={individualUserByIndividualId}
                handle_social={this.handle_social}
                twitter_style={twitter_style}
                facebook_style={facebook_style}
                youtube_style={youtube_style}
                instagram_style={instagram_style}
            /></div>);
        });
        return (<div>
            <OrganizationAboutModalComponentRender extra_style={{ display: 'inherit' }} about_title={this.props.about_title} about_content={this.props.about_content} />
            <div
                onClick={this.props.closeStaff}
                tabIndex={-1}
                role="menuItem"
                style={{
                    cursor: 'pointer',
                    fontSize: 28,
                    position: 'absolute',
                    right: 32,
                    top: 94,
                    zIndex: 10000,
                    color: 'white',
                }}><span className="fa fa-window-close" /></div>
            {p_array}</div>);
    }
}
OrganizationStaffController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    closeStaff: PropTypes.func.isRequired,
    about_title: PropTypes.string.isRequired,
    about_content: PropTypes.string.isRequired
};
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationStaffController));

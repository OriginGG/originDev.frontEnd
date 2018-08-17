import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
// import axios from 'axios';
// mport _ from 'lodash';
import { GlobalStyles } from 'Theme/Theme';
import { getOrganisationMembersQuery } from '../../../../queries/members.js';
// import { gameOptions } from '../../Admin/sub_controllers/data/AllGames';
// import { staffOptions } from '../../Admin/sub_controllers/data/AllPositions';
// import { getAllStaffQuery } from '../../../../queries/staff';

// import { getOrganisationQuery } from './queries/organisation'
class OrganizationTwitchController extends Component {
    state = { visible: false };
    componentDidMount = async () => {
        // const theme = this.props.uiStore.current_organisation.themeId;
        // const subDomain = this.props.uiStore.current_subdomain;
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        const OrganizationTwitchComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationTwitchComponentRender`);
        const OrganizationTwitchHolderComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationTwitchHolderComponentRender`);

        // const roster_data = await this.props.appManager.executeQuery('query', getAllStaffQuery, { subDomain });
        // const outer_edges = roster_data.allStaff.edges;
        // let p_array = [];
        // for (let outer in outer_edges) {                // eslint-disable-line
        //     const { edges } = outer_edges[outer].node.staffIndividualsByStaffId;
        //     const p_type = outer_edges[outer].node.positionId;
        //     const tx = _.find(staffOptions, o => o.position_id === p_type).text;
        //     const ed_array = [];
        //     console.log(`staff = ${JSON.stringify(edges)}`);
        //     edges.forEach((ed) => {
        //         const pm = JSON.parse(JSON.stringify(ed));
        //         pm.node.individualUserByIndividualId.position = tx;
        //         ed_array.push(pm);
        //     });
        //     p_array = p_array.concat(ed_array);
        // }

        const users = await this.props.appManager.executeQuery('query', getOrganisationMembersQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
        const t_array = [];
        this.current_game_node = users.allOrganisationMembers.edges;
        let twitch_url = 'https://api.twitch.tv/helix/streams?user_login=';
        users.allOrganisationMembers.edges.forEach(n => {
            if (n.node.contentTeamsByMemberId.nodes.length > 0) {
                t_array.push(n.node.individualUserByIndividalUserId);
                twitch_url += `${n.node.individualUserByIndividalUserId.twitchUrl},`;
            }
        });
        console.log(`twitch url = ${twitch_url}`);
        console.log(`staff = ${JSON.stringify(t_array)}`);
        this.setState({
            roster_list: t_array,
            visible: true,
            OrganizationTwitchComponentRender: OrganizationTwitchComponentRender.default,
            OrganizationTwitchHolderComponentRender: OrganizationTwitchHolderComponentRender.default
        });
    }

    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { OrganizationTwitchComponentRender } = this.state;
        const { OrganizationTwitchHolderComponentRender } = this.state;
        const p_array = [];
        this.state.roster_list.forEach((r, i) => {
            console.log(i);
            console.log(`url = ${r.twitchUrl}`);
            const t_url = `https://player.twitch.tv/?channel=${r.twitchUrl}`;
            // const t_url = '';
            p_array.push(<OrganizationTwitchComponentRender
                twitch_url={t_url}
            />);
        });
        return (<OrganizationTwitchHolderComponentRender twitch_items={p_array} />);
    }
}
OrganizationTwitchController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationTwitchController));

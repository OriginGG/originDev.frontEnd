import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import axios from 'axios';
// mport _ from 'lodash';
import { GlobalStyles } from 'Theme/Theme';
import { getRosterQuery } from '../../../../queries/rosters.js';
// import { getOrganisationMembersQuery } from '../../../../queries/members.js';
import offline_image from '../../../../assets/images/game_images/twitch_offline.png';
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

        let team_l = null;
        if (this.props.uiStore.current_organisation.streamTeamUrl) {
            team_l = await axios.get(`${process.env.REACT_APP_API_SERVER}/twitch/get-team-member?teamurl=${this.props.uiStore.current_organisation.streamTeamUrl}`);
            // console.log(`NEW TEAM CALL ${JSON.stringify(team_l)}`);
        } else {
            console.log('no team name');
        }

        const users = await this.props.appManager.executeQuery('query', getRosterQuery, { subDomain: this.props.uiStore.current_organisation.subDomain, rosterType: 'content_team' });
        // console.log(`test_users = ${JSON.stringify(users)}`);
        // const old_users = await this.props.appManager.executeQuery('query', getOrganisationMembersQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
        // console.log(`old_users = ${JSON.stringify(old_users)}`);
        const t_array = [];
        this.current_game_node = users.allCombinedRosters.edges;
        let twitch_url = '';
        const from_list = users.allCombinedRosters.edges[0];
        if (from_list) {
            from_list.node.combinedRosterIndividualsByRosterId.edges.forEach(n => {
                // console.log(`INSIDE TWITCH LOOP = ${JSON.stringify(n)}`);
                // console.log(`users.allOrganisationMembers.edges = ${JSON.stringify(users.allOrganisationMembers.edges)}`);
                // console.log(`n.node.contentTeamsByMemberId.nodes.length = ${n.node.contentTeamsByMemberId.nodes.length}`);
                // console.log(`n.node.individualUserByIndividalUserId.twitchUrl = ${n.node.individualUserByIndividalUserId.twitchUrl}`);
                // if (n.length > 0) {
                    if (n.node.individualUserByIndividualId.twitchUrl) {
                        t_array.push(n.node.individualUserByIndividualId);
                        twitch_url += `${n.node.individualUserByIndividualId.twitchUserId},`;
                    }
                // }
                // console.log(`t_array.length = ${t_array.length}`);
            });
        }
        // console.log(`twitch url = ${twitch_url}`);
        // console.log(`CONTENT PROVIDERS = ${JSON.stringify(t_array)}`);
        twitch_url = twitch_url.concat(twitch_url.length - 1);
        const td = await axios.get(`${process.env.REACT_APP_API_SERVER}/twitch/getTwitchStreams?users=${twitch_url}`);
        // console.log(`ANY LIVE PROVIDERS ${JSON.stringify(td)}`);
        this.setState({
            live_list: td,
            team_list: team_l,
            roster_list: t_array,
            visible: true,
            OrganizationTwitchComponentRender: OrganizationTwitchComponentRender.default,
            OrganizationTwitchHolderComponentRender: OrganizationTwitchHolderComponentRender.default
        });
    }

    handleLeftScroll = () => {
        if (this.scrollRef) {
            this.scrollRef.scrollLeft -= 100;
        }
    }

    handleRightScroll = () => {
        if (this.scrollRef) {
            this.scrollRef.scrollLeft += 100;
        }
    }
    storeRef = ref => {
        this.scrollRef = ref;
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { OrganizationTwitchComponentRender } = this.state;
        const { OrganizationTwitchHolderComponentRender } = this.state;
        const p_array = [];

        // console.log(`NEW TEAM LIST = ${JSON.stringify(this.state.team_list)}`);

        if (this.state.team_list) {
            // console.log(`TEAM DATA = ${JSON.stringify(this.state.team_list)}`);
            if (this.state.team_list.data.success) {
                this.state.team_list.data.data.users.forEach((l, i) => {
                    if (l.live) {
                        const d_style = { backgroundColor: 'green' };
                        const t_url = `https://player.twitch.tv/?channel=${l.name}`;
                        const t_thumb = l.thumbnail_url;
                        // console.log(`thumbnail is ${t_thumb}`);
                        const w_thumb = t_thumb.replace('{width}', '300');
                        const f_thumb = w_thumb.replace('{height}', '150');
                        // console.log(`final thumbnail is ${f_thumb}`);
                        // console.log('is_live');
                        p_array.unshift(<OrganizationTwitchComponentRender
                            key={`twitch_live_k_${i}`}
                            twitch_url={t_url}
                            twitch_thumbnail={f_thumb}
                            twitch_name={l.display_name}
                            status_style={d_style}
                        />);
                    } else {
                        const t_url = `https://player.twitch.tv/?channel=${l.name}`;
                        const t_thumb = offline_image;
                        p_array.push(<OrganizationTwitchComponentRender
                            key={`twitch_live_k_${i}`}
                            twitch_url={t_url}
                            twitch_thumbnail={t_thumb}
                            twitch_name={l.display_name}
                        />);
                    }
                });
            }
        } else {
            this.state.roster_list.forEach((r, i) => {
                let is_live = false;
                // console.log(`LIVE LIST ${JSON.stringify(this.state.live_list.data.success)} and i = ${i}`);
                // console.log(`user_id = ${r.twitchUserId}`);
                if (this.state.live_list.data.success) {
                    this.state.live_list.data.users.forEach((l) => {
                        // console.log(`r.twitchUserId = ${r.twitchUserId} and l.user_id = ${l.user_id}`);
                        if (Number(l.user_id) === Number(r.twitchUserId)) {
                            is_live = true;
                            const d_style = { backgroundColor: 'green' };
                            const t_url = `https://player.twitch.tv/?channel=${r.twitchUrl}`;
                            const t_thumb = l.thumbnail_url;
                            // console.log(`thumbnail is ${t_thumb}`);
                            const w_thumb = t_thumb.replace('{width}', '300');
                            const f_thumb = w_thumb.replace('{height}', '150');
                            // console.log(`final thumbnail is ${f_thumb}`);
                            // console.log('is_live');
                            p_array.unshift(<OrganizationTwitchComponentRender
                                key={`twitch_live_k_${i}`}
                                twitch_url={t_url}
                                twitch_thumbnail={f_thumb}
                                twitch_name={r.twitchUrl}
                                status_style={d_style}
                            />);
                        }
                    });
                }
                if (!is_live) {
                    // console.log('is NOT live');
                    const t_url = `https://player.twitch.tv/?channel=${r.twitchUrl}`;
                    const t_thumb = offline_image;
                    p_array.push(<OrganizationTwitchComponentRender
                        key={`twitch_live_k_${i}`}
                        twitch_url={t_url}
                        twitch_thumbnail={t_thumb}
                        twitch_name={r.twitchUrl}
                    />);
                }
                // console.log(`testing what it sorts as ${p_array.toString}`);
            });
        }
        return (<OrganizationTwitchHolderComponentRender
            handleLeftScroll={this.handleLeftScroll}
            handleRightScroll={this.handleRightScroll}
            storeRef={this.storeRef}
            // scrollRef={this.scrollRef}
            twitch_items={p_array} />);
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

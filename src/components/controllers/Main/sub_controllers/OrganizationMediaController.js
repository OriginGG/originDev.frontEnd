import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import axios from 'axios';
import { isMobile } from 'react-device-detect';
// import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import { getYouTubeChannelsQuery } from '../../../../queries/youtube_channels';
// import { getOrganisationMembersQuery } from '../../../../queries/members.js';
import { getRosterQuery } from '../../../../queries/rosters.js';
import offline_image from '../../../../assets/images/game_images/twitch_offline.png';

class OrganizationMediaController extends Component {
    state = { visible: false, OrganizationMediaComponentRender: null }
    componentDidMount = async () => {
        // const theme = this.props.uiStore.current_organisation.themeId;
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;

        const OrganizationMediaComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationMediaComponentRender`);
        const OrganizationTwitchComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationTwitchComponentRender`);
        const OrganizationYouTubeComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationYouTubeComponentRender`);
        this.image_src = this.props.uiStore.current_theme_structure.main_section.background.imageData;
        // onst subDomain = this.props.uiStore.current_subdomain;
        this.upcoming_style = { color: '#cccccc', backgroundColor: 'black' };
        this.recent_style = { color: 'white', backgroundColor: 'red' };
        this.upcoming_enigma_style = { borderColor: this.props.uiStore.current_organisation.primaryColor, backgroundColor: 'transparent' };
        this.recent_enigma_style = { borderColor: this.props.uiStore.current_organisation.primaryColor, backgroundColor: this.props.uiStore.current_organisation.primaryColor };
        this.tw_style = { display: 'none' };
        this.yt_style = { display: 'inherit' };
        this.setState({
            youtube_style: this.upcoming_style,
            twitch_style: this.recent_style,
            youtube_enigma_style: this.upcoming_enigma_style,
            twitch_enigma_style: this.recent_enigma_style,
            yt_style: this.yt_style,
            tw_style: this.tw_style
        });
        const youTubeChannels = await this.props.appManager.executeQuery('query', getYouTubeChannelsQuery, { organisationId: this.props.uiStore.current_organisation.id });
        if (youTubeChannels.resultData.edges.length !== 0) {
            // console.log(`youTubeChannels.resultData.edges.length = ${youTubeChannels.resultData.edges.length}`);
            const v1 = this.props.appManager.convertYoutubeURL(youTubeChannels.resultData.edges[0].node.youtubeVideo1);
            const v2 = this.props.appManager.convertYoutubeURL(youTubeChannels.resultData.edges[0].node.youtubeVideo2);
            const v3 = this.props.appManager.convertYoutubeURL(youTubeChannels.resultData.edges[0].node.youtubeVideo3);
            const v4 = this.props.appManager.convertYoutubeURL(youTubeChannels.resultData.edges[0].node.youtubeVideo4);
            const p = {
                video1_url: v1,
                video2_url: v2,
                video3_url: v3,
                video4_url: v4
            };
            // console.log(`youtube before: ${youTubeChannels.resultData.edges[0].node.youtubeVideo1} asnd youtube after ${v1}`);
            this.setState(p);
        } else {
            // console.log(`youTubeChannels.resultData.edges.length = ${youTubeChannels.resultData.edges.length}`);
            const v1 = this.props.appManager.convertYoutubeURL('https://www.youtube.com/watch?v=eXzSeGxjPCs');
            const v2 = this.props.appManager.convertYoutubeURL('https://www.youtube.com/watch?v=eXzSeGxjPCs');
            const v3 = this.props.appManager.convertYoutubeURL('https://www.youtube.com/watch?v=eXzSeGxjPCs');
            const v4 = this.props.appManager.convertYoutubeURL('https://www.youtube.com/watch?v=eXzSeGxjPCs');
            const p = {
                video1_url: v1,
                video2_url: v2,
                video3_url: v3,
                video4_url: v4
            };
            // console.log(`youtube before: ${youTubeChannels.resultData.edges[0].node.youtubeVideo1} asnd youtube after ${v1}`);
            this.setState(p);
        }

        let team_l = null;

        if (this.props.uiStore.current_organisation.streamTeamUrl) {
            team_l = await axios.get(`${process.env.REACT_APP_API_SERVER}/twitch/get-team-member?teamurl=${this.props.uiStore.current_organisation.streamTeamUrl}`);
            // console.log(`NEW TEAM CALL ${JSON.stringify(team_l)}`);
        } else {
            console.log('no team name');
        }
        const users = await this.props.appManager.executeQuery('query', getRosterQuery, { organisationId: this.props.uiStore.current_organisation.id, rosterType: 'content_team' });
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
        // twitch_url = twitch_url.concat(twitch_url.length - 1);
        // const td = [];
        const td = await axios.get(`${process.env.REACT_APP_API_SERVER}/twitch/getTwitchStreams?users=${twitch_url}`);
        // console.log(`ANY LIVE PROVIDERS ${JSON.stringify(td)}`);
        this.setState({
            live_list: td,
            team_list: team_l,
            roster_list: t_array,
            visible: true,
            OrganizationMediaComponentRender: OrganizationMediaComponentRender.default,
            OrganizationTwitchComponentRender: OrganizationTwitchComponentRender.default,
            OrganizationYouTubeComponentRender: OrganizationYouTubeComponentRender.default
        });

        // console.log(`ROSTER LIST XXXXXXXXXXXXXXXXX = ${JSON.stringify(this.state.roster_list)}`);
    }
    componentDidCatch = (error, info) => {
        console.log(error, info);
    }
    handleLeftScroll = () => {
        if (this.scrollRef) {
            this.scrollRef.scrollLeft -= 100;
        }
        if (this.scrollRef2) {
            this.scrollRef2.scrollLeft -= 100;
        }
    }

    handleRightScroll = () => {
        if (this.scrollRef) {
            this.scrollRef.scrollLeft += 100;
        }
        if (this.scrollRef2) {
            this.scrollRef2.scrollLeft += 100;
        }
    }

    handleYoutubeClick = () => {
        const u_style = { color: '#cccccc', backgroundColor: 'black' };
        const r_style = { color: 'white', backgroundColor: 'red' };
        const u_e_style = this.recent_enigma_style = { borderColor: this.props.uiStore.current_organisation.primaryColor, backgroundColor: this.props.uiStore.current_organisation.primaryColor };
        const r_e_style = this.recent_enigma_style = { borderColor: this.props.uiStore.current_organisation.primaryColor, backgroundColor: 'transparent' };
        const y_style = { display: 'none' };
        const t_style = { display: 'inherit' };
        this.setState({
            youtube_style: r_style,
            twitch_style: u_style,
            youtube_enigma_style: u_e_style,
            twitch_enigma_style: r_e_style,
            yt_style: y_style,
            tw_style: t_style
        });
    }

    handleTwitchClick = () => {
        const r_style = { color: '#cccccc', backgroundColor: 'black' };
        const u_style = { color: 'white', backgroundColor: 'red' };
        const u_e_style = this.recent_enigma_style = { borderColor: this.props.uiStore.current_organisation.primaryColor, backgroundColor: 'transparent' };
        const r_e_style = this.recent_enigma_style = { borderColor: this.props.uiStore.current_organisation.primaryColor, backgroundColor: this.props.uiStore.current_organisation.primaryColor };
        const y_style = { display: 'inherit' };
        const t_style = { display: 'none' };
        this.setState({
            youtube_style: r_style,
            twitch_style: u_style,
            youtube_enigma_style: u_e_style,
            twitch_enigma_style: r_e_style,
            yt_style: y_style,
            tw_style: t_style
        });
    }

    isMobile = () => {
        // return true;
        // console.log(`page isMObile ${isMobile} screen width = ${window.outerWidth}`);
        if (isMobile || window.outerWidth < 1050) {
            // console.log('isMobile true');
            return true;
        }
        // console.log('isMobile false');
        return false;
    }

    storeRef = ref => {
        this.scrollRef = ref;
    }
    storeRef2 = ref => {
        this.scrollRef2 = ref;
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { OrganizationMediaComponentRender } = this.state;
        const { OrganizationTwitchComponentRender } = this.state;
        const { OrganizationYouTubeComponentRender } = this.state;
        // const { edges } = this.match_data.resultdata;
        // if (edges.length === 0) {
        //     return null;
        // }
        const temp_bg = this.props.uiStore.current_theme_structure.main_section.background.imageMediaData;
        const s = { background: `url(${temp_bg})`, backgroundSize: 'cover', filter: 'grayscale(100%)' };
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        let f = { backgroundColor: 'rgba(0,0,0,.8)' };
        if (theme === 'felzec/light') {
            f = { backgroundColor: 'rgba(255,255,255,.8)' };
        }
        const p_array = [];
        const y_array = [];

        y_array.push(<OrganizationYouTubeComponentRender video_url={this.state.video1_url} />);
        y_array.push(<OrganizationYouTubeComponentRender video_url={this.state.video2_url} />);
        y_array.push(<OrganizationYouTubeComponentRender video_url={this.state.video3_url} />);
        y_array.push(<OrganizationYouTubeComponentRender video_url={this.state.video4_url} />);

        // console.log(`NEW TEAM LIST = ${JSON.stringify(this.state.team_list)}`);

        if (this.state.team_list) {
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
        let m_style = { height: '320px' };
        if (this.isMobile()) {
            m_style = { height: '580px' };
        }
        const m_title_color = { color: this.props.uiStore.current_organisation.primaryColor };
        return <OrganizationMediaComponentRender
        mobile_height={m_style}
        handleLeftScroll={this.handleLeftScroll}
        handleRightScroll={this.handleRightScroll}
        handleYoutubeClick={this.handleYoutubeClick}
        handleTwitchClick={this.handleTwitchClick}
        youtube_style={this.state.youtube_style}
        twitch_style={this.state.twitch_style}
        upcoming_style={this.state.youtube_enigma_style}
        recent_style={this.state.twitch_enigma_style}
        yt_style={this.state.yt_style}
        tw_style={this.state.tw_style}
        switch_title_color={m_title_color}
        youtube_videos={p_array}
        twitch_videos={y_array}
        bg_style={s}
        filter_style={f}
        storeRef={this.storeRef}
        storeRef2={this.storeRef2}
        />;
    }
}

OrganizationMediaController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationMediaController));

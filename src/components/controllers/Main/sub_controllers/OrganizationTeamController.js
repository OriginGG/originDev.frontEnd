import React, { Component } from 'react';
import injectSheet from 'react-jss';
import _ from 'lodash';
import { inject } from 'mobx-react';
import { isMobile } from 'react-device-detect';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import { getRosterQuery } from '../../../../queries/rosters';
import coc_image from '../../../../assets/images/game_images/clashofclans.png';
import cod_image from '../../../../assets/images/game_images/cod.png';
import dota_image from '../../../../assets/images/game_images/dota2.png';
import csgo_image from '../../../../assets/images/game_images/csgo.png';
import fortnite_image from '../../../../assets/images/game_images/fortnite.jpg';
import hearthstone_image from '../../../../assets/images/game_images/hearthstone.png';
import lol_image from '../../../../assets/images/game_images/lol.jpg';
import paladins_image from '../../../../assets/images/game_images/paladins.jpg';
import ow_image from '../../../../assets/images/game_images/ow.png';
import pubg_image from '../../../../assets/images/game_images/pubg.png';
import smite_image from '../../../../assets/images/game_images/smite.png';
import splatoon_image from '../../../../assets/images/game_images/splatoon.png';
import destiny_image from '../../../../assets/images/game_images/destiny.png';
import vainglory_image from '../../../../assets/images/game_images/vainglory.png';
import wow_image from '../../../../assets/images/game_images/wow.png';
import r6_image from '../../../../assets/images/game_images/r6.png';
import gow_image from '../../../../assets/images/game_images/gow.png';
import streetfighter_image from '../../../../assets/images/game_images/streetfighter.png';
import ssb_image from '../../../../assets/images/game_images/ssb.png';
import dragonball_image from '../../../../assets/images/game_images/dragonball.png';
import tekken_image from '../../../../assets/images/game_images/tekken.png';
// banners
import coc_banner from '../../../../assets/images/game_images/coc_banner.jpg';
import cod_banner from '../../../../assets/images/game_images/cod_banner.jpeg';
import dota_banner from '../../../../assets/images/game_images/dota2_banner.jpg';
import csgo_banner from '../../../../assets/images/game_images/csgo_banner.jpg';
import fortnite_banner from '../../../../assets/images/game_images/fortnite_banner.png';
import hearthstone_banner from '../../../../assets/images/game_images/hearthstone_banner.jpg';
import lol_banner from '../../../../assets/images/game_images/lol_banner.jpg';
import paladins_banner from '../../../../assets/images/game_images/paladins_banner.jpg';
import ow_banner from '../../../../assets/images/game_images/ow_banner.jpg';
import pubg_banner from '../../../../assets/images/game_images/pubg_banner.png';
import smite_banner from '../../../../assets/images/game_images/smite_banner.jpeg';
import splatoon_banner from '../../../../assets/images/game_images/splatoon_banner.jpg';
import destiny_banner from '../../../../assets/images/game_images/destiny_banner.jpg';
import vainglory_banner from '../../../../assets/images/game_images/vainglory_banner.jpg';
import wow_banner from '../../../../assets/images/game_images/wow_banner.jpg';
import r6_banner from '../../../../assets/images/game_images/r6_banner.jpg';
import gow_banner from '../../../../assets/images/game_images/gow_banner.jpeg';
import streetfighter_banner from '../../../../assets/images/game_images/streetfighter_banner.jpg';
import ssb_banner from '../../../../assets/images/game_images/ssb_banner.jpg';
import dragonball_banner from '../../../../assets/images/game_images/dragonball_banner.jpg';
import tekken_banner from '../../../../assets/images/game_images/tekken_banner.png';
// import { getOrganisationQuery } from './queries/organisation'

const gameOptions = [
    {
        game_id: 1,
        text: 'Clash of Clans',
        value: 'Clash of Clans',
        image: coc_image,
        banner: coc_banner
    },
    {
        game_id: 2,
        text: 'Call of Duty',
        value: 'Call of Duty',
        image: cod_image,
        banner: cod_banner
    },
    {
        game_id: 3,
        text: 'Dota 2',
        value: 'Dota 2',
        image: dota_image,
        banner: dota_banner
    },
    {
        game_id: 4,
        text: 'CS GO',
        value: 'CS GO',
        image: csgo_image,
        banner: csgo_banner
    },
    {
        game_id: 5,
        text: 'Fortnite',
        value: 'Fortnite',
        image: fortnite_image,
        banner: fortnite_banner
    },
    {
        game_id: 6,
        text: 'Hearthstone',
        value: 'Hearthstone',
        image: hearthstone_image,
        banner: hearthstone_banner
    },
    {
        game_id: 7,
        text: 'Lol',
        value: 'Lol',
        image: lol_image,
        banner: lol_banner
    },
    {
        game_id: 8,
        text: 'OW',
        value: 'OW',
        image: ow_image,
        banner: ow_banner
    },
    {
        game_id: 9,
        text: 'Paladins',
        value: 'Paladins',
        image: paladins_image,
        banner: paladins_banner
    },
    {
        game_id: 10,
        text: 'Pubg',
        value: 'Pubg',
        image: pubg_image,
        banner: pubg_banner
    },
    {
        game_id: 11,
        text: 'Rainbow Six: Siege',
        value: 'Rainbow Six: Siege',
        image: r6_image,
        banner: r6_banner
    },
    {
        game_id: 12,
        text: 'Smite',
        value: 'Smite',
        image: smite_image,
        banner: smite_banner
    },
    {
        game_id: 13,
        text: 'Splatoon 2',
        value: 'Splatoon 2',
        image: splatoon_image,
        banner: splatoon_banner
    },
    {
        game_id: 14,
        text: 'Vainglory',
        value: 'Vainglory',
        image: vainglory_image,
        banner: vainglory_banner
    },
    {
        game_id: 15,
        text: 'WOW',
        value: 'WOW',
        image: wow_image,
        banner: wow_banner
    },
    {
        game_id: 16,
        text: 'Gears Of War',
        value: 'Gears Of War',
        image: gow_image,
        banner: gow_banner
    },
    {
        game_id: 17,
        text: 'Street Fighter',
        value: 'Street Fighter',
        image: streetfighter_image,
        banner: streetfighter_banner
    },
    {
        game_id: 18,
        text: 'DragonBall: FighterZ',
        value: 'DragonBall: FighterZ',
        image: dragonball_image,
        banner: dragonball_banner
    },
    {
        game_id: 19,
        text: 'Super Smash Bros',
        value: 'Super Smash Bros',
        image: ssb_image,
        banner: ssb_banner
    },
    {
        game_id: 20,
        text: 'Tekken',
        value: 'Tekken',
        image: tekken_image,
        banner: tekken_banner
    },
    {
        game_id: 21,
        text: 'Destiny',
        value: 'Destiny',
        image: destiny_image,
        banner: destiny_banner
    }


];

class OrganizationTeamController extends Component {
    state = { visible: false, OrganizationTeamComponentRender: null };

    componentDidMount = async () => {
        const p_array = [];
        let ros_id = 0;
        this.my_index = 1;
        if (!this.isMobile()) {
            const roster_data = await this.props.appManager.executeQuery('query', getRosterQuery, { rosterType: 'roster', organisationId: this.props.uiStore.current_organisation.id });
            // console.log(`team data = ${JSON.stringify(roster_data)}`);
            roster_data.allCombinedRosters.edges.forEach((r) => {
                // console.log(`r data = ${JSON.stringify(r)}`);
                const { gameId } = r.node;
                const { id } = r.node;
                ros_id = id;
                const currGame = _.find(gameOptions, (o) => {
                    return o.game_id === gameId;
                });
                // console.log(`CURRENT GAME ++++++++++++ ${JSON.stringify(currGame)}`);
                p_array.push({
                    roster_id: r.node.id,
                    image: currGame.image,
                    text: currGame.text,
                    banner: currGame.banner
                });
            });
        } else {
            const roster_data = await this.props.appManager.executeQuery('query', getRosterQuery, { rosterType: 'roster', organisationId: this.props.uiStore.current_organisation.id });
            // console.log(`team data = ${JSON.stringify(roster_data)}`);
            roster_data.allCombinedRosters.edges.forEach((r) => {
                // console.log(`r data = ${JSON.stringify(r)}`);
                const { gameId } = r.node;
                const { id } = r.node;
                ros_id = id;
                const currGame = _.find(gameOptions, (o) => {
                    return o.game_id === gameId;
                });
                // console.log(`CURRENT GAME ++++++++++++ ${JSON.stringify(currGame)}`);
                p_array.push({
                    roster_id: r.node.id,
                    image: currGame.image,
                    text: currGame.text,
                    banner: currGame.banner
                });
            });
        }
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        // const theme = this.props.uiStore.current_organisation.themeId;
        const OrganizationTeamComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationTeamComponentRender`);
        const OrganizationTeamGameController = await import('./OrganizationTeamGameController');
        const OrganizationTeamMateController = await import('./OrganizationTeamMateController');
        this.image_src = this.props.uiStore.current_theme_structure.main_section.background.imageData;
        this.setState({
            games: p_array,
            current_roster_id: ros_id,
            visible: true,
            OrganizationTeamGameController: OrganizationTeamGameController.default,
            OrganizationTeamComponentRender: OrganizationTeamComponentRender.default,
            OrganizationTeamMateController: OrganizationTeamMateController.default,
            // OrganizationTeamImageComponentRender: OrganizationTeamImageComponentRender.default
        });
        // console.log(`roster_array = ${JSON.stringify(this.state.rosters)}`);
    }
    componentDidCatch = (error, info) => {
        console.log(error, info);
    }
    isMobile = () => {
        // return true;
        // console.log(`page isMObile ${isMobile} screen width = ${window.outerWidth}`);
        if (isMobile || window.outerWidth < 1050) {
            return true;
        }
        return false;
    }
    handleTeamClick = (t) => {
        // console.log(JSON.stringify(t));
        // const roster_data = await this.props.appManager.executeQuery('query', getRosterByIDQuery, { id: this.props.roster_id });
        // const { edges } = roster_data.rosterById.rosterIndividualsByRosterId;
        this.setState({ current_roster_id: t });
        this.my_index += 1;
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { OrganizationTeamGameController } = this.state;
        const { OrganizationTeamMateController } = this.state;
        const temp_bg = this.props.uiStore.current_theme_structure.main_section.background.imageRostersData;
        const s = { background: `url(${temp_bg})`, backgroundSize: 'cover', filter: 'grayscale(100)' };
        const m_color = this.props.uiStore.current_organisation.primaryColor;
        const menu_color = `${m_color}b3`;
        const f = { backgroundColor: `${menu_color}` };
        const enigma2_color = { color: `${m_color}` };
        const enigma2_border_color = { borderColor: `${m_color}` };
        // let s = { background: 'url(https://s3.amazonaws.com/origin-images/origin/jumbotron/section1-bg3.jpg)', backgroundSize: 'cover', filter: 'contrast(.1) sepia(100%) hue-rotate(210deg) brightness(1.4) saturate(0.28)' };
        // if (this.isMobile()) {
        //     s = { display: 'none' };
        // }
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        let g_width = '140px';
        if (theme === 'enigma2/dark') {
            g_width = '100%';
        }
        const m_array = [];
        const p = this.state.games;
        p.forEach((g, i) => {
            m_array.push(<div
                role="menuItem"
                tabIndex={-1}
                onClick={() => { this.handleTeamClick(g.roster_id); }}
                key={`gm_roster_${i}`}
                style={{
                    cursor: 'pointer',
                    width: g_width
                }} >
                <OrganizationTeamGameController
                    game_media_1={g.image}
                    game_banner={g.banner}
                    game_name={g.text}
                    show_team_color={enigma2_border_color}
                    team_game_color={enigma2_color}
                    roster_id={g.roster_id}
                />
            </div>);
        });
        const { OrganizationTeamComponentRender } = this.state;
        return <OrganizationTeamComponentRender player_count={15} team_count={p.length} title_color={enigma2_color} team_count_color={enigma2_color} team_title_color={enigma2_color} player_count_color={enigma2_color} player_title_color={enigma2_color} filter_style={f} bg_style={s} roster_games={m_array} roster_teams={<OrganizationTeamMateController key={`team_mate_roster_key_${this.my_index}`} closeRosters={this.closeRosters} roster_id={this.state.current_roster_id} />} />;
    }
}

OrganizationTeamController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};


export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationTeamController));

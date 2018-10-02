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
import vainglory_image from '../../../../assets/images/game_images/vainglory.png';
import wow_image from '../../../../assets/images/game_images/wow.png';
import r6_image from '../../../../assets/images/game_images/r6.png';
import gow_image from '../../../../assets/images/game_images/gow.png';
import streetfighter_image from '../../../../assets/images/game_images/streetfighter.png';
import ssb_image from '../../../../assets/images/game_images/ssb.png';
import dragonball_image from '../../../../assets/images/game_images/dragonball.png';
import tekken_image from '../../../../assets/images/game_images/tekken.png';
// import { getOrganisationQuery } from './queries/organisation'

const gameOptions = [
    {
        game_id: 1,
        text: 'Clash of Clans',
        value: 'Clash of Clans',
        image: coc_image
    },
    {
        game_id: 2,
        text: 'Call of Duty',
        value: 'Call of Duty',
        image: cod_image
    },
    {
        game_id: 3,
        text: 'Dota 2',
        value: 'Dota 2',
        image: dota_image
    },
    {
        game_id: 4,
        text: 'CS GO',
        value: 'CS GO',
        image: csgo_image
    },
    {
        game_id: 5,
        text: 'Fortnite',
        value: 'Fortnite',
        image: fortnite_image
    },
    {
        game_id: 6,
        text: 'Hearthstone',
        value: 'Hearthstone',
        image: hearthstone_image
    },
    {
        game_id: 7,
        text: 'Lol',
        value: 'Lol',
        image: lol_image
    },
    {
        game_id: 8,
        text: 'OW',
        value: 'OW',
        image: ow_image
    },
    {
        game_id: 9,
        text: 'Paladins',
        value: 'Paladins',
        image: paladins_image
    },
    {
        game_id: 10,
        text: 'Pubg',
        value: 'Pubg',
        image: pubg_image
    },
    {
        game_id: 11,
        text: 'Rainbow Six: Siege',
        value: 'Rainbow Six: Siege',
        image: r6_image
    },
    {
        game_id: 12,
        text: 'Smite',
        value: 'Smite',
        image: smite_image
    },
    {
        game_id: 13,
        text: 'Splatoon',
        value: 'Splatoon',
        image: splatoon_image
    },
    {
        game_id: 14,
        text: 'Vainglory',
        value: 'Vainglory',
        image: vainglory_image
    },
    {
        game_id: 15,
        text: 'WOW',
        value: 'WOW',
        image: wow_image
    },
    {
        game_id: 16,
        text: 'Gears Of War',
        value: 'Gears Of War',
        image: gow_image
    },
    {
        game_id: 17,
        text: 'Street Fighter',
        value: 'Street Fighter',
        image: streetfighter_image
    },
    {
        game_id: 18,
        text: 'DragonBall: FighterZ',
        value: 'DragonBall: FighterZ',
        image: dragonball_image
    },
    {
        game_id: 19,
        text: 'Super Smash Bros',
        value: 'Super Smash Bros',
        image: ssb_image
    },
    {
        game_id: 20,
        text: 'Tekken',
        value: 'Tekken',
        image: tekken_image
    }


];

class OrganizationTeamController extends Component {
    state = { visible: false, OrganizationTeamComponentRender: null };

    componentDidMount = async () => {
        const p_array = [];
        if (!this.isMobile()) {
            const roster_data = await this.props.appManager.executeQuery('query', getRosterQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
            // console.log(`team data = ${JSON.stringify(roster_data)}`);
            roster_data.allRosters.edges.forEach((r) => {
                console.log(`r data = ${JSON.stringify(r)}`);
                const { gameId } = r.node;
                const currGame = _.find(gameOptions, (o) => {
                    return o.game_id === gameId;
                });
                // console.log(`CURRENT GAME ++++++++++++ ${JSON.stringify(currGame)}`);
                p_array.push({ roster_id: r.node.id, image: currGame.image, text: currGame.text });
            });
        }
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        // const theme = this.props.uiStore.current_organisation.themeId;
        const OrganizationTeamComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationTeamComponentRender`);
        const OrganizationTeamGameComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationTeamGameComponentRender`);
        // const OrganizationTeamImageComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationTeamImageComponentRender`);
        this.image_src = this.props.uiStore.current_theme_structure.main_section.background.imageData;
        this.setState({
            games: p_array,
            visible: true,
            OrganizationTeamGameComponentRender: OrganizationTeamGameComponentRender.default,
            OrganizationTeamComponentRender: OrganizationTeamComponentRender.default,
            // OrganizationTeamImageComponentRender: OrganizationTeamImageComponentRender.default
        });
    }
    componentDidCatch = (error, info) => {
        console.log(error, info);
    }
    isMobile = () => {
        return isMobile;
    }
    handleTeamClick = (t) => {
        console.log(JSON.stringify(t));
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { OrganizationTeamGameComponentRender } = this.state;
        const s = { background: 'url(https://s3.amazonaws.com/origin-images/origin/jumbotron/section1-bg3.jpg)', backgroundSize: 'cover', filter: 'opacity(.2)' };
        const f = { backgroundColor: 'rgba(255,0,0,.7)' };
        // let s = { background: 'url(https://s3.amazonaws.com/origin-images/origin/jumbotron/section1-bg3.jpg)', backgroundSize: 'cover', filter: 'contrast(.1) sepia(100%) hue-rotate(210deg) brightness(1.4) saturate(0.28)' };
        // if (this.isMobile()) {
        //     s = { display: 'none' };
        // }
        const m_array = [];
        const p = this.state.games;
        p.forEach((g, i) => {
            m_array.push(<div
                role="menuItem"
                tabIndex={-1}
                onClick={() => { this.handleTeamClick(g.roster_id); }}
                key={`gm_roster_${i}`}
                style={{
                    cursor: 'pointer'
                }} >
                <OrganizationTeamGameComponentRender
                    game_media_1={g.image}
                />
            </div>);
        });
        const { OrganizationTeamComponentRender } = this.state;
        return <OrganizationTeamComponentRender filter_style={f} bg_style={s} roster_games={<div style={{ display: 'flex' }}>{m_array}</div>} />;
    }
}

OrganizationTeamController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};


export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationTeamController));

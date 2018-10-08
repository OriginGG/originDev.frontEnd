import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import moment from 'moment';
import _ from 'lodash';
// import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import { recentMatchesQuery } from '../../../../queries/matches';
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
        value: 'Clash of Clans',
        image: coc_image
    },
    {
        value: 'Call of Duty',
        image: cod_image
    },
    {
        value: 'Dota 2',
        image: dota_image
    },
    {
        value: 'CS GO',
        image: csgo_image
    },
    {
        value: 'Fortnite',
        image: fortnite_image
    },
    {
        value: 'Hearthstone',
        image: hearthstone_image
    },
    {
        value: 'Lol',
        image: lol_image
    },
    {
        value: 'OW',
        image: ow_image
    },
    {
        value: 'Paladins',
        image: paladins_image
    },
    {
        value: 'Pubg',
        image: pubg_image
    },
    {
        value: 'Rainbow Six: Siege',
        image: r6_image
    },
    {
        value: 'Smite',
        image: smite_image
    },
    {
        value: 'Splatoon',
        image: splatoon_image
    },
    {
        value: 'Vainglory',
        image: vainglory_image
    },
    {
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
    },
];
class OrganizationMatchesController extends Component {
    state = { visible: false, OrganizationMatchesComponentRender: null }
    componentDidMount = async () => {
        // const theme = this.props.uiStore.current_organisation.themeId;
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;

        const OrganizationMatchesComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationMatchesComponentRender`);
        const OrganizationMatchesComponentElementRender = await import(`../../../render_components/themes/${theme}/OrganizationMatchesComponentElementRender`);
        this.image_src = this.props.uiStore.current_theme_structure.main_section.background.imageData;
        const subDomain = this.props.uiStore.current_subdomain;
        this.recent_style = { color: '#cccccc', backgroundColor: 'black' };
        this.upcoming_style = { color: 'white', backgroundColor: 'red' };
        this.rm_style = { display: 'none' };
        this.fm_style = { display: 'inherit' };
        this.setState({
            recent_style: this.recent_style,
            upcoming_style: this.upcoming_style,
            rm_style: this.rm_style,
            fm_style: this.fm_style
        });
        this.match_data = await this.props.appManager.executeQuery('query', recentMatchesQuery, { organisation: subDomain });
        this.setState({ visible: true, OrganizationMatchesComponentRender: OrganizationMatchesComponentRender.default, OrganizationMatchesComponentElementRender: OrganizationMatchesComponentElementRender.default });
    }
    componentDidCatch = (error, info) => {
        console.log(error, info);
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

    handleRecentClick = () => {
        const u_style = { color: '#cccccc', backgroundColor: 'black' };
        const r_style = { color: 'white', backgroundColor: 'red' };
        const fmt_style = { display: 'none' };
        const rmt_style = { display: 'inherit' };
        this.setState({
            recent_style: r_style,
            upcoming_style: u_style,
            rm_style: rmt_style,
            fm_style: fmt_style
        });
    }

    handleUpcomingClick = () => {
        const r_style = { color: '#cccccc', backgroundColor: 'black' };
        const u_style = { color: 'white', backgroundColor: 'red' };
        const fmt_style = { display: 'inherit' };
        const rmt_style = { display: 'none' };
        this.setState({
            recent_style: r_style,
            upcoming_style: u_style,
            rm_style: rmt_style,
            fm_style: fmt_style
        });
    }

    storeRef = ref => {
        this.scrollRef = ref;
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { OrganizationMatchesComponentRender } = this.state;
        const { OrganizationMatchesComponentElementRender } = this.state;
        const { edges } = this.match_data.resultdata;
        if (edges.length === 0) {
            return null;
        }
        const s = { background: 'url(https://s3.amazonaws.com/origin-images/origin/jumbotron/section1-bg1.jpg)', backgroundSize: 'cover', filter: 'grayscale(100%)' };
        const f = { backgroundColor: 'rgba(0,0,0,.5)' };
        const p_array = [];
        const f_array = [];
        edges.forEach((res, i) => {
            const g_image = _.find(gameOptions, (o) => {
                return o.value === res.node.gameName;
            });
            const g_type = res.node.gameName;
            let g_league = 'No League Listed';

            if (res.node.eventDescription) {
                g_league = res.node.eventDescription;
            }
            // console.log(`GGGGGGGGGGGGGGGGGGGGGGGGGGGGGG image = ${g_image.image}`);
            console.log(`i = ${i}`);
            console.log(`OrganizationMatchesController res = ${JSON.stringify(res)}`);
            const formattedDate = moment(res.node.createdAt).format('lll');

            const score_array = res.node.score.split(' - ');

            const home_score = parseInt(score_array[0], 10);
            const away_score = parseInt(score_array[1], 10);

            let date_exists = formattedDate;

            if (res.node.eventDate) {
                date_exists = res.node.eventDate;
            }

            // console.log(`home = ${home_score} | away = ${away_score}`);

            let ws = { borderColor: 'yellow transparent transparent transparent' };
            if (Number(home_score) < Number(away_score)) {
                // console.log(`home:${home_score} < away:${away_score}`);
                ws = { borderColor: '#e85149 transparent transparent transparent' };
            }
            if (Number(home_score) > Number(away_score)) {
                // console.log(`home:${home_score} > away:${away_score}`);
                ws = { borderColor: '#90ce59 transparent transparent transparent' };
            }
            if (Number(home_score) === Number(away_score)) {
                // console.log(`home:${home_score} === away:${away_score}`);
                ws = { borderColor: 'yellow transparent transparent transparent' };
            }

            if (res.node.eventInfo === 'um') {
                f_array.push(<OrganizationMatchesComponentElementRender
                    matches_image_1={g_image.image}
                    matches_image_2={res.node.gameLogo}
                    matches_score={res.node.score}
                    matches_game={g_type}
                    matches_league={g_league}
                    matches_date={date_exists}
                    win_style={ws}
                />);
            } else {
                p_array.push(<OrganizationMatchesComponentElementRender
                    matches_image_1={g_image.image}
                    matches_image_2={res.node.gameLogo}
                    matches_score={res.node.score}
                    matches_game={g_type}
                    matches_league={g_league}
                    matches_date={date_exists}
                    win_style={ws}
                />);
            }
            // p_array.push(<tr key={`md_key_rm_${i}`} style={{ color: 'rgba(0, 0, 0, 0.87)', height: 48 }}>
            //     <td style={{
            //         paddingLeft: 24, paddingRight: 24, height: 48, textAlign: 'left', fontSize: 13, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', backgroundColor: 'inherit'
            //     }}>
            //         <img
            //             alt=""
            //             size="40"
            //             src={g_image.image}
            //             style={{
            //                 color: 'rgb(255, 255, 255)', backgroundColor: 'transparent', userSelect: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '20', borderRadius: 0, height: 40, width: 40
            //             }} />
            //         <br />
            //     </td>
            //     <td style={{
            //         paddingLeft: 24, paddingRight: 24, height: 48, textAlign: 'left', fontSize: 13, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', backgroundColor: 'inherit'
            //     }}>
            //         <img
            //             alt=""
            //             size="40"
            //             src={res.node.gameLogo}
            //             style={{
            //                 color: 'rgb(255, 255, 255)', backgroundColor: 'transparent', userSelect: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '20', borderRadius: 0, height: 40, width: 40
            //             }} />
            //         <br />
            //     </td>

            //     <td style={{
            //         color: 'white', paddingLeft: 24, paddingRight: 24, height: 48, textAlign: 'left', fontSize: 13, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', backgroundColor: 'inherit'
            //     }}>
            //         <span>{res.node.score}</span>
            //     </td>
            // </tr>);
        });
        return <OrganizationMatchesComponentRender
        handleLeftScroll={this.handleLeftScroll}
        handleRightScroll={this.handleRightScroll}
        handleUpcomingClick={this.handleUpcomingClick}
        handleRecentClick={this.handleRecentClick}
        upcoming_style={this.state.upcoming_style}
        recent_style={this.state.recent_style}
        rm_style={this.state.rm_style}
        fm_style={this.state.fm_style}
        recent_matches={p_array}
        future_matches={f_array}
        bg_style={s}
        filter_style={f}
        storeRef={this.storeRef}
        />;
    }
}

OrganizationMatchesController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationMatchesController));

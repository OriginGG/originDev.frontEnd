import React, { Component } from 'react';
// import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import dayjs from 'dayjs';
import loadable from '@loadable/component';
import { isMobile } from 'react-device-detect';
import find from 'lodash/find';
// import PropTypes from 'prop-types';
// import { GlobalStyles } from 'Theme/Theme';
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
import destiny_image from '../../../../assets/images/game_images/destiny.png';
import vainglory_image from '../../../../assets/images/game_images/vainglory.png';
import wow_image from '../../../../assets/images/game_images/wow.png';
import r6_image from '../../../../assets/images/game_images/r6.png';
import gow_image from '../../../../assets/images/game_images/gow.png';
import streetfighter_image from '../../../../assets/images/game_images/streetfighter.png';
import ssb_image from '../../../../assets/images/game_images/ssb.png';
import dragonball_image from '../../../../assets/images/game_images/dragonball.png';
import tekken_image from '../../../../assets/images/game_images/tekken.png';
import apex_image from '../../../../assets/images/game_images/apex.png';
import  brawlhalla_image from '../../../../assets/images/game_images/brawlhalla.png';
import rl_image from '../../../../assets/images/game_images/rl.png';
import roe_image from '../../../../assets/images/game_images/roe.png';
import splitgate_image from '../../../../assets/images/game_images/splitgate.png';
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
		value: 'Splatoon 2',
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
	{
		game_id: 21,
		text: 'Destiny',
		value: 'Destiny',
		image: destiny_image
	},
	{
		game_id: 22,
		text: 'Apex Legends',
		value: 'Apex Legends',
		image: apex_image
	},
	{
		game_id: 23,
		text: 'Brawlhalla',
		value: 'Brawlhalla',
		image: brawlhalla_image
	},
	{
		game_id: 24,
		text: 'Rocket League',
		value: 'Rocket League',
		image: rl_image
	},
	{
		game_id: 25,
		text: 'Ring of Elysium',
		value: 'Ring of Elysium',
		image: roe_image
	},
	{
		game_id: 26,
		text: 'Splitgate',
		value: 'Splitgate',
		image: splitgate_image
	}
];
class OrganizationMatchesController extends Component {
	state = { visible: false, OrganizationMatchesComponentRender: null };
	componentDidMount = async () => {
		// const theme = this.props.uiStore.current_organisation.themeId;
		let theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation
			.themeId}`;
		if (this.isMobile()) {
			theme = 'mobile/dark';
		}

		const OrganizationMatchesComponentRender = loadable(
			() =>
				import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${theme}/OrganizationMatchesComponentRender`),
			{
				fallback: <div>Loading...</div>
			}
		);
		const OrganizationMatchesComponentElementRender = loadable(
			() =>
				import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${theme}/OrganizationMatchesComponentElementRender`),
			{
				fallback: <div>Loading...</div>
			}
		);

		let OrganizationMatchesMobileComponentRender = null;
		let OrganizationMatchesMobileComponentElementRender = null;
		if (theme === 'felzec/light') {
			OrganizationMatchesMobileComponentRender = loadable(
				() =>
					import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${theme}/OrganizationMatchesMobileComponentRender`),
				{
					fallback: <div>Loading...</div>
				}
			);
			OrganizationMatchesMobileComponentElementRender = loadable(
				() =>
					import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${theme}/OrganizationMatchesMobileComponentElementRender`),
				{
					fallback: <div>Loading...</div>
				}
			);
		}
		this.org_color = this.props.uiStore.current_organisation.primaryColor;
		this.image_src = this.props.uiStore.current_theme_structure.main_section.background.imageData;
		// const subDomain = this.props.uiStore.current_subdomain;
		this.recent_style = { color: '#cccccc', backgroundColor: 'red' };
		this.upcoming_style = { color: 'white', backgroundColor: 'black' };
		if (theme === 'enigma2/dark') {
			this.recent_style = { color: 'white', backgroundColor: this.org_color, borderColor: this.org_color };
			this.upcoming_style = { color: 'white', backgroundColor: 'transparent', borderColor: this.org_color };
		}
		this.rm_style = { display: 'inherit' };
		this.fm_style = { display: 'none' };
		this.setState({
			recent_style: this.recent_style,
			upcoming_style: this.upcoming_style,
			rm_style: this.rm_style,
			fm_style: this.fm_style
		});
		this.match_data = await this.props.appManager.executeQuery('query', recentMatchesQuery, {
			organisationId: this.props.uiStore.current_organisation.id
		});
		if (theme === 'felzec/light') {
			this.setState({
				visible: true,
				OrganizationMatchesComponentRender,
				OrganizationMatchesComponentElementRender,
				OrganizationMatchesMobileComponentRender,
				OrganizationMatchesMobileComponentElementRender
			});
		} else {
			this.setState({
				visible: true,
				OrganizationMatchesComponentRender,
				OrganizationMatchesComponentElementRender
			});
		}
	};
	componentDidCatch = (error, info) => {
		console.log(error, info);
	};
	handleLeftScroll = () => {
		if (this.scrollRef) {
			this.scrollRef.scrollLeft -= 100;
		}
	};

	isMobile = () => {
		// return true;
		// console.log(`page isMObile ${isMobile} screen width = ${window.outerWidth}`);
		if (isMobile || window.outerWidth < 1050) {
			return true;
		}
		return false;
	};

	handleRightScroll = () => {
		if (this.scrollRef) {
			this.scrollRef.scrollLeft += 100;
		}
	};

	handleRecentClick = () => {
		console.log(`org color = ${this.org_color}`);
		let rc_theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation
			.themeId}`;
		if (this.isMobile()) {
			rc_theme = 'mobile/dark';
		}
		let u_style = { color: '#cccccc', backgroundColor: 'black' };
		let r_style = { color: 'white', backgroundColor: 'red' };
		if (rc_theme === 'enigma2/dark') {
			u_style = { color: 'white', backgroundColor: 'transparent', borderColor: this.org_color };
			r_style = { color: 'white', backgroundColor: this.org_color, borderColor: this.org_color };
		}
		const fmt_style = { display: 'none' };
		const rmt_style = { display: 'inherit' };
		this.setState({
			recent_style: r_style,
			upcoming_style: u_style,
			rm_style: rmt_style,
			fm_style: fmt_style
		});
	};

	handleUpcomingClick = () => {
		let uc_theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation
			.themeId}`;
		if (this.isMobile()) {
			uc_theme = 'mobile/dark';
		}
		let r_style = { color: '#cccccc', backgroundColor: 'black' };
		let u_style = { color: 'white', backgroundColor: 'red' };
		if (uc_theme === 'enigma2/dark') {
			u_style = { color: 'white', backgroundColor: this.org_color, borderColor: this.org_color };
			r_style = { color: 'white', backgroundColor: 'transparent', borderColor: this.org_color };
		}
		const fmt_style = { display: 'inherit' };
		const rmt_style = { display: 'none' };
		this.setState({
			recent_style: r_style,
			upcoming_style: u_style,
			rm_style: rmt_style,
			fm_style: fmt_style
		});
	};

	storeRef = (ref) => {
		this.scrollRef = ref;
	};
	render() {
		if (this.state.visible === false) {
			return null;
		}
		const { OrganizationMatchesComponentRender } = this.state;
		const { OrganizationMatchesComponentElementRender } = this.state;
		let { edges } = this.match_data.resultdata;
		if (edges.length === 0) {
			edges = [
				{
					node: {
						createdAt: '2018-11-01T12:00:00+00:00',
						gameName: 'Call of Duty',
						eventDescription: 'Enter a Match',
						score: '0 - 0',
						eventUrl: 'https://origin.gg',
						eventInfo: 'Enter a match',
						gameLogo: this.props.uiStore.current_theme_structure.header.logo.imageData
					}
				}
			];
			// return null;
		}
		const test_bg = this.props.uiStore.current_theme_structure.main_section.background.imageMatchesData;
		const s = { background: `url(${test_bg})`, backgroundSize: 'cover', filter: 'grayscale(100%)' };
		const f = { backgroundColor: 'rgba(0,0,0,.5)' };
		const p_array = [];
		const f_array = [];
		let r_theme = `${this.props.uiStore.current_organisation.themeBaseId}`;
		if (this.isMobile) {
			r_theme = 'mobile';
		}
		edges.forEach((res) => {
			const g_image = find(gameOptions, (o) => {
				return o.value === res.node.gameName;
			});
			const g_type = res.node.gameName;
			let g_league = 'No League Listed';

			if (res.node.eventDescription) {
				g_league = res.node.eventDescription;
			}
			// console.log(`GGGGGGGGGGGGGGGGGGGGGGGGGGGGGG image = ${g_image.image}`);
			// console.log(`i = ${i}`);
			// console.log(`OrganizationMatchesController res = ${JSON.stringify(res)}`);
			console.log(`res.noe.createdAt = ${res.node.createdAt}`);
			// const formattedDate = dayjs(res.node.createdAt).format('MM/DD/YY');
			const formattedDate = dayjs(res.node.createdAt).format('MM/DD/YYYY @HH:mm');
			console.log(`FORMATTED DATE = ${formattedDate}`);

			const score_array = res.node.score.split(' - ');

			const home_score = parseInt(score_array[0], 10);
			const away_score = parseInt(score_array[1], 10);

			let date_exists = formattedDate;

			if (res.node.eventDate) {
				date_exists = dayjs(res.node.eventDate).format('MM/DD/YYYY @HH:mm');
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

			const more_url = res.node.eventUrl;

			let formatted_url = more_url;

			if (more_url.indexOf('http') >= 0) {
				formatted_url = more_url;
			} else {
				formatted_url = `http://${more_url}`;
			}
			let o_logo = this.props.uiStore.current_theme_structure.header.logo.imageData;

			if (r_theme !== ('felzec' && 'enigma2')) {
				o_logo = g_image.image;
				console.log(`theme for logo = ${r_theme} logo = ${o_logo}`);
			}

			if (res.node.eventInfo === 'um') {
				if (this.isMobile() && r_theme === 'felzec') {
					const { OrganizationMatchesMobileComponentElementRender } = this.state;
					f_array.push(
						<OrganizationMatchesMobileComponentElementRender
							uiStore={this.props.uiStore}
							matches_image_1={o_logo}
							matches_image_2={res.node.gameLogo}
							matches_image_3={o_logo}
							matches_score={res.node.score}
							matches_game={g_type}
							matches_league={g_league}
							matches_date={date_exists}
							win_style={ws}
							more_url={formatted_url}
						/>
					);
				} else {
					f_array.push(
						<OrganizationMatchesComponentElementRender
							uiStore={this.props.uiStore}
							matches_image_1={o_logo}
							matches_image_3={o_logo}
							matches_image_2={res.node.gameLogo}
							matches_score={res.node.score}
							matches_game={g_type}
							matches_league={g_league}
							matches_date={date_exists}
							win_style={ws}
							more_url={formatted_url}
						/>
					);
				}
			} else {
				if (this.isMobile() && r_theme === 'felzec') {
					const { OrganizationMatchesMobileComponentElementRender } = this.state;
					p_array.push(
						<OrganizationMatchesMobileComponentElementRender
							uiStore={this.props.uiStore}
							matches_image_1={o_logo}
							matches_image_2={res.node.gameLogo}
							matches_image_3={o_logo}
							matches_score={res.node.score}
							matches_game={g_type}
							matches_league={g_league}
							matches_date={date_exists}
							win_style={ws}
							more_url={formatted_url}
						/>
					);
				} else {
					p_array.push(
						<OrganizationMatchesComponentElementRender
							uiStore={this.props.uiStore}
							matches_image_1={o_logo}
							matches_image_2={res.node.gameLogo}
							matches_image_3={o_logo}
							matches_score={res.node.score}
							matches_game={g_type}
							matches_league={g_league}
							matches_date={date_exists}
							win_style={ws}
							more_url={formatted_url}
						/>
					);
				}
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
		let combined_array = p_array;
		if (r_theme !== 'felzec') {
			combined_array = f_array.concat(p_array);
		}
		const enigma2_switch_title = { color: this.org_color };
		if (this.isMobile() && r_theme === 'felzec') {
			const { OrganizationMatchesMobileComponentRender } = this.state;
			return (
				<OrganizationMatchesMobileComponentRender
					uiStore={this.props.uiStore}
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
				/>
			);
		}
		return (
			<OrganizationMatchesComponentRender
				uiStore={this.props.uiStore}
				handleLeftScroll={this.handleLeftScroll}
				handleRightScroll={this.handleRightScroll}
				handleUpcomingClick={this.handleUpcomingClick}
				handleRecentClick={this.handleRecentClick}
				upcoming_style={this.state.upcoming_style}
				switch_title_color={enigma2_switch_title}
				recent_style={this.state.recent_style}
				rm_style={this.state.rm_style}
				fm_style={this.state.fm_style}
				recent_matches={combined_array}
				future_matches={f_array}
				bg_style={s}
				filter_style={f}
				storeRef={this.storeRef}
			/>
		);
	}
}

OrganizationMatchesController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(OrganizationMatchesController);

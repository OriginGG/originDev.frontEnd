import React, { Component } from 'react';
// import injectSheet from 'react-jss';
import find from 'lodash/find';
import loadable from '@loadable/component';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
// import { GlobalStyles } from 'Theme/Theme';
import { getRosterQuery } from '../../../../queries/rosters';
import { gameOptions } from '../../Admin/sub_controllers/data/AllGames';

class OrganizationNavController extends Component {
	state = { visible: false, OrganizationNavComponentRender: null, dropdown: false };
	componentDidMount = async () => {
		const p_array = [];
		// const theme = this.props.uiStore.current_organisation.themeId;

		const roster_data = await this.props.appManager.executeQuery('query', getRosterQuery, {
			rosterType: 'roster',
			organisationId: this.props.uiStore.current_organisation.id
		});
		roster_data.allCombinedRosters.edges.forEach((r) => {
			const { gameId } = r.node;
			const currGame = find(gameOptions, (o) => {
				return o.game_id === gameId;
			});
			p_array.push({ roster_id: r.node.id, image: currGame.image, text: currGame.text });
		});
		const OrganizationNavComponentRender = loadable(
			(props) =>
				import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${props.theme}/OrganizationNavComponentRender`),
			{
				fallback: <div>Loading...</div>
			}
		);
		this.image_src = this.props.uiStore.current_theme_structure.header.logo.imageData;
		this.setState({ roster: p_array, visible: true, OrganizationNavComponentRender });
		// const menu_color = this.props.uiStore.current_organisation.primaryColor;
		// console.log(`MENU COLOR = ${menu_color}`);
		// const nf_style = { display: 'none', backgroundColor: `${menu_color}` };
		// this.setState({ felzec_menu: false, felzec_style: nf_style });
	};
	componentDidCatch = (error, info) => {
		console.log(error, info);
	};
	handleRosterButtonClick = () => {
		// console.log(`roster click ${this.p_array}`);
		this.setState({ dropdown: true });
	};
	handleCloseClick = () => {
		// console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX handle close click');
		this.setState({ dropdown: false });
	};
	openPage = (page) => {
		window.open(page, '_blank');
	};
	isMobile = () => {
		// return true;
		// console.log(`page isMObile ${isMobile} screen width = ${window.outerWidth}`);
		if (isMobile || window.outerWidth < 1050) {
			// console.log('isMobile true');
			return true;
		}
		// console.log('isMobile false');
		return false;
	};
	// openMenu = () => {
	//     // console.log('open menu');
	//     if (this.state.felzec_menu) {
	//         const menu_color = this.props.uiStore.current_organisation.primaryColor;
	//         const st = { display: 'none', backgroundColor: `${menu_color}` };
	//         this.setState({ felzec_menu: false, felzec_style: st });
	//     } else {
	//         const menu_color = this.props.uiStore.current_organisation.primaryColor;
	//         const st = { display: 'table', backgroundColor: `${menu_color}` };
	//         this.setState({ felzec_menu: true, felzec_style: st });
	//     }
	// }
	render() {
		let theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation
			.themeId}`;
		if (this.isMobile()) {
			theme = 'mobile/dark';
		}
		// console.log(`twitch link = ${this.props.uiStore.current_organisation.twitchLink}`);
		if (this.state.visible === false) {
			return null;
		}
		let d_style = { display: 'none' };
		if (this.state.dropdown) {
			d_style = { display: 'table' };
		}
		const { OrganizationNavComponentRender } = this.state;
		const social_links = [];
		if (this.props.uiStore.current_organisation.twitterFeedUsername) {
			social_links.push(
				<i
					key="social_item1"
					role="menuItem"
					tabIndex={-1}
					onClick={() => {
						const p_string = `https://twitter.com/${this.props.uiStore.current_organisation
							.twitterFeedUsername}`;
						this.openPage(p_string);
					}}
					className="fab fa-twitter"
				/>
			);
		}
		if (this.props.uiStore.current_organisation.fbLink) {
			social_links.push(
				<i
					key="social_item2"
					role="menuItem"
					tabIndex={-1}
					onClick={() => {
						this.openPage(this.props.uiStore.current_organisation.fbLink);
					}}
					className="fab fa-facebook"
				/>
			);
		}
		if (this.props.uiStore.current_organisation.instaLink) {
			social_links.push(
				<i
					key="social_item3"
					role="menuItem"
					tabIndex={-1}
					onClick={() => {
						this.openPage(this.props.uiStore.current_organisation.instaLink);
					}}
					className="fab fa-instagram"
				/>
			);
		}
		if (this.props.uiStore.current_organisation.twitchLink) {
			social_links.push(
				<i
					key="social_item4"
					role="menuItem"
					tabIndex={-1}
					onClick={() => {
						this.openPage(this.props.uiStore.current_organisation.twitchLink);
					}}
					className="fab fa-twitch"
				/>
			);
		}
		if (this.props.uiStore.current_organisation.youtubeLink) {
			social_links.push(
				<i
					key="social_item5"
					role="menuItem"
					tabIndex={-1}
					onClick={() => {
						this.openPage(this.props.uiStore.current_organisation.youtubeLink);
					}}
					className="fab fa-youtube"
				/>
			);
		}
		if (this.props.uiStore.current_organisation.discordUrl) {
			social_links.push(
				<i
					key="social_item6"
					role="menuItem"
					tabIndex={-1}
					onClick={() => {
						this.openPage(this.props.uiStore.current_organisation.discordUrl);
					}}
					className="fab fa-discord"
				/>
			);
		}
		let social_link1 = <span />;
		let social_link2 = <span />;
		let social_link3 = <span />;
		let social_link4 = <span />;
		let social_link5 = <span />;
		let social_link6 = <span />;

		const navicon = (
			<i
				key="navicon"
				role="menuItem"
				tabIndex={-1}
				onClick={() => {
					this.props.openMenu();
				}}
				className="fas fa-bars"
			/>
		);

		if (social_links.length > 5) {
			social_link6 = social_links[5]; // eslint-disable-line
		}
		if (social_links.length > 4) {
			social_link5 = social_links[4]; // eslint-disable-line
		}
		if (social_links.length > 3) {
			social_link4 = social_links[3]; // eslint-disable-line
		}
		if (social_links.length > 2) {
			social_link3 = social_links[2]; // eslint-disable-line
		}
		if (social_links.length > 1) {
			social_link2 = social_links[1]; // eslint-disable-line
		}
		if (social_links.length > 0) {
			social_link1 = social_links[0]; // eslint-disable-line
		}

		const m_array = [];
		const p = this.state.roster;
		// console.log(` this.state.roster = ${JSON.stringify(p)}`);

		this.roster_button_display = false;
		p.forEach((g, i) => {
			this.roster_button_display = true;
			m_array.push(
				<div
					role="menuItem"
					tabIndex={-1}
					onClick={() => {
						this.props.handleRosterClick(g.roster_id);
					}}
					key={`gm_roster_${i}`}
					style={{
						cursor: 'pointer',
						paddingLeft: 10,
						color: 'white',
						borderBottom: '1px solid #bbbb'
					}}
				>
					{g.text}
				</div>
			);
		});
		let sssss = { display: 'none' };
		if (this.roster_button_display) {
			// console.log('WWWWWWWWWWW there is roster data');
			sssss = { display: 'inheret' };
		}

		return (
			<OrganizationNavComponentRender
				theme={theme}
				login_style={this.props.login_style}
				home_style={this.props.home_style}
				enigma2_home_style={this.props.enigma2_home_style}
				store_style={this.props.store_style}
				about_style={this.props.about_style}
				enigma2_about_style={this.props.enigma2_about_style}
				enigma2_news_style={this.props.enigma2_news_style}
				roster_dropdown_style={d_style}
				felzec_menu_style={this.props.felzec_style}
				dropdown_item={m_array}
				handleRosterButtonClick={this.handleRosterButtonClick}
				sponsers_style={this.props.sponsers_style}
				enigma2_sponsers_style={this.props.enigma2_sponsers_style}
				roster_menu_style={sssss}
				handleBlogButtonClick={this.handleBlogButtonClick}
				handleStoreClick={this.props.handleStoreClick}
				handleBlogClick={this.props.handleBlogClick}
				handleCloseClick={this.handleCloseClick}
				handleSponsersClick={this.props.handleSponsersClick}
				handleAboutClick={this.props.handleAboutClick}
				handleViewBlogClick={this.props.handleViewBlogClick}
				handleHomeClick={this.props.handleHomeClick}
				handleLoginClick={this.props.handleLoginClick}
				social_link1={social_link1}
				social_link2={social_link2}
				social_link3={social_link3}
				social_link4={social_link4}
				social_link5={social_link5}
				social_link6={social_link6}
				navicon={navicon}
				nav_logo={this.image_src}
				image_src={this.image_src}
			/>
		);
	}
}

OrganizationNavController.propTypes = {
	handleAboutClick: PropTypes.func.isRequired,
	handleSponsersClick: PropTypes.func.isRequired,
	handleRosterClick: PropTypes.func.isRequired,
	handleStoreClick: PropTypes.func.isRequired,
	handleHomeClick: PropTypes.func.isRequired,
	handleBlogClick: PropTypes.func.isRequired,
	handleViewBlogClick: PropTypes.func.isRequired,
	openMenu: PropTypes.func.isRequired,
	handleLoginClick: PropTypes.func.isRequired,
	uiStore: PropTypes.object.isRequired,
	about_style: PropTypes.object.isRequired,
	enigma2_about_style: PropTypes.object.isRequired,
	enigma2_news_style: PropTypes.object.isRequired,
	felzec_style: PropTypes.object.isRequired,
	sponsers_style: PropTypes.object.isRequired,
	enigma2_sponsers_style: PropTypes.object.isRequired,
	store_style: PropTypes.object.isRequired,
	home_style: PropTypes.object.isRequired,
	enigma2_home_style: PropTypes.object.isRequired,
	login_style: PropTypes.object.isRequired,
	appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(OrganizationNavController);

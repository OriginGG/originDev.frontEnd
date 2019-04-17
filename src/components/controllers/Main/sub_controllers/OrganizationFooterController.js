import React, { Component } from 'react';
// import injectSheet from 'react-jss';
import find from 'lodash/find';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import loadable from '@loadable/component';
import { isMobile } from 'react-device-detect';
// import { GlobalStyles } from 'Theme/Theme';
import { getBlogsQuery } from '../../../../queries/blogs';
import { getSponsorsQuery } from '../../../../queries/sponsors';
import { getRosterQuery } from '../../../../queries/rosters';
import { gameOptions } from '../../Admin/sub_controllers/data/AllGames';

class OrganizationFooterController extends Component {
	state = { visible: false, OrganizationFooterComponentRender: null, dropdown: false };
	componentDidMount = async () => {
		const p_array = [];
		// const theme = this.props.uiStore.current_organisation.themeId;
		let theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation
			.themeId}`;
		if (this.isMobile()) {
			theme = 'mobile/dark';
		}
		console.log(`footercontrooler theme = ${theme}`);
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
		// const subDomain = this.props.uiStore.current_subdomain;
		const blog_data = await this.props.appManager.executeQuery('query', getBlogsQuery, {
			organisationId: this.props.uiStore.current_organisation.id
		});
		const sponsor_data = await this.props.appManager.executeQuery('query', getSponsorsQuery, {
			organisationId: this.props.uiStore.current_organisation.id
		});
		const { nodes } = sponsor_data.allOrgSponsors;
		this.sponsor_data = nodes;
		this.results_array = [];
		blog_data.resultData.edges.forEach((blog, i) => {
			const { blogMedia } = blog.node;
			const { blogTitle } = blog.node;
			const { createdAt } = blog.node;
			const blog_d = blog;
			// console.log(`blogMain = ${blog}`);
			const formattedDate = dayjs(createdAt).format('MMMM D, YYYY h:mm A');
			this.results_array.push({
				media: blogMedia,
				title: blogTitle,
				date: formattedDate,
				blog: blog_d,
				key: i
			});
		});
		const OrganizationFooterComponentRender = loadable(
			() =>
				import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${theme}/OrganizationFooterComponentRender`),
			{
				fallback: <div>Loading...</div>
			}
		);
		const OrganizationFooterMobileComponentRender = loadable(
			() =>
				import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${theme}/OrganizationFooterMobileComponentRender`),
			{
				fallback: <div>Loading...</div>
			}
		);
		const OrganizationFooterNewsComponentRender = loadable(
			() =>
				import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${theme}/OrganizationFooterNewsComponentRender`),
			{
				fallback: <div>Loading...</div>
			}
		);
		this.image_src = this.props.uiStore.current_theme_structure.header.logo.imageData;
		this.setState({
			roster: p_array,
			visible: true,
			OrganizationFooterComponentRender,
			OrganizationFooterMobileComponentRender,
			OrganizationFooterNewsComponentRender
		});
		const nf_style = { display: 'none' };
		this.setState({ felzec_menu: false, felzec_style: nf_style });
	};
	componentDidCatch = (error, info) => {
		console.log(error, info);
	};
	handleRosterButtonClick = () => {
		// console.log(`roster click ${this.p_array}`);
		this.setState({ dropdown: true });
	};
	isMobile = () => {
		// return true;
		console.log(`page isMObile ${isMobile} screen width = ${window.outerWidth}`);
		if (isMobile || window.outerWidth < 1050) {
			return true;
		}
		return false;
	};
	handleCloseClick = () => {
		// console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX handle close click');
		this.setState({ dropdown: false });
	};
	openPage = (page) => {
		window.open(page, '_blank');
	};
	handleSupportClick = () => {
		// console.log('handle support click');
		const emailTo = this.props.uiStore.current_organisation.supportContactEmail;
		window.open(`mailto:${emailTo}`, '_blank');
	};
	handleBusinessClick = () => {
		// console.log('handle business click');
		const emailTo = this.props.uiStore.current_organisation.businessContactEmail;
		window.open(`mailto:${emailTo}`, '_blank');
	};
	openMenu = () => {
		// console.log('open menu');
		if (this.state.felzec_menu) {
			const st = { display: 'none' };
			this.setState({ felzec_menu: false, felzec_style: st });
		} else {
			const st = { display: 'table' };
			this.setState({ felzec_menu: true, felzec_style: st });
		}
	};
	render() {
		// console.log(`twitch link = ${this.props.uiStore.current_organisation.twitchLink}`);
		if (this.state.visible === false) {
			return null;
		}
		let d_style = { display: 'none' };
		if (this.state.dropdown) {
			d_style = { display: 'table' };
		}
		const { OrganizationFooterComponentRender } = this.state;
		const { OrganizationFooterMobileComponentRender } = this.state;
		const { OrganizationFooterNewsComponentRender } = this.state;

		const news_array = [];
		const default_array = [
			{ image: 'https://res.cloudinary.com/origingg/image/upload/f_auto,q_auto/v1555453137/_331____blog_-1.png' },
			{ image: 'https://res.cloudinary.com/origingg/image/upload/f_auto,q_auto/v1555453211/_331____blog_-1.png' },
			{ image: 'https://res.cloudinary.com/origingg/image/upload/f_auto,q_auto/v1555453235/_331____blog_-1.png' }
		];
		for (let i = 0; i < 3; i += 1) {
			if (this.results_array[i]) {
				news_array.push(
					<OrganizationFooterNewsComponentRender
						uiStore={this.props.uiStore}
						handleNewsClick={this.props.handleNewsClick}
						blog={this.results_array[i].blog}
						blog_media={this.results_array[i].media}
						blog_content={this.results_array[i].title}
						blog_title={this.results_array[i].blogTitle}
					/>
				);
			} else {
				const b_title_1 = 'Coming Soon';
				const b_media_1 = default_array[i].image;
				const b_content_1 = '';
				const b_1 = null;
				news_array.push(
					<OrganizationFooterNewsComponentRender
						uiStore={this.props.uiStore}
						handleNewsClick={this.props.handleNewsClick}
						blog={b_1}
						blog_media={b_media_1}
						blog_content={b_title_1}
						blog_title={b_content_1}
					/>
				);
			}
		}
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
					this.openMenu();
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

		const sp_array = [];

		this.sponsor_data.forEach((n) => {
			// console.log(i);
			sp_array.push(n.imageUrl);
		});

		if (this.isMobile()) {
			return (
				<OrganizationFooterMobileComponentRender
					uiStore={this.props.uiStore}
					login_style={this.props.login_style}
					home_style={this.props.home_style}
					store_style={this.props.store_style}
					about_style={this.props.about_style}
					footer_about={this.props.footer_about}
					roster_dropdown_style={d_style}
					sponsor_image_1={sp_array[0]}
					sponsor_image_2={sp_array[1]}
					sponsor_image_3={sp_array[2]}
					sponsor_image_4={sp_array[3]}
					blog_items={news_array}
					felzec_menu_style={this.state.felzec_style}
					dropdown_item={m_array}
					handleRosterButtonClick={this.handleRosterButtonClick}
					sponsers_style={this.props.sponsers_style}
					footer_support={this.props.footer_support}
					footer_business={this.props.footer_business}
					handleBusinessClick={this.handleBusinessClick}
					handleSupportClick={this.handleSupportClick}
					roster_menu_style={sssss}
					handleBlogButtonClick={this.handleBlogButtonClick}
					handleStoreClick={this.props.handleStoreClick}
					handleBlogClick={this.props.handleBlogClick}
					handleCloseClick={this.handleCloseClick}
					handleSponsersClick={this.props.handleSponsersClick}
					handleAboutClick={this.props.handleAboutClick}
					handleViewBlogClick={this.props.handleViewBlogClick}
					handleLoginClick={this.props.handleLoginClick}
					social_link1={social_link1}
					social_link2={social_link2}
					social_link3={social_link3}
					social_link4={social_link4}
					social_link5={social_link5}
					social_link6={social_link6}
					navicon={navicon}
					image_src={this.image_src}
				/>
			);
		}

		return (
			<OrganizationFooterComponentRender
				uiStore={this.props.uiStore}
				login_style={this.props.login_style}
				home_style={this.props.home_style}
				store_style={this.props.store_style}
				about_style={this.props.about_style}
				footer_about={this.props.footer_about}
				roster_dropdown_style={d_style}
				sponsor_image_1={sp_array[0]}
				sponsor_image_2={sp_array[1]}
				sponsor_image_3={sp_array[2]}
				sponsor_image_4={sp_array[3]}
				blog_items={news_array}
				felzec_menu_style={this.state.felzec_style}
				dropdown_item={m_array}
				handleRosterButtonClick={this.handleRosterButtonClick}
				sponsers_style={this.props.sponsers_style}
				footer_support={this.props.footer_support}
				footer_business={this.props.footer_business}
				handleBusinessClick={this.handleBusinessClick}
				handleSupportClick={this.handleSupportClick}
				roster_menu_style={sssss}
				handleBlogButtonClick={this.handleBlogButtonClick}
				handleStoreClick={this.props.handleStoreClick}
				handleBlogClick={this.props.handleBlogClick}
				handleCloseClick={this.handleCloseClick}
				handleSponsersClick={this.props.handleSponsersClick}
				handleAboutClick={this.props.handleAboutClick}
				handleViewBlogClick={this.props.handleViewBlogClick}
				handleLoginClick={this.props.handleLoginClick}
				social_link1={social_link1}
				social_link2={social_link2}
				social_link3={social_link3}
				social_link4={social_link4}
				social_link5={social_link5}
				social_link6={social_link6}
				navicon={navicon}
				image_src={this.image_src}
			/>
		);
	}
}

OrganizationFooterController.propTypes = {
	handleAboutClick: PropTypes.func.isRequired,
	handleSponsersClick: PropTypes.func.isRequired,
	handleRosterClick: PropTypes.func.isRequired,
	handleStoreClick: PropTypes.func.isRequired,
	handleBlogClick: PropTypes.func.isRequired,
	handleViewBlogClick: PropTypes.func.isRequired,
	handleLoginClick: PropTypes.func.isRequired,
	uiStore: PropTypes.object.isRequired,
	about_style: PropTypes.object.isRequired,
	footer_support: PropTypes.object.isRequired,
	footer_business: PropTypes.object.isRequired,
	sponsers_style: PropTypes.object.isRequired,
	store_style: PropTypes.object.isRequired,
	home_style: PropTypes.object.isRequired,
	footer_about: PropTypes.object.isRequired,
	login_style: PropTypes.object.isRequired,
	appManager: PropTypes.object.isRequired,
	handleNewsClick: PropTypes.func.isRequired
};

export default inject('uiStore', 'appManager')(OrganizationFooterController);

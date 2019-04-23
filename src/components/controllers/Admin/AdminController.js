import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { autorun } from 'mobx';
import { Button, Card, Image } from 'semantic-ui-react';
import { Modal, Layout } from 'antd';
import { toast } from 'react-toastify';
import { isMobile } from 'react-device-detect';
import PropTypes from 'prop-types';
import { StripeProvider } from 'react-stripe-elements';
import axios from 'axios';
import Drift from 'react-driftjs';
import { Accordion, Icon } from 'semantic-ui-react/dist/commonjs';
// import { push as Menu } from 'react-burger-menu';
import { GlobalStyles } from 'Theme/Theme';
// import moment from 'moment-timezone';
import OrganizationAdminPageComponentRender from '../../render_components/admin/OrganizationAdminPageComponentRender';
import OrganizationAdminMenuComponentRender from '../../render_components/admin/OrganizationAdminMenuComponentRender';
import AdminProfileController from './sub_controllers/AdminProfileController';
import AdminBlogController from './sub_controllers/AdminBlogController';
import AdminMembersController from './sub_controllers/AdminMembersController';
import AdminAboutController from './sub_controllers/AdminAboutController';
import AdminMediaController from './sub_controllers/AdminMediaController';
import AdminSponsorController from './sub_controllers/AdminSponsorController';
import AdminRosterController from './sub_controllers/AdminRosterController';
import AdminStaffController from './sub_controllers/AdminStaffController';
import AdminThemeController from './sub_controllers/AdminNewThemeController';
import AdminCollaboratorController from './sub_controllers/AdminCollaboratorController';
import AdminRecentMatchesController from './sub_controllers/AdminRecentMatchesController';
import AdminContentTeamController from './sub_controllers/AdminContentTeamController';
import AdminCustomDomainController from './sub_controllers/AdminCustomDomainController';
import AdminSocialStatsController from './sub_controllers/AdminSocialStatsController';
import { getOrganisationQuery } from '../../../queries/organisation';
import { getUserQuery } from '../../../queries/users';
import { getEmailRegistrationQuery } from '../../../queries/registrations';
// import { getSponsorsQuery, createSponsorsQuery } from '../../../queries/sponsors';
import historyStore from '../../../utils/stores/browserHistory';
import stripeImage from '../../../assets/images/stripeSecure.png';


const { confirm } = Modal;
const { Sider, Content } = Layout;

// import PropTypes from 'prop-types';
class MenuDrop extends Component {
	state = { open: true };
	handleMenuClick = (v, e) => {
		console.log(e);
		this.props.handleManageClick(v);
	};

	handleClick = () => {
		const f = this.state.open;
		this.setState({ open: !f });
	};

	render() {
		return (
			<div>
				<Accordion fluid inverted>
					<Accordion.Title active={this.state.open} index={0} onClick={this.handleClick}>
						<Icon name="dropdown" />
						Manage Content
					</Accordion.Title>
					<Accordion.Content active={this.state.open}>
						<a
							className="item"
							tabIndex={-1}
							role="menuitem"
							onClick={(e) => {
								this.handleMenuClick('theme', e);
							}}
						>
							<div className={this.props.classes.menu_item}>
								<div className={this.props.classes.menu_item_icon}>
									<i className="paint brush icon" />
								</div>
								<div className={this.props.classes.menu_item_label}>Theme</div>
							</div>
						</a>
						<a
							className="item"
							tabIndex={-1}
							role="menuitem"
							onClick={(e) => {
								this.handleMenuClick('about', e);
							}}
						>
							<div className={this.props.classes.menu_item}>
								<div className={this.props.classes.menu_item_icon}>
									<i className="comment outline icon" />
								</div>
								<div className={this.props.classes.menu_item_label}>About</div>
							</div>
						</a>
						{
							<a className="item">
								<div
									className={this.props.classes.menu_item}
									tabIndex={-1}
									role="menuitem"
									onClick={(e) => {
										this.handleMenuClick('staff', e);
									}}
								>
									<div className={this.props.classes.menu_item_icon}>
										<i className="id card icon" />
									</div>
									<div className={this.props.classes.menu_item_label}>Staff</div>
								</div>
							</a>
						}
						<a className="item">
							<div
								className={this.props.classes.menu_item}
								tabIndex={-1}
								role="menuitem"
								onClick={(e) => {
									this.handleMenuClick('roster', e);
								}}
							>
								<div className={this.props.classes.menu_item_icon}>
									<i className="bullseye icon" />
								</div>
								<div className={this.props.classes.menu_item_label}>Roster</div>
							</div>
						</a>
						<a className="item">
							<div
								className={this.props.classes.menu_item}
								tabIndex={-1}
								role="menuitem"
								onClick={(e) => {
									this.handleMenuClick('content_team', e);
								}}
							>
								<div className={this.props.classes.menu_item_icon}>
									<i className="group icon" />
								</div>
								<div className={this.props.classes.menu_item_label}>Content Team</div>
							</div>
						</a>
						<a
							className="item"
							tabIndex={-1}
							role="menuitem"
							onClick={(e) => {
								this.handleMenuClick('blog', e);
							}}
						>
							<div className={this.props.classes.menu_item}>
								<div className={this.props.classes.menu_item_icon}>
									<i className="keyboard icon" />
								</div>
								<div className={this.props.classes.menu_item_label}>Blog</div>
							</div>
						</a>
						<a
							className="item"
							tabIndex={-1}
							role="menuitem"
							onClick={(e) => {
								this.handleMenuClick('media', e);
							}}
						>
							<div className={this.props.classes.menu_item}>
								<div className={this.props.classes.menu_item_icon}>
									<i className="file alternate icon" />
								</div>
								<div className={this.props.classes.menu_item_label}>Media</div>
							</div>
						</a>
						<a
							className="item"
							tabIndex={-1}
							role="menuitem"
							onClick={(e) => {
								this.handleMenuClick('recentmatches', e);
							}}
						>
							<div className={this.props.classes.menu_item}>
								<div className={this.props.classes.menu_item_icon}>
									<i className="trophy icon" />
								</div>
								<div className={this.props.classes.menu_item_label}>Recent Matches</div>
							</div>
						</a>
						<a
							className="item"
							tabIndex={-1}
							role="menuitem"
							onClick={(e) => {
								this.handleMenuClick('sponsors', e);
							}}
						>
							<div className={this.props.classes.menu_item}>
								<div className={this.props.classes.menu_item_icon}>
									<i className="dollar sign icon" />
								</div>
								<div className={this.props.classes.menu_item_label}>Sponsors</div>
							</div>
						</a>
						<a
							className="item"
							tabIndex={-1}
							role="menuitem"
							onClick={(e) => {
								this.handleMenuClick('add_custom_domain', e);
							}}
						>
							<div className={this.props.classes.menu_item}>
								<div className={this.props.classes.menu_item_icon}>
									<i className="linkify icon" />
								</div>
								<div className={this.props.classes.menu_item_label}>Add a custom domain</div>
							</div>
						</a>
						<a
							className="item"
							tabIndex={-1}
							role="menuitem"
							onClick={(e) => {
								this.handleMenuClick('social_stats', e);
							}}
						>
							<div className={this.props.classes.menu_item}>
								<div className={this.props.classes.menu_item_icon}>
									<i className="chart line icon" />
								</div>
								<div className={this.props.classes.menu_item_label}>Social Stats</div>
								<div className={this.props.classes.menu_item_badge}>BETA</div>
							</div>
						</a>
					</Accordion.Content>
				</Accordion>
			</div>
		);
	}
}
class AdminPageController extends Component {
	state = {
		page: 'company',
		isOpen: true,
		visible: false,
		error_page: true
	};
	componentDidMount = async () => {
		document.getElementById('origin_loader').style.display = 'none';
		if (this.props.appManager.admin_logged_in) {
			// const { user_id } = this.props.uiStore;
			// const user = await this.props.appManager.executeQueryAuth('query', getUserQuery, { id: user_id });
			// this.subscribed = user.resultData.subscribed;
			if (this.isMobile()) {
				this.setState({ isOpen: false });
			}
			const { user_id } = this.props.uiStore;
			const user = await this.props.appManager.executeQueryAuth('query', getUserQuery, { id: user_id });
			const { email } = user.resultData;
			const customer = await axios.get(
				`${process.env.REACT_APP_API_SERVER}/stripe/new2/retrieve_customer?email=${email}`
			);
			console.log(customer);
			this.authenticated = user.resultData.authenticated;
			this.user_email = user.resultData.email;
			this.subscription_days_left = null;
			// if (customer.data.success !== false) {
			// 	const { subscriptions } = customer.data.customer;
			// 	const num_sources = customer.data.customer.sources.total_count;
			// 	if (!num_sources) {
			// 		const { trial_end } = subscriptions.data[0];
			// 		if (trial_end) {
			// 			// const cur = moment().tz('America/New_York');
			// 			const cur = dayjs(new Date()); // .toLocaleString('en-US', { timeZone: 'America/New_York' }));
			// 			// const day_diff = moment(Math.round(trial_end * 1000)).diff(cur, 'days');
			// 			const day_diff = dayjs(trial_end * 1000).diff(cur, 'days');
			// 			this.subscription_days_left = day_diff;
			// 		}
			// 	}
			// }
			const { subscribed } = user.resultData;
			const domainInfo = this.props.appManager.getDomainInfo();
			const subDomain =
				domainInfo.subDomain === null ? process.env.REACT_APP_DEFAULT_ORGANISATION_NAME : domainInfo.subDomain;
			// console.log(`domainInfo = ${JSON.stringify(domainInfo)}`);
			// const url_string = `${domainInfo.protocol}//${domainInfo.hostname}${(domainInfo.port === 443 || domainInfo.port === 80 || domainInfo.port === '') ? '' : `:${domainInfo.port}`}`;
			// console.log(`domain info urlstring = ${url_string}`);
			const o = await this.props.appManager.executeQueryAuth('query', getOrganisationQuery, { subDomain });
			if (o.resultData === null) {
				console.log('sub domain does not exist!');
			} else {
				this.subscription_days_left = null;
				this.props.uiStore.setOrganisation(o.resultData);
				if (!subscribed) {
					if (customer.data.success === false || (customer.data.success === true && customer.data.customer.subscriptions.data.length === 0)) {
						this.subscription_days_left = this.props.uiStore.getSubScriptionDaysLeft();
					}
				}
				let f = !subscribed;
				if (this.subscription_days_left !== null && this.subscription_days_left > 0) {
					f = false;
				}
				this.props.uiStore.setSubDomain(subDomain);
				this.setState({ visible: true, error_page: f });

				this.autorun_tracker = autorun(() => {
					if (this.props.uiStore.current_theme_structure.header.logo.imageData) {
						if (this.initialized === true) {
							this.my_key += 1;
							this.setState({ visible: true });
						}
					}
				});
			}
			// console.log(user_id);
			this.initialized = true;
		} else {
			historyStore.push('/admin');
		}
	};
	componentWillUnmount() {
		if (this.autorun_tracker) {
			this.autorun_tracker();
		}
	}
	autorun_tracker = null;
	initialized = false;
	my_key = 1;
	handleClick = () => {
		const f = this.state.isOpen;
		this.setState({ isOpen: !f });
	};
	isMobile = () => {
		// return true;
		console.log(`page isMObile ${isMobile} screen width = ${window.outerWidth}`);
		if (isMobile || window.outerWidth < 1050) {
			return true;
		}
		return false;
	};
	handleNavClick = () => {
		// console.log('nav click');
		const domainInfo = this.props.appManager.getDomainInfo();
		const url_string = `${domainInfo.protocol}//${domainInfo.hostname}${domainInfo.port === 443 ||
		domainInfo.port === 80 ||
		domainInfo.port === ''
			? ''
			: `:${domainInfo.port}`}`;
		// console.log(`domain info urlstring = ${url_string}`);
		window.open(url_string, '_blank');
	};
	closeModal = () => {
		this.setState({ page: 'company' });
	};
	handleManageClick = async (v) => {
		this.setState({ page: v });
	};
	gotoPayWall = () => {
		historyStore.push('/paywall');
	};
	handleLoginAndSubscribe = () => {
		historyStore.push({ pathname: '/login_org', state: { paywall: true } });
	};
	sendEmail = (url) => {
		return new Promise((resolve, reject) => {
			const full_url = `${process.env.REACT_APP_API_SERVER}${url}`;
			axios
				.get(full_url)
				.then((x) => {
					resolve(x.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	};
	showSendConfirm = () => {
		return new Promise((resolve) => {
			confirm({
				title: 'Registration',
				content: 'Do you want to re-send registration email?',
				okText: 'Yes',
				okType: 'danger',
				cancelText: 'No',
				onOk: () => {
					resolve(true);
				},
				onCancel: () => {
					resolve(false);
				}
			});
		});
	};
	resendVerifcation = async () => {
		const f = await this.showSendConfirm();
		if (f) {
			const r = await this.props.appManager.executeQuery('query', getEmailRegistrationQuery, {
				email: this.user_email
			});
			const email_payload = r.registrationEmailByEmail.payload;
			const url = Buffer.from(email_payload, 'hex').toString('utf8');
			await this.sendEmail(url);
			toast.success(
				`Registration email re-sent to ${this.user_email}, please check your email for further instructions.`,
				{
					position: toast.POSITION.TOP_LEFT,
					autoClose: 15000
				}
			);
		}
	};
	render() {
		let pwc = <span />;
		let awc = <span />;
		let update_card_style = { display: 'inherit' };
		if (this.subscription_days_left !== null) {
			update_card_style = { display: 'none' };
			pwc = (
				<Card>
					<Card.Content>
						<Image floated="right" style={{ height: 32, width: 164 }} size="mini" src={stripeImage} />
						<Card.Header>FREE TRIAL</Card.Header>
						<Card.Description>
							You have <strong>{this.subscription_days_left} days left of your free trial.</strong>
						</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<Button onClick={this.gotoPayWall} basic color="green">
							Pay Now
						</Button>
					</Card.Content>
				</Card>
			);
		}
		if (this.authenticated === false) {
			awc = (
				<Card>
					<Card.Content>
						<Card.Header>ACCOUNT NOT VERIFIED</Card.Header>
						<Card.Description>
							This account has not been verified, please check your email and complete your verification
							process. Click the Button Below to resend verification email.
						</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<Button onClick={this.resendVerifcation} basic color="green">
							Resend Verification
						</Button>
					</Card.Content>
				</Card>
			);
		}
		const info_block = (
			<div>
				{pwc}
				{awc}
			</div>
		);
		if (this.state.visible === false) {
			return null;
		}
		let p_component = <span />;
		switch (this.state.page) {
			case 'social_stats': {
				p_component = (
					<AdminSocialStatsController
						domain={this.props.uiStore.current_organisation.subDomain}
						user_id={this.props.uiStore.user_id}
					/>
				);
				break;
			}
			case 'add_custom_domain': {
				p_component = <AdminCustomDomainController dont_allow={this.subscription_days_left > 0} />;
				break;
			}
			case 'company': {
				p_component = <AdminProfileController />;
				break;
			}
			case 'roster': {
				p_component = <AdminRosterController />;
				break;
			}
			case 'media': {
				p_component = <AdminMediaController />;
				break;
			}
			case 'blog': {
				p_component = <AdminBlogController />;
				break;
			}
			case 'sponsors': {
				p_component = <AdminSponsorController />;
				break;
			}
			case 'theme': {
				p_component = <AdminThemeController />;
				break;
			}
			case 'collaborators': {
				p_component = <AdminCollaboratorController />;
				break;
			}
			case 'members': {
				p_component = <AdminMembersController />;
				break;
			}
			case 'update_card': {
				const domainInfo = this.props.appManager.getDomainInfo();
				const { hostname } = domainInfo;
				const subDomain =
					domainInfo.subDomain === null
						? process.env.REACT_APP_DEFAULT_ORGANISATION_NAME
						: domainInfo.subDomain;
				const new_host = hostname.replace(`${subDomain}.`, '');
				const u_string = `${domainInfo.protocol}//${new_host}:${domainInfo.port}`;
				window.location = `${u_string}/update_payment`;
				break;
			}
			case 'recentmatches': {
				p_component = <AdminRecentMatchesController />;
				break;
			}
			case 'content_team': {
				p_component = <AdminContentTeamController closeModal={this.closeModal} />;
				break;
			}
			case 'about': {
				p_component = <AdminAboutController />;
				break;
			}
			case 'staff': {
				p_component = <AdminStaffController />;
				break;
			}
			default: {
				break;
			}
		}
		const nd = this.props.uiStore.current_organisation.usersByOrganisationId.edges[0].node;
		const full_name = `${nd.firstName} ${nd.lastName}`;
		let nav_button = { right: '28px' };
		let close_style = { display: 'none' };
		if (this.isMobile()) {
			nav_button = { right: '10px' };
			close_style = { displa: 'inherit' };
		}
		return (
			<div id="outer-container">
				{this.state.error_page && (
					<div>
						<div id="error_page" className="error_page" />
						<div id="error_page" className="error_page_overlay">
							<div
								style={{
									paddingLeft: 32,
									paddingRight: 32,
									textAlign: 'center',
									lineHeight: '32px',
									fontSize: 32,
									display: 'flex',
									justifyContent: 'center'
								}}
							>
								THIS SUBDOMAIN REQUIRES A SUBSCRIPTION TO CONTINUE, CLICK BELOW TO LOGIN AND SUBSCRIBE.
								<br />
								OR CONTACT ORIGIN SUPPORT FOR MORE INFORMATION.
								<br />
								<a href="mailto:support@origin.gg" style={{ display: 'contents' }}>
									support@origin.gg
								</a>
							</div>
							<div
								style={{
									marginTop: 64,
									textAlign: 'center',
									display: 'flex',
									justifyContent: 'center'
								}}
							>
								<Button onClick={this.handleLoginAndSubscribe}>LOGIN AND SUBSCRIBE</Button>
							</div>
						</div>
					</div>
				)}
				<Drift appId="ag5c43cpxebr" />
				<StripeProvider apiKey={process.env.REACT_APP_STRIPE_PK_KEY}>
					<Layout>
						{this.state.isOpen && (
							<Sider width={366}>
								<div style={{ height: '100vh', overflowY: 'auto' }}>
									<OrganizationAdminMenuComponentRender
										key={`admin_sidebar_key_${this.my_key}`}
										handleMainMenuClick={this.handleManageClick}
										handleCloseClick={this.handleClick}
										close_style={close_style}
										update_card_style={update_card_style}
										paywall_content={info_block}
										dropdown={
											<MenuDrop
												handleManageClick={this.handleManageClick}
												classes={this.props.classes}
											/>
										}
										fullname={full_name}
										image_src={this.props.uiStore.current_theme_structure.header.logo.imageData}
									/>
								</div>
							</Sider>
						)}
						<Layout>
							<Content>
								<div style={{ padding: 8, height: '100vh', overflowY: 'auto' }}>
									<OrganizationAdminPageComponentRender
										navigate_style={nav_button}
										admin_content={p_component}
										handleClick={this.handleClick}
										handleNavClick={this.handleNavClick}
									/>
								</div>
							</Content>
						</Layout>
					</Layout>
				</StripeProvider>
			</div>
		);
	}
}
AdminPageController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	appManager: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};
MenuDrop.propTypes = {
	classes: PropTypes.object.isRequired,
	handleManageClick: PropTypes.func.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminPageController));

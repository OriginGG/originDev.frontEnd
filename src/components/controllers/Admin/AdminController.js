import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Icon, Sidebar, Container, Sidenav, Header, Content, Button } from 'rsuite';
import axios from 'axios';
import { inject } from 'mobx-react';
import { autorun } from 'mobx';
import { isMobile } from 'react-device-detect';
// import Drift from 'react-driftjs';
import '../../../../node_modules/rsuite/dist/styles/rsuite.min.css';
import AdminProfileController from './new_subcontrollers/AdminProfileController';
import AdminMediaController from './new_subcontrollers/AdminMediaController';
import AdminThemeController from './new_subcontrollers/AdminThemeController';
import AdminMembersController from './new_subcontrollers/AdminMembersController';
import AdminSponsorController from './new_subcontrollers/AdminSponsorController';
import AdminAboutController from './new_subcontrollers/AdminAboutController';
import AdminRosterController from './new_subcontrollers/AdminRosterController';
import AdminStaffController from './new_subcontrollers/AdminStaffController';
import { getOrganisationQuery } from '../../../queries/organisation';
import { getUserQuery } from '../../../queries/users';
import historyStore from '../../../utils/stores/browserHistory';
import AdminContentTeamController from './new_subcontrollers/AdminContentTeamController';
import AdminRecentMatchesController from './new_subcontrollers/AdminRecentMatchesController';
import AdminBlogController from './new_subcontrollers/AdminBlogController';
import AdminCustomDomainController from './new_subcontrollers/AdminCustomDomainController';
import AdminSubscriptionController from './new_subcontrollers/AdminSubscriptionController';

const headerStyles = {
	padding: 18,
	fontSize: 16,
	height: 56,
	background: '#34c3ff',
	color: ' #fff',
	whiteSpace: 'nowrap',
	overflow: 'hidden'
};

// const iconStyles = {
// 	width: 56,
// 	height: 56,
// 	lineHeight: '56px',
// 	textAlign: 'center'
// };

const NavToggle = ({ expand, onChange }) => {
	return (
		<Navbar appearance="subtle" className="nav-toggle">
			<Navbar.Body>
				{/* <Nav>
					<Dropdown
						placement="topLeft"
						trigger="click"
						renderTitle={() => {
							return <Icon style={iconStyles} icon="cog" />;
						}}
					>
						<Dropdown.Item>Help</Dropdown.Item>
						<Dropdown.Item>Settings</Dropdown.Item>
						<Dropdown.Item>Sign out</Dropdown.Item>
					</Dropdown>
				</Nav> */}

				<Nav pullRight>
					<Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
						<Icon icon={expand ? 'angle-left' : 'angle-right'} />
					</Nav.Item>
				</Nav>
			</Navbar.Body>
		</Navbar>
	);
};

class AdminPageController extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expand: true,
			pageTitle: 'Company Profile',
			content: <AdminProfileController />,
			visible: false
		};
		this.handleToggle = this.handleToggle.bind(this);
	}
	componentDidMount = async () => {
		document.getElementById('origin_loader').style.display = 'none';
		if (this.props.appManager.admin_logged_in) {
			// const { user_id } = this.props.uiStore;
			// const user = await this.props.appManager.executeQueryAuth('query', getUserQuery, { id: user_id });
			// this.subscribed = user.resultData.subscribed;
			// if (this.isMobile()) {
			// 	this.setState({ isOpen: false });
			// }
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
			this.props.uiStore.setSubscribed(subscribed);
console.log(this.props.uiStore);
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
					if (
						customer.data.success === false ||
						(customer.data.success === true && customer.data.customer.subscriptions.data.length === 0)
					) {
						this.subscription_days_left = this.props.uiStore.getSubScriptionDaysLeft();
					}
				}
				let f = !subscribed;
				if (this.subscription_days_left !== null && this.subscription_days_left > 0) {
					f = false;
				}
				this.props.uiStore.setSubDomain(subDomain);
				const expand = isMobile ? false : true;
				this.setState({ visible: true, expand, error_page: f });

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
	handleToggle() {
		if (!isMobile) {
			this.setState({
				expand: !this.state.expand
			});
		}
	}
	selectMenuItem = (pageTitle) => {
		let cv = <AdminProfileController />;
		switch (pageTitle) {
			default:
			case 'nav_site': {
				const domainInfo = this.props.appManager.getDomainInfo();
				const { hostname } = domainInfo;
				// const subDomain =
				// 	domainInfo.subDomain === null
				// 		? process.env.REACT_APP_DEFAULT_ORGANISATION_NAME
				// 		: domainInfo.subDomain;
				// const new_host = hostname.replace(`${subDomain}.`, '');
				const u_string = `${domainInfo.protocol}//${hostname}:${domainInfo.port}`;
				window.open(`${u_string}/main`, '_blank');
				break;
			}
			case 'Update Payment': {
			cv = <AdminSubscriptionController />;
				break;
			}
			case 'Company Profile': {
				break;
			}
			case 'Media': {
				cv = <AdminMediaController />;
				break;
			}
			case 'Theme': {
				cv = <AdminThemeController />;
				break;
			}
			case 'Members Admin': {
				cv = <AdminMembersController />;
				break;
			}
			case 'Sponsors Admin': {
				cv = <AdminSponsorController />;
				break;
			}
			case 'Roster Admin': {
				cv = <AdminRosterController />;
				break;
			}
			case 'Staff Admin': {
				cv = <AdminStaffController />;
				break;
			}
			case 'About Page': {
				cv = <AdminAboutController />;
				break;
			}
			case 'Content Team Admin': {
				cv = <AdminContentTeamController />;
				break;
			}
			case 'Blog Admin': {
				cv = <AdminBlogController />;
				break;
			}
			case 'Recent Matches Admin': {
				cv = <AdminRecentMatchesController />;
				break;
			}
			case 'Custom Domain Admin': {
				cv = <AdminCustomDomainController />;
				break;
			}
		}
		this.setState({ pageTitle, content: cv });
	};
	handleLoginAndSubscribe = () => {
		historyStore.push({ pathname: '/login_org', state: { paywall: true } });
	};
	render() {
		if (this.state.visible === false) {
			return null;
		}
		const { expand } = this.state;
		const d_width = expand ? 260 : 56;
		let dis = false;
		if (this.subscription_days_left && this.subscription_days_left > 0) {
			dis = true;
		}
		return (
			<div className="show-fake-browser sidebar-page">
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
				<Container>
				{/* <Drift appId="ag5c43cpxebr" /> */}
					<Sidebar style={{ display: 'flex', flexDirection: 'column' }} width={expand ? 260 : 56} collapsible>
						<Sidenav.Header>
							<div style={headerStyles}>
								<Icon icon="logo-analytics" size="lg" style={{ verticalAlign: 0 }} />
								<span style={{ marginLeft: 12 }}>ADMIN PANEL</span>
							</div>
						</Sidenav.Header>
						<Sidenav
							onSelect={this.selectMenuItem}
							expanded={expand}
							defaultOpenKeys={['3']}
							defaultActiveKey="2"
							appearance="inverse"
						>
							<Sidenav.Body>
								<Nav>
									<Nav.Item eventKey="Company Profile" active icon={<Icon icon="dashboard" />}>
										Company Profile
									</Nav.Item>
									<Nav.Item eventKey="Members Admin" icon={<Icon icon="group" />}>
										Members
									</Nav.Item>
									<Nav.Item eventKey="Update Payment" icon={<Icon icon="cc-stripe" />}>
										Update Payment Card
									</Nav.Item>
									<Nav.Item icon={<Icon icon="frame" />} eventKey="Theme">
										Theme
									</Nav.Item>
									<Nav.Item icon={<Icon icon="question2" />} eventKey="About Page">
										About
									</Nav.Item>
									<Nav.Item icon={<Icon icon="peoples-map" />} eventKey="Staff Admin">
										Staff
									</Nav.Item>
									<Nav.Item icon={<Icon icon="shield" />} eventKey="Roster Admin">
										Roster
									</Nav.Item>
									<Nav.Item icon={<Icon icon="people-group" />} eventKey="Content Team Admin">
										Content Team
									</Nav.Item>
									<Nav.Item icon={<Icon icon="order-form" />} eventKey="Blog Admin">
										Blog
									</Nav.Item>
									<Nav.Item icon={<Icon icon="file-movie-o" />} eventKey="Media">
										Media
									</Nav.Item>
									<Nav.Item icon={<Icon icon="trophy" />} eventKey="Recent Matches Admin">
										Recent Matches
									</Nav.Item>
									<Nav.Item icon={<Icon icon="logo-ads" />} eventKey="Sponsors Admin">
										Sponsors
									</Nav.Item>
									<Nav.Item
										disabled={dis}
										icon={<Icon icon="globe2" />}
										eventKey="Custom Domain Admin"
									>
										Add Custom Domain
									</Nav.Item>
									<Nav.Item
										icon={<Icon icon="globe" />}
										eventKey="nav_site"
									>
										Navigate To Site
									</Nav.Item>
								</Nav>
							</Sidenav.Body>
						</Sidenav>
						{!isMobile && <NavToggle expand={expand} onChange={this.handleToggle} />}
					</Sidebar>

					<Container
						style={{
							height: 'calc(100vh - 20px)',
							overflowY: 'auto',
							width: `calc(100vw - ${d_width}px`,
							padding: 20
						}}
					>
						<Header>
							<h2>{this.state.pageTitle}</h2>
						</Header>
						<Content key={`ck_key_${expand}`} style={{ paddingTop: 20 }}>
							{this.state.content}
						</Content>
					</Container>
				</Container>
			</div>
		);
	}
}

NavToggle.propTypes = {
	expand: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired
};

AdminPageController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	appManager: PropTypes.object.isRequired
};
export default inject('uiStore', 'appManager')(AdminPageController);

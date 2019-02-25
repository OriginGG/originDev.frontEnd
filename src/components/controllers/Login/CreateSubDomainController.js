import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import injectSheet, { ThemeProvider } from 'react-jss';
import { inject } from 'mobx-react';
import { toJS } from 'mobx';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { GlobalStyles } from 'Theme/Theme';
import { createOrganisationQuery, getOrganisationByName } from '../../../queries/organisation';
import CreateSubDomainComponentRender from '../../render_components/signup/CreateSubDomainComponentRender';
import { createUserQuery, updateUserQuery } from '../../../queries/users';
// import { updateUserQuery, getUserQuery } from '../../../queries/users';
import { createThemeQuery, getThemeByNameQuery } from '../../../queries/themes';
import { authenticateQuery } from '../../../queries/login';
import { createSponsorsQuery } from '../../../queries/sponsors';
import { createPageQuery } from '../../../queries/pages';
import { createEmailRegistrationQuery } from '../../../queries/registrations';

// import PaywallController from './PaywallController';
import historyStore from '../../../utils/stores/browserHistory';

class CreateSubDomainController extends Component {
	state = {
		visible: false,
		image_src: null,
		theme1_select_style: {},
		theme2_select_style: {},
		button_disabled: true
	};
	componentDidMount = async () => {
		if (!this.props.location.state) {
			historyStore.push('/signup_org');
			return;
		}
		const { payload } = this.props.location.state;
		const originTheme = await this.props.appManager.executeQuery('query', getThemeByNameQuery, {
			themeName: 'origin'
		});
		this.props.uiStore.setOriginTheme(originTheme.resultData.nodes[0]);
		// const p = JSON.parse(Buffer.from(authPayload, 'hex').toString('utf8'));
		// this.authPayload = p;
		// const token = p.authenticate.resultData.jwtToken;
		// const d = this.props.appManager.decodeJWT(token);
		// const { id } = d;
		// this.user_id = id;
		// const my_token = p.authenticate.resultData.jwtToken;
		// this.props.appManager.authToken = my_token;
		// const user = await this.props.appManager.executeQueryAuth('query', getUserQuery, { id });
		this.name = payload.firstName;
		this.payload = payload;
		// this.props.uiStore.setCurrentUser(user.resultData);
		this.logo_files = null;
		this.selected_theme = 1;
		const s = {
			border: '1px solid',
			borderColor: 'white'
		};
		this.current_theme = 'dark';
		const logo_url = 'https://res.cloudinary.com/origingg/image/upload/f_auto/v1548889867/sponsor-logo1.png';
		this.setState({ theme1_select_style: s, visible: true, image_src: logo_url });
		document.getElementById('origin_loader').style.display = 'none';
		// }
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
	handleDomainChange = (e) => {
		const v = e.target.value;
		this.domain_name = v;
		if (v) {
			this.setState({ button_disabled: false });
		} else {
			this.setState({ button_disabled: true });
		}
	};
	uploadFile = (e) => {
		const { files } = e.target;
		this.logo_files = files[0]; // eslint-disable-line
		const reader = new FileReader();
		reader.readAsDataURL(this.logo_files);

		reader.onloadend = () => {
			const x = reader.result;
			this.setState({ image_src: x });
		};
	};

	uploadLogo = () => {
		return new Promise((resolve) => {
			const formData = new FormData();
			formData.append('images', this.logo_files);
			axios
				.post(`${process.env.REACT_APP_API_SERVER}/upload/${this.domain_name}`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
				.then((x) => {
					resolve(x.data);
				});
		});
	};
	isValid = (str) => {
		if (/^[a-zA-Z0-9]*$/.test(str) === false) {
			return false;
		}
		return true;
	};
	handleSubmit = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (this.domain_name) {
			this.current_theme = 'dark';
			if (this.domain_name.indexOf(' ') > -1) {
				toast.error('Domain name cannot contain spaces!', {
					position: toast.POSITION.TOP_LEFT,
					autoClose: 5000
				});
			} else if (!this.isValid(this.domain_name.toLowerCase())) {
				toast.error('Domain name cannot special characters', {
					position: toast.POSITION.TOP_LEFT,
					autoClose: 5000
				});
			} else {
				// check domain name has n
				this.domain_name = this.domain_name.toLowerCase();

				// console.log(`domain name = ${this.domain_name}`);
				// const logo_data = await this.uploadLogo();
				const p = toJS(this.props.uiStore.origin_theme_structure);
				p.header.logo.imageData = this.state.image_src;
				const baseId = process.env.REACT_APP_DEFAULT_BASE_THEME;
				const t = {
					themeName: this.domain_name,
					themeStructure: JSON.stringify(p),
					themeData: JSON.stringify(toJS(this.props.uiStore.origin_theme_data))
				};

				// test if domain already exists.

				const exists = await this.props.appManager.executeQuery('query', getOrganisationByName, {
					subdomain: this.domain_name
				});
				if (exists.getorganisationbyname.edges.length > 0) {
					toast.error(`Domain: ${this.domain_name} is already in use, please choose another!`, {
						position: toast.POSITION.TOP_LEFT,
						autoClose: 5000
					});
				} else {
					const ax = await this.props.appManager.executeQuery('mutation', createUserQuery, {
						id: this.user_id,
						password: this.payload.password,
						firstName: this.payload.firstName,
						email: this.payload.email,
						lastName: this.payload.lastName,
						authenticated: false,
						adminUser: true
					});

					const host = window.location.origin;
					const url = `/emails/signup?host=${host}&email=${this.payload.email}&password=${this.payload.password}&name=${this.payload.firstName}&id=${ax.registerUser.user.id}&admin_user=true&dev=false`;
					await this.sendEmail(url);
					const payload_email = Buffer.from(url, 'utf8').toString('hex');
					await this.props.appManager.executeQuery('mutation', createEmailRegistrationQuery, {
						email: this.payload.email,
						payload: payload_email
					});

					// create a stripe customer as well.

					this.authPayload = await this.props.appManager.executeQuery(
						'mutation',
						authenticateQuery,
						this.payload
					);
					const token = this.authPayload.authenticate.resultData.jwtToken;
					this.props.appManager.authToken = token;
					this.user_id = ax.registerUser.user.id;
					console.log(ax);

					// then we authenticate, to get back an authoken

					const new_org = await this.props.appManager.executeQueryAuth('mutation', createOrganisationQuery, {
						themeBaseId: baseId,
						themeId: this.current_theme,
						name: this.domain_name,
						subDomain: this.domain_name
					});
					const org_id = new_org.resultData.organisationAccount.id;
					await this.props.appManager.executeQueryAuth('mutation', updateUserQuery, {
						id: this.user_id,
						subscribed: true,
						organisationId: org_id
					});
					t.organisationId = org_id;
					await this.props.appManager.executeQuery('mutation', createThemeQuery, t);
					await this.props.appManager.executeQueryAuth('mutation', createPageQuery, {
						pageTitle: '',
						pageContent: '',
						pageSubtitle: '',
						pageKey: 'about-us',
						organisationId: org_id
					});
					await this.props.appManager.executeQueryAuth('mutation', createSponsorsQuery, {
						organisationId: new_org.resultData.organisationAccount.id,
						imageUrl:
							'https://res.cloudinary.com/origingg/image/upload/f_auto/v1548889692/logoSameColor.png',
						hrefLink: 'https://origin.gg',
						name: 'Origin.GG',
						description:
							'Building an Esports team is difficult. Recruiting players, practicing, and getting your teams to events is a full-time job. Allow us to handle the rest. Origin.gg makes it easy for you to set up a pro style organization.'
					});
					await this.props.appManager.executeQueryAuth('mutation', createSponsorsQuery, {
						organisationId: new_org.resultData.organisationAccount.id,
						imageUrl:
							'https://res.cloudinary.com/origingg/image/upload/f_auto/v1548889692/logoSameColor.png',
						hrefLink: 'https://origin.gg',
						name: 'Origin.GG',
						description: ''
					});
					await this.props.appManager.executeQueryAuth('mutation', createSponsorsQuery, {
						organisationId: new_org.resultData.organisationAccount.id,
						imageUrl:
							'https://res.cloudinary.com/origingg/image/upload/f_auto/v1548889692/logoSameColor.png',
						hrefLink: 'https://origin.gg',
						name: 'Origin',
						description: ''
					});
					await this.props.appManager.executeQueryAuth('mutation', createSponsorsQuery, {
						organisationId: new_org.resultData.organisationAccount.id,
						imageUrl:
							'https://res.cloudinary.com/origingg/image/upload/f_auto/v1548889692/logoSameColor.png',
						hrefLink: 'https://origin.gg',
						name: 'Origin.GG',
						description: ''
					});
					await this.subcribeUser();
					const domainInfo = this.props.appManager.getDomainInfo();
					const new_payload = Object.assign(this.authPayload, {});
					new_payload.authenticate.resultData.organisationId = new_org.resultData.organisationAccount.id;
					const payload = Buffer.from(JSON.stringify(new_payload), 'utf8').toString('hex');
					const u_string = `${domainInfo.protocol}//${this
						.domain_name}.${domainInfo.hostname}:${domainInfo.port}?p=${payload}`;
					window.location = u_string;
				}
			}
			// create a domain and theme here.
		}
	};
	subcribeUser = async () => {
		const plans = await axios.get(
			`${process.env.REACT_APP_API_SERVER}/stripe/new2/retrieve_plans?product=${process.env
				.REACT_APP_STRIPE_PRODUCT_ID}`
		);
		const { data } = plans.data;

		const customer = await axios.post(
			`${process.env.REACT_APP_API_SERVER}/stripe/new2/create_customer`,
			{
				user_id: this.user_id,
				email: this.payload.email
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		await axios.post(
			`${process.env.REACT_APP_API_SERVER}/stripe/new2/create_subscription`,
			{
				customer_id: customer.data.cust.id,
				plan: data[0].id,
				trial_period_days: data[0].trial_period_days
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		// const plans = await axios.get(`${process.env.REACT_APP_API_SERVER}/stripe/new/retrieve_plans?product=${process.env.REACT_APP_STRIPE_PRODUCT_ID}`);
		// const { data } = plans.data;
		// // subscribe user to the yearly plan with a 14 day trial.
		// this.props.stripe
		//     .createToken()
		//     .then(async (payload) => {
		//         if (payload.error) {
		//             toast.error(payload.error.message, {
		//                 position: toast.POSITION.TOP_LEFT,
		//                 autoClose: 3000
		//             });
		//         } else {
		//             const response = await axios.post(
		//                 `${process.env.REACT_APP_API_SERVER}/stripe/create_subscription`,
		//                 {
		//                     token: payload.token.id,
		//                     customer_id: this.props.user_id,
		//                 },
	};
	handleThemeClick = (t) => {
		const s = {
			border: '1px solid',
			borderColor: 'white'
		};
		if (t === 1) {
			this.current_theme = 'dark';
			this.setState({ theme1_select_style: s, theme2_select_style: {} });
		} else {
			this.current_theme = 'light';
			this.setState({ theme2_select_style: s, theme1_select_style: {} });
		}
	};
	render() {
		if (this.state.visible === false) {
			return null;
		}
		const btn = (
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Button
					onClick={(e) => {
						this.handleSubmit(e);
					}}
					disabled={this.state.button_disabled}
					style={{ width: 300 }}
					primary
				>
					CREATE YOUR DOMAIN
				</Button>
			</div>
		);
		const input_style = { display: 'inherit' };
		const input_title = 'CREATE YOUR DOMAIN';
		// if (!this.state.button_available) {
		// 	btn = <span />;
		// 	input_style = { display: 'none' };
		// 	input_title = 'Enter your payment info to proceed with 14 day trial';
		// }
		return (
			<ThemeProvider theme={this.props.uiStore.origin_theme_data}>
				<CreateSubDomainComponentRender
					dark_theme_image_src="https://res.cloudinary.com/origingg/image/upload/f_auto/v1548889228/dark-theme.jpg"
					light_theme_image_src="https://res.cloudinary.com/origingg/image/upload/f_auto/v1548889272/light-theme.jpg"
					header_image_src="https://res.cloudinary.com/origingg/image/upload/f_auto/v1548890076/logo-top.png"
					handleDomainChange={this.handleDomainChange}
					submitButton={btn}
					// handleSubmit={this.handleSubmit}
					uploadFile={this.uploadFile}
					input_style={input_style}
					input_title={input_title}
					video1_url="https://www.youtube.com/embed/rijG8eHXSns"
					upload_img_src={this.state.image_src}
					namestring={`Welcome, ${this.name}`}
					theme1_select_style={this.state.theme1_select_style}
					theme2_select_style={this.state.theme2_select_style}
					handleThemeClick={this.handleThemeClick}
					// payWallContent={<PaywallController subscribed={this.handleSubscribed} user_id={this.user_id} />}
				/>
			</ThemeProvider>
		);
	}
}

CreateSubDomainController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	appManager: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired
};
export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(CreateSubDomainController));

import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Formik } from 'formik';
import { inject } from 'mobx-react';
import { Button } from 'semantic-ui-react/dist/commonjs';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Modal } from 'antd';
import axios from 'axios';
import { GlobalStyles } from 'Theme/Theme';
import SignupComponentRender from '../../render_components/signup/SignupComponentRender';
import { getUserByEmailQuery } from '../../../queries/users';
import historyStore from '../../../utils/stores/browserHistory';

const { confirm } = Modal;

// import { getOrganisationQuery } from './queries/organisation'
class SignupControllerOrg extends Component {
	state = { button_disabled: false };
	componentDidMount = () => {
		document.getElementById('origin_loader').style.display = 'none';
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
				title: 'User already pre-registered!',
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
	render() {
		const s_username_style = { display: 'none' };
		return (
			<Formik
				ref={(c) => {
					this.formikForm = c;
				}}
				initialValues={{
					email: '',
					password: '',
					confirm_password: '',
					firstName: '',
					lastName: '',
					userName: ''
				}}
				validate={(values) => {
					let disabled = false;
					// same as above, but feel free to move this into a class method now.
					const errors = {};
					if (values.password && values.confirm_password) {
						if (values.password !== values.confirm_password) {
							errors.confirm_password = 'Passwords do not match!';
						}
					}
					if (!values.password) {
						errors.password = 'Required';
					}
					if (!values.firstName) {
						errors.firstName = 'Required';
					}
					if (!values.email) {
						errors.email = 'Required';
					} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
						errors.email = 'Invalid email address';
					}
					if (errors.password || errors.email || errors.confirm_password) {
						disabled = true;
					}
					if (!values.password || !values.email) {
						disabled = true;
					}
					this.setState({ button_disabled: disabled });
					return errors;
				}}
				onSubmit={async (v) => {
					const payload = {
						firstName: v.firstName,
						lastName: v.lastName,
						password: v.password,
						email: v.email,
						adminUser: true,
						authenticated: false,
						userName: v.userName
					};
					// const a = 'admin_user=true';
					const registered_user = await this.props.appManager.executeQuery('query', getUserByEmailQuery, {
						email: v.email
					});
					if (registered_user.allUsers.edges.length > 0) {
						toast.success(`Account ${v.email} already registered. Please sign in as normal`, {
							position: toast.POSITION.TOP_LEFT,
							autoClose: 15000
						});
                    } else {
                        historyStore.push({ pathname: '/createsubdomain', state: { payload } });
                        // forward to create domain, but with no user created as yet!
                    }

					// 	if (ll > 0) {
					// 		if (ll === 1) {
					// 			toast.success(`Account ${v.email} already registered. Please sign in as normal`, {
					// 				position: toast.POSITION.TOP_LEFT,
					// 				autoClose: 15000
					// 			});
					// 		} else {
					// 			const f = await this.showSendConfirm();
					// 			if (f) {
					// 				const r = await this.props.appManager.executeQuery('query', getEmailRegistrationQuery, {
					// 					email: v.email
					// 				});
					// 				const email_payload = r.registrationEmailByEmail.payload;
					// 				const url = Buffer.from(email_payload, 'hex').toString('utf8');
					// 				await this.sendEmail(url);
					// 				toast.success(
					// 					`Registration email re-sent to ${v.email}, please check your email for further instructions.`,
					// 					{
					// 						position: toast.POSITION.TOP_LEFT,
					// 						autoClose: 15000
					// 					}
					// 				);
					// 			}
					// 		}
					// 	} else {
					// 		try {
					// 			const pre_user = await this.props.appManager.executeQuery(
					// 				'mutation',
					// 				createUserQuery,
					// 				payload
					// 			);
					// 			const u_id = pre_user.registerUser.user.id;
					// 			const host = window.location.origin;
					// 			const url = `/emails/signup?host=${host}&email=${v.email}&password=${v.password}&name=${v.firstName}&${a}&id=${u_id}&dev=false`;
					// 			await this.sendEmail(url);
					// 			const payload_email = Buffer.from(url, 'utf8').toString('hex');
					// 			await this.props.appManager.executeQuery('mutation', createEmailRegistrationQuery, {
					// 				email: v.email,
					// 				payload: payload_email
					// 			});
					// 			toast.success(
					// 				`Account ${v.email} registered, please check your email for further instructions.`,
					// 				{
					// 					position: toast.POSITION.TOP_LEFT,
					// 					autoClose: 15000
					// 				}
					// 			);
					// 		} catch (err) {
					// 			console.log(err);
					// 		}
					// 		// const authPayload = await this.props.appManager.executeQuery('mutation', authenticateQuery, v);
					// 	}
				}}
				render={({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit
					// isSubmitting,
				}) => (
					<div>
						<SignupComponentRender
							createAccountButton={
								<Button
									disabled={this.state.button_disabled}
									className="ui fluid large"
									style={{
										color: 'white',
										background: 'rgb(10, 154, 180)',
										fontSize: 18,
										marginTop: 40
									}}
								>
									Create an Account
								</Button>
							}
							user_style={s_username_style}
							errors={errors}
							touched={touched}
							values={values}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
							handleBlur={handleBlur}
							handleClick={this.handleClick}
						/>
					</div>
				)}
			/>
		);
	}
}

SignupControllerOrg.propTypes = {
	appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(SignupControllerOrg));

import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Dimmer, Header, Segment, Button } from 'semantic-ui-react';
import {
	CardNumberElement,
	CardExpiryElement,
	CardCVCElement,
	PostalCodeElement,
	Elements,
	injectStripe,
	StripeProvider
} from 'react-stripe-elements';
import Spinner from 'react-svg-spinner';
import stripeImage from '../../../assets/images/stripeSecure.png';
import appManager from '../../../utils/appManager';
import uiStore from '../../../utils/stores/uiStore';
import { updateUserQuery, getUserQuery } from '../../../queries/users';
import freeTrialImage from '../../../assets/images/free-trial.png';
import PaywallComponentRender from '../../render_components/signup/PaywallComponentRender';
import browserHistory from '../../../utils/stores/browserHistory';

const PricePlanBlock = ({ plan, handleClick, apply_discount }) => {
	// eslint-disable-line
	const meta_array = [];
	for (const key in plan.metadata) {
		if (key.indexOf('feature_') > -1) {
			// eslint-disable-line
			meta_array.push(
				<div
					style={{ color: 'black', fontSize: '12px', backgroundColor: 'wheat' }}
					className="ui center aligned segment"
				>
					<p> - {plan.metadata[key]} </p>
				</div>
			);
		}
	}
	let dollar_discount = 0;
	if (apply_discount) {
		dollar_discount = apply_discount / 100;
	}
	let dollars = plan.amount / 100;
	dollars -= dollar_discount;
	const d_amount = `Discount applied of ${dollar_discount.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD'
	})}`;
	const discount =
		apply_discount === 0 ? <span /> : <div style={{ fontSize: '12px', lineHeight: '14px' }}>{d_amount}</div>;
	dollars.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	return (
		<div className="six wide column">
			<div className="ui raised segments">
				<div className="ui center aligned secondary segment">
					<img src={freeTrialImage} alt="free trial" style={{ width: 112 }} />
				</div>
				<div className="ui center aligned secondary segment">
					<div className="ui statistic">
						<div className="value">
							<span
								style={{
									fontSize: '40px'
								}}
							>
								${dollars}
								{discount}
							</span>
						</div>
						<div className="label">per {plan.interval}</div>
					</div>
				</div>
				{meta_array}
			</div>
			{handleClick && (
				<div role="menuItem" tabIndex={0} className="ui green fluid button" onClick={() => handleClick(plan)}>
					Select
				</div>
			)}
		</div>
	);
};

const createOptions = (fontSize: string, padding: ?string) => {
	return {
		style: {
			base: {
				fontSize,
				color: '#424770',
				letterSpacing: '0.025em',
				fontFamily: 'Source Code Pro, monospace',
				'::placeholder': {
					color: '#aab7c4'
				},
				...(padding ? { padding } : {})
			},
			invalid: {
				color: '#9e2146'
			}
		}
	};
};

const handleBlur = () => {
	console.log('[blur]');
};
const handleChange = (change) => {
	console.log('[change]', change);
};
const handleFocus = () => {
	console.log('[focus]');
};
const handleReady = () => {
	console.log('[ready]');
};

class _CreditController extends Component {
	state = { coupon_id: '' };
	handleCoupon = (e) => {
		this.setState({ coupon_id: e.target.value });
	};
	render() {
		return (
			<div>
				<form
					onSubmit={(ev) => {
						this.props.handleSubmit(ev, this.props.stripe, this.state.coupon_id);
					}}
				>
					<div style={{ height: 40, marginBottom: 16 }}>
						<img style={{ height: 'inherit' }} alt="Powered By Stripe" src={stripeImage} />
					</div>
					<label>
						Card number
						<CardNumberElement
							onBlur={handleBlur}
							onChange={handleChange}
							onFocus={handleFocus}
							onReady={handleReady}
							{...createOptions(this.props.fontSize)}
						/>
					</label>
					<label>
						Expiration date
						<CardExpiryElement
							onBlur={handleBlur}
							onChange={handleChange}
							onFocus={handleFocus}
							onReady={handleReady}
							{...createOptions(this.props.fontSize)}
						/>
					</label>
					<label>
						CVC
						<CardCVCElement
							onBlur={handleBlur}
							onChange={handleChange}
							onFocus={handleFocus}
							onReady={handleReady}
							{...createOptions(this.props.fontSize)}
						/>
					</label>
					<label>
						Postal code
						<PostalCodeElement
							onBlur={handleBlur}
							onChange={handleChange}
							onFocus={handleFocus}
							onReady={handleReady}
							{...createOptions(this.props.fontSize)}
						/>
					</label>
					<label>
						Promo Code
						<input value={this.state.coupon_id} onChange={this.handleCoupon} />
					</label>
					<div style={{ paddingTop: 24 }}>
						<Button size="mini" primary>
							{this.props.buttonText}
						</Button>
						<Button onClick={this.props.handleBack} size="mini" style={{ float: 'right' }}>
							BACK
						</Button>
					</div>
				</form>
			</div>
		);
	}
}

const CreditController = injectStripe(_CreditController);

class PlanController extends Component {
	state = { visible: false, selected_plan: '', plan_array: [] }; // eslint-disable-line
	componentDidMount = async () => {
		const plan_array = [];
		this.props.plans.forEach((plan) => {
			plan_array.push(<PricePlanBlock plan={plan} handleClick={this.props.handleClick} />);
		});
		this.setState({ visible: true, plan_array }); // eslint-disable-line
	};
	render() {
		if (!this.state.visible) {
			return null;
		}
		return this.state.plan_array;
	}
}

class PaywallContent extends Component {
	state = {
		visible: false,
		dimmer: false,
		display_credit_form: false,
		display_plan: true,
		customer: null // eslint-disable-line
	};
	componentDidMount = async () => {
		this.update_payment = false;
		const pl = await appManager.executeQueryAuth('query', getUserQuery, { id: uiStore.user_id });
		this.current_user_details = pl.resultData;
		if (this.props.location.state) {
			const { state } = this.props.location;
			if (state.update_card) {
				this.update_payment = true;
			}
		}
		document.getElementById('origin_loader').style.display = 'none';
		if (!this.update_payment) {
			const plans = await axios.get(
				`${process.env.REACT_APP_API_SERVER}/stripe/new/retrieve_plans?product=${process.env
					.REACT_APP_STRIPE_PRODUCT_ID}`
			);
			this.pay_plans = plans.data.data;
		}
		const { user_id } = uiStore;
		if (!user_id) {
			browserHistory.push('/login_org');
			return;
		}
		const user = await appManager.executeQueryAuth('query', getUserQuery, { id: user_id });
		const { email } = user.resultData;
		const customer = await axios.get(
			`${process.env.REACT_APP_API_SERVER}/stripe/new2/retrieve_customer?email=${email}`
		);
		this.setState({
			display_credit_form: this.update_payment,
			display_plan: !this.update_payment,
			visible: true,
			customer: customer.data.customer
		}); // eslint-disable-line
	};
	setDimmer = (f) => {
		this.setState({ dimmer: f });
	};
	handlePlanClick = (plan) => {
		this.selected_plan = plan;
		this.setState({ display_plan: false, display_credit_form: true });
	};
	handleBack = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.setState({ display_plan: true, display_credit_form: false });
	};
	handleCCSubmit = (ev, stripe, coupon_id) => {
		let new_coupon_id = null;
		if (this.selected_plan.metadata.coupon_id === coupon_id) {
			new_coupon_id = coupon_id;
		}
		ev.preventDefault();
		this.setDimmer(true);
		if (stripe) {
			stripe.createToken().then(async (payload) => {
				if (payload.error) {
					this.setDimmer(false);
					toast.error(payload.error.message, {
						position: toast.POSITION.TOP_LEFT,
						autoClose: 3000
					});
					this.props.callback(false);
				} else {
					let { customer } = this.state;
					if (!customer) {
						const new_customer = await axios.post(
							`${process.env.REACT_APP_API_SERVER}/stripe/new2/create_customer`,
							{
								user_id: uiStore.user_id,
								email: this.current_user_details.email
							},
							{
								headers: {
									'Content-Type': 'application/json'
								}
							}
						);
						this.setState({ customer: new_customer.data.cust });
						customer = new_customer.data.cust;
					}
					const response = await axios.post(
						`${process.env.REACT_APP_API_SERVER}/stripe/new2/update_customer`,
						{
							customer: customer.id,
							options: {
								token: payload.token.id
							}
						},
						{
							headers: {
								'Content-Type': 'application/json'
							}
						}
					);
					if (response.data.status === 'error') {
						this.setDimmer(false);
						let message = 'An error has occured processing your card';
						switch (response.data.code) {
							case 'card_declined': {
								message = 'Your card has been declined, please try another card.';
								break;
							}
							case 'insufficient_funds': {
								message = 'You have insufficent funds available with this card.';
								break;
							}
							default: {
								console.log(`STRIPE ERROR CODE - ${response.data.code}`);
								break;
							}
						}
						toast.error(message, {
							position: toast.POSITION.TOP_LEFT,
							autoClose: 3000
						});
						this.props.callback(false);
					} else {
						if (response.data.status === 'success') {
							if (!this.update_payment) {
								// now we delete previous subscription, and create a new one, with trial days left.
								// there won't be a customer yet.
								// const { subscriptions } = response.data.cust;
								// const { id } = subscriptions.data[0];
								// await axios.post(
								// 	`${process.env.REACT_APP_API_SERVER}/stripe/new2/delete_subscription`,
								// 	{
								// 		id
								// 	},
								// 	{
								// 		headers: {
								// 			'Content-Type': 'application/json'
								// 		}
								// 	}
								// );
								this.subscription_days_left = uiStore.getSubScriptionDaysLeft();
								// const { trial_end } = subscriptions.data[0];
								// if (trial_end) {
								// 	const cur = dayjs(new Date()); // .toLocaleString('en-US', { timeZone: 'America/New_York' }));
								// 	// const day_diff = moment(Math.round(trial_end * 1000)).diff(cur, 'days');
								// 	const day_diff = dayjs(trial_end * 1000).diff(cur, 'days');
								// 	// const cur = moment().tz('America/New_York');
								// 	// const day_diff = moment(Math.round(trial_end * 1000)).diff(cur, 'days');
								// 	this.subscription_days_left = day_diff + 1;
								// 	if (this.subscription_days_left > subscriptions.data[0].plan.trial_period_days) {
								// 		this.subscription_days_left = subscriptions.data[0].plan.trial_period_days;
								// 	}
								// }
								let discount = 0;
								if (new_coupon_id) {
									const cpon = await axios.get(
										`${process.env
											.REACT_APP_API_SERVER}/stripe/new2/retrieve_coupon?coupon_id=${new_coupon_id}`
									);
									discount = cpon.data.amount_off;
								}
								await axios.post(
									`${process.env.REACT_APP_API_SERVER}/stripe/new2/create_subscription`,
									{
										customer_id: customer.id,
										plan: this.selected_plan.id,
										trial_period_days: this.subscription_days_left,
										coupon_id: new_coupon_id
									},
									{
										headers: {
											'Content-Type': 'application/json'
										}
									}
								);

								this.setDimmer(false);
								await appManager.executeQueryAuth('mutation', updateUserQuery, {
									id: uiStore.user_id,
									subscribed: true
								});
								if (new_coupon_id) {
									toast.success(
										'Thanks - You have been successfully subscribed, with the discount!',
										{
											position: toast.POSITION.TOP_LEFT,
											autoClose: 3000
										}
									);
								} else {
									toast.success('Thanks - You have been successfully subscribed!', {
										position: toast.POSITION.TOP_LEFT,
										autoClose: 3000
									});
								}
								let slack_payload = {
									text: `*REAL-PAID-ALERT-PRODUCTION*\n*Owner name:* ${this.current_user_details
										.firstName} ${this.current_user_details.lastName}\n*Plan:* ${this.selected_plan
										.id}\n*Owner Email:* ${this.current_user_details.email}\n`
								};
								if (process.env.REACT_APP_ENVIRONMENT !== 'production') {
									slack_payload = {
										text: `*TEST-NOT-PAID-NO-CASH-BOO-NOT-PRODUCTION*\n*Owner name:* ${this
											.current_user_details.firstName} ${this.current_user_details
											.lastName}\n*Plan:* ${this.selected_plan.id}\n*Owner Email:* ${this
											.current_user_details.email}\n`
									};
								}
								axios.post(
									process.env.REACT_APP_SLACK_NEW_PRODUCT_WEBHOOK,
									JSON.stringify(slack_payload),
									{
										withCredentials: false,
										transformRequest: [
											(data, headers) => {
												delete headers.post['Content-Type']; // eslint-disable-line
												return data;
											}
										]
									}
								);
								this.props.callback(true, this.selected_plan, discount);
							} else {
								toast.success(
									'Thanks - You have been successfully updated your card details, redirecting you back to login page!',
									{
										position: toast.POSITION.TOP_LEFT,
										autoClose: 3000
									}
								);
								setTimeout(() => {
									browserHistory.push('/login_org');
								}, 3000);
							}
						}
					}
				}
			});
		} else {
			this.props.callback(false);
			console.log("Stripe.js hasn't loaded yet.");
		}
	};
	render() {
		if (!this.state.visible) {
			return null;
		}
		let bt = 'PURCHASE';
		if (this.update_payment) {
			bt = 'UPDATE CARD';
		}
		const pwallContent = (
			<div>
				{this.state.display_plan && (
					<div style={{ backgroundColor: '#343c44', paddingBottom: 16, marginBottom: 16 }}>
						<div className="ui stackable grid centered">
							<PlanController plans={this.pay_plans} handleClick={this.handlePlanClick} />
						</div>
					</div>
				)}
				{this.state.display_credit_form && (
					<Dimmer.Dimmable as={Segment} dimmed={this.state.dimmer}>
						<Elements>
							<CreditController
								plans={this.selected_plan}
								handleBack={this.handleBack}
								handleSubmit={this.handleCCSubmit}
								buttonText={bt}
							/>
						</Elements>
						<Dimmer active={this.state.dimmer} onClickOutside={this.handleHide}>
							<Header as="h2" icon inverted>
								<div style={{ marginTop: 228 }}>
									<Spinner color="yellow" size="64px" />
								</div>
								Processing....
							</Header>
						</Dimmer>
					</Dimmer.Dimmable>
				)}
			</div>
		);
		let t = 'CHOOSE YOUR PLAN BELOW.';
		if (this.update_payment) {
			t = 'CHANGE YOUR CARD DETAILS BELOW.';
		}
		return <PaywallComponentRender namestring="SUBSCRIPTION" payWallContent={pwallContent} input_title={t} />;
	}
}

class PaywallController extends Component {
	state = { subscribed: false, plan: null };
	handleCallback = (f, plan, discount) => {
		if (f) {
			this.setState({ subscribed: true, plan, discount });
		}
	};
	render() {
		if (!this.state.subscribed) {
			return (
				<StripeProvider apiKey={process.env.REACT_APP_STRIPE_PK_KEY}>
					<PaywallContent location={this.props.location} callback={this.handleCallback} />
				</StripeProvider>
			);
		}

		return (
			<div
				style={{
					paddingTop: 32,
					backgroundColor: '#343c44',
					height: '100vh',
					width: '100vw'
				}}
			>
				<div style={{ display: 'block', color: 'wheat', paddingTop: 8 }} className="ui stackable grid centered">
					<div>
						<h2>SUCCESSFULL</h2>
					</div>
					<div>
						<h4>You have subscribed to the following plan:</h4>
					</div>
					<PricePlanBlock plan={this.state.plan} apply_discount={this.state.discount} />
					<h4>Click Button to go to your admin portal.</h4>
					<Button
						onClick={() => {
							browserHistory.push('/admin');
						}}
						primary
					>
						CONTINUE
					</Button>
				</div>
			</div>
		);
	}
}
PaywallController.propTypes = {
	location: PropTypes.object.isRequired
};

PaywallContent.propTypes = {
	callback: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired
};
PlanController.propTypes = {
	plans: PropTypes.array.isRequired,
	handleClick: PropTypes.func.isRequired
};

_CreditController.propTypes = {
	stripe: PropTypes.object.isRequired,
	plan: PropTypes.object.isRequired,
	fontSize: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleBack: PropTypes.func.isRequired,
	buttonText: PropTypes.string.isRequired
};
PricePlanBlock.propTypes = {
	plan: PropTypes.object.isRequired,
	handleClick: PropTypes.func,
	apply_discount: PropTypes.number
};

PricePlanBlock.defaultProps = {
	handleClick: null,
	apply_discount: 0
};

export default PaywallController;

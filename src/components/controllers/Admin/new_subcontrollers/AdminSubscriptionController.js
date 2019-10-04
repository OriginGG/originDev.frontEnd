/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Dimmer, Header, Segment } from 'semantic-ui-react';
import Spinner from 'react-svg-spinner';
import { Button, Grid, Panel, Col, 	Table } from 'rsuite';
import { inject } from 'mobx-react';


import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PostalCodeElement,
    Elements,
    injectStripe,
    StripeProvider
} from 'react-stripe-elements';

// import { Segment } from 'semantic-ui-react/dist/commonjs';
import stripeImage from '../../../../assets/images/powered_by_stripe@3x.png';
import appManager from '../../../../utils/appManager';
import { updateUserQuery, getUserQuery } from '../../../../queries/users';
// import ReactCheckout from './AdminReactTakeController';

// import { getSponsorsQuery, createSponsorsQuery } from '../../../../queries/sponsors';

const { Cell, Column, HeaderCell } = Table;

const createOptions = (fontSize: string, padding: ?string) => {
    return {
        style: {
            base: {
                fontSize,
                color: '#424770',
                letterSpacing: '0.025em',
                fontFamily: 'Source Code Pro, monospace',
                '::placeholder': {
                    color: '#aab7c4',
                },
                ...(padding ? { padding } : {}),
            },
            invalid: {
                color: '#9e2146',
            },
        },
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

// {
// 	"id": "plan_DdGk8Fo0gmJXeB",
// 	"object": "plan",
// 	"active": true,
// 	"aggregate_usage": null,
// 	"amount": 3900,
// 	"billing_scheme": "per_unit",
// 	"created": 1537342490,
// 	"currency": "usd",
// 	"interval": "month",
// 	"interval_count": 1,
// 	"livemode": false,
// 	"metadata": {},
// 	"nickname": "Monthly Subscription",
// 	"product": "prod_DdGjhkIK64yY3T",
// 	"tiers": null,
// 	"tiers_mode": null,
// 	"transform_usage": null,
// 	"trial_period_days": 7,
// 	"usage_type": "licensed"
// }
const PlanElement = ({ plan, handleClick, changingPlan }) => {
    const dollars = plan.amount / 100;
    const f_array = [];
    for (const k in plan.metadata) {                    // eslint-disable-line
        f_array.push(<li className="feature"><span>{plan.metadata[k]}</span></li>);
    }
    const w = dollars.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return (

        <Col lg={8} xs={24} >
	{/* <ReactCheckout/> */}
        <Panel header={<h3>{plan.nickname} Plan</h3>} bordered>
        <div className="pricing-table clearfix">


        <div style={{ marginTop: 2 }}>   {f_array} </div>

        <div style={{ marginTop: 16 }}>{w}/{plan.interval}</div>
            { handleClick ? <Button onClick={e => {
                e.preventDefault();
                handleClick(plan);
            }
        }>{!changingPlan ? 'Choose Plan' : 'Change Plan' }</Button> : '' }


        </div>
        </Panel>
         </Col>
    );
};

class _SplitForm extends React.Component {
    state = {
        subscribed: false, show_plan: true, actual_plan: null, visible: true, data: [], plans: [], changingPlan: false, customer: null
    };
    componentDidMount = async () => {
        const plans = await axios.get(
            `${process.env.REACT_APP_API_SERVER}/stripe/new/retrieve_plans?product=${process.env
                .REACT_APP_STRIPE_PRODUCT_ID}`
        );

        const user = await appManager.executeQueryAuth('query', getUserQuery, { id: this.props.uiStore.user_id });
		const { email } = user.resultData;
        const customer = await axios.get(
			`${process.env.REACT_APP_API_SERVER}/stripe/new2/retrieve_customer?email=${email}`
        );
        this.setState({
            plans: plans.data.data,
            customer: customer.data.customer,
            current_user_details: user.resultData,
            subscribed: this.props.uiStore.subscribed,
            actual_plan: customer.data.customer.subscriptions.data[0].plan,
        });
    }

    handleBuyClick = async (plan) => {
        if (!this.state.customer) {
            this.setState({ show_plan: false, actual_plan: plan });
        } else {
            this.setState({ actual_plan: plan });
            await this.createOrUpdateSubscription();
        }
    }

    changePlan = () => this.setState({ show_plan: true, changingPlan: true })

    handleSubmit = update => ev => {
        ev.preventDefault();
        if (this.props.stripe) {
            this.props.stripe
                .createToken()
                .then(async (payload) => {
                    if (payload.error) {
                        this.props.setDimmer(false);
                        toast.error(payload.error.message, {
                            position: toast.POSITION.TOP_LEFT,
                            autoClose: 3000
                        });
                    } else {
                        if (!this.state.customer) {
                            const new_customer = await axios.post(
                                `${process.env.REACT_APP_API_SERVER}/stripe/new2/create_customer`,
                                {
                                    user_id: this.props.uiStore.user_id,
                                    email: this.state.current_user_details.email
                                },
                                {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                            );
                            this.setState({ customer: new_customer.data.cust });
                        }
                        if (update || !this.state.subscribed) {
                            this.props.setDimmer(true);
                            const response = await axios.post(
                                `${process.env.REACT_APP_API_SERVER}/stripe/new2/update_customer`,
                                {
                                    customer: this.state.customer.id,
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
                                this.props.setDimmer(false);
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
                                        console.log(response);
                                        console.log(`STRIPE ERROR CODE - ${response.data.code}`);
                                        break;
                                    }
                                }
                                toast.error(message, {
                                    position: toast.POSITION.TOP_LEFT,
                                    autoClose: 3000
                                });
                            }
                            if (this.state.subscribed && response.data.status === 'success') {
                                this.props.setDimmer(false);
                                toast.success('Thanks - You have been successfully updated your card details!', {
                                    position: toast.POSITION.TOP_LEFT,
                                    autoClose: 3000
                                });
                            }
                        }
                        await this.createOrUpdateSubscription();
                    }
                });
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    };
    createOrUpdateSubscription = async () => {
        if (!this.state.subscribed) {
            this.props.setDimmer(true);
            const subscription_days_left = this.props.uiStore.getSubScriptionDaysLeft();
            await axios.post(
                `${process.env.REACT_APP_API_SERVER}/stripe/new2/create_subscription`,
                {
                    customer_id: this.state.customer.id,
                    plan: this.state.actual_plan.id,
                    trial_period_days: subscription_days_left,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            this.props.setDimmer(false);
            await appManager.executeQueryAuth('mutation', updateUserQuery, { id: this.props.uiStore.user_id, subscribed: true });
            toast.success('Thanks - You have been successfully subscribed!', {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 3000
            });
            this.setState({ subscribed: true, show_plan: false });
            let slack_payload = {
                text: `*REAL-PAID-ALERT-PRODUCTION*\n*Owner name:* ${this.state.current_user_details
                    .firstName} ${this.state.current_user_details.lastName}\n*Plan:* ${this.state.actual_plan
                    .id}\n*Owner Email:* ${this.state.current_user_details.email}\n`
            };
            if (process.env.REACT_APP_ENVIRONMENT !== 'production') {
                slack_payload = {
                    text: `*TEST-NOT-PAID-NO-CASH-BOO-NOT-PRODUCTION*\n*Owner name:* ${this
                        .state.current_user_details.firstName} ${this.state.current_user_details
                        .lastName}\n*Plan:* ${this.state.actual_plan.id}\n*Owner Email:* ${this
                        .state.current_user_details.email}\n`
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
            const customer = await axios.get(
                `${process.env.REACT_APP_API_SERVER}/stripe/new2/retrieve_customer?email=${this.state.current_user_details.email}`
            );
            this.setState({ customer: customer.data.customer });
        }
        if (this.state.changingPlan) {
            this.props.setDimmer(true);
            const delete_res = await axios.post(
                `${process.env.REACT_APP_API_SERVER}/stripe/new2/delete_subscription`,
                 {
                     id: this.state.customer.subscriptions.data[0].id
                 },
                 {
                     headers: {
                         'Content-Type': 'application/json'
                     }
                 }
            );
            console.log(delete_res);

            const subscription_days_left = this.props.uiStore.getSubScriptionDaysLeft();
            const create_res = await axios.post(
                `${process.env.REACT_APP_API_SERVER}/stripe/new2/create_subscription`,
                 {
                     customer_id: this.state.customer.id,
                     plan: this.state.actual_plan.id,
                     trial_period_days: subscription_days_left,
                 },
                 {
                     headers: {
                         'Content-Type': 'application/json'
                     }
                 }
            );
            console.log(create_res);
            this.props.setDimmer(false);
            toast.success('Thanks - You have been successfully changed your subscription!', {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 3000
            });
            const customer = await axios.get(
                `${process.env.REACT_APP_API_SERVER}/stripe/new2/retrieve_customer?email=${this.state.current_user_details.email}`
            );
            this.setState({ changingPlan: false, show_plan: false, customer: customer.data.customer });
        }
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        let disp = <div>
            <Row>
                <Col>
                    <h2>You are already subscribed to the following plan.</h2>
                    {console.log('actual plans', this.state.actual_plan)}

                    <PlanElement plan={this.state.actual_plan} handleClick={this.changePlan} changingPlan={true} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Update Payment Info</h2>
                        <CheckoutForm handleSubmit={this.handleSubmit(true)} fontSize={this.props.fontSize} updatePayment={true} />
                </Col>
            </Row>
        </div>;


        if (!this.state.subscribed || this.state.changingPlan) {
            if (this.state.show_plan === false) {
                disp =
                    <Row>
                        <Col >
                                <CheckoutForm handleSubmit={this.handleSubmit(false)} fontSize={this.props.fontSize} updatePayment={false} />
                            </Col>
                    </Row>;
            } else {
                disp = <div>
                    {this.state.plans.filter(d => this.state.actual_plan === null || this.state.actual_plan.id !== d.id).map(d =>  <PlanElement plan={d} handleClick={this.handleBuyClick} changingPlan={false} />)}
                </div>;
            }
        }

        return (
            <div>
                {disp}
                {!this.state.subscribed && !this.state.show_plan ? <button onClick={() => this.setState({ show_plan: true })}>Back</button> : ''}
                {this.state.changingPlan ? <button onClick={() => this.setState({ changingPlan: false })}>Back</button> : ''}
            </div>
        );
    }
}


class AdminSubscriptionController extends Component {
    state = { dimmer: false }
    componentDidMount = () => {

    }
    setDimmer = f => {
        this.setState({ dimmer: f });
    }
    render() {
        return (
            <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PK_KEY}>
                <div style={{ width: 'calc(100vw - 400px)' }} >
                    <Elements>
                        <SplitForm setDimmer={this.setDimmer} uiStore={this.props.uiStore} fontSize="14px" />
                    </Elements>
                        <Dimmer active={this.state.dimmer}>
                            <Header as="h2" icon inverted>
                                <div style={{ marginTop: 228 }}>
                                    <Spinner color="yellow" size="64px" />
                                </div>
                                Processing....
                            </Header>
                        </Dimmer>

                </div>
            </StripeProvider>

        );
    }
}

const CheckoutForm = ({ handleSubmit, fontSize, updatePayment }) =>
    <form onSubmit={handleSubmit}>
        <div style={{ height: 40, marginBottom: 16 }}><img style={{ height: 'inherit' }} alt="Powered By Stripe" src={stripeImage} /></div>
        <label>
            Card number
<CardNumberElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                {...createOptions(fontSize)}
            />
        </label>
        <label>
            Expiration date
<CardExpiryElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                {...createOptions(fontSize)}
            />
        </label>
        <label>
            CVC
<CardCVCElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                {...createOptions(fontSize)}
            />
        </label>
        <label>
            Postal code
<PostalCodeElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                {...createOptions(fontSize)}
            />
        </label>
        <button>{updatePayment ? 'Update' : 'Pay'}</button>
    </form>;


const SplitForm = injectStripe(_SplitForm);

CheckoutForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    fontSize: PropTypes.string.isRequired,
    updatePayment: PropTypes.bool.isRequired
};

PlanElement.propTypes = {
    plan: PropTypes.object.isRequired,
    handleClick: PropTypes.func,
    changingPlan: PropTypes.bool.isRequired
};

PlanElement.defaultProps = {
    handleClick: null,
};

_SplitForm.propTypes = {
    fontSize: PropTypes.string.isRequired,
    uiStore: PropTypes.object.isRequired,
    setDimmer: PropTypes.func.isRequired,
    stripe: PropTypes.object.isRequired
};

AdminSubscriptionController.propTypes = {
    uiStore: PropTypes.object.isRequired,
};


export default inject('uiStore', 'appManager')(AdminSubscriptionController);

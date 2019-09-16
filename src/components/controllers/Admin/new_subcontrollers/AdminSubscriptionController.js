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
import { updateUserQuery } from '../../../../queries/users';
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
const PlanElement = ({ plan, handleClick }) => {
    console.log(plan);
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
            <Button onClick={e => {
                e.preventDefault();
                handleClick(plan);
            }
        }>Choose Plan</Button>


        </div>
        </Panel>
         </Col>
    );
};

class SplitForm extends React.Component {
    state = {
        subscribed: false, show_plan: true, actual_plan: null, visible: false, data: []
    };
    componentDidMount = async () => {
        const plans = await axios.get(`${process.env.REACT_APP_API_SERVER}/stripe/retrieve_plans`);
        this.p_array = [];
        if (plans.data) {
            const { data } = plans.data;
            data.forEach(d => {
                this.p_array.push(<PlanElement plan={d} handleClick={this.handleBuyClick} />);
            });
            console.log(data);
        }
        this.setState({
            subscribed: this.props.subscribed, show_plan: true, visible: true
        });
    }
    handleBuyClick = (plan) => {
        this.setState({ show_plan: false, actual_plan: plan });
    }
    handleSubmit = stripe => ev => {
        ev.preventDefault();
        if (stripe) {
            this.props.setDimmer(true);
            stripe
                .createToken()
                .then(async (payload) => {
                    if (payload.error) {
                        this.props.setDimmer(false);
                        toast.error(payload.error.message, {
                            position: toast.POSITION.TOP_LEFT,
                            autoClose: 3000
                        });
                    } else {
                        const response = await axios.post(
                            `${process.env.REACT_APP_API_SERVER}/stripe/create_subscription`,
                            {
                                token: payload.token.id,
                                customer_id: this.props.user_id,
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
                                    console.log(`STRIPE ERROR CODE - ${response.data.code}`);
                                    break;
                                }
                            }
                            toast.error(message, {
                                position: toast.POSITION.TOP_LEFT,
                                autoClose: 3000
                            });
                        } else {
                            if (response.data.status === 'subscribed') {
                                this.props.setDimmer(false);
                                await appManager.executeQueryAuth('mutation', updateUserQuery, { id: this.props.user_id, subscribed: true });
                                toast.success('Thanks - You have been successfully subscribed!', {
                                    position: toast.POSITION.TOP_LEFT,
                                    autoClose: 3000
                                });

                                this.props.callback();
                            }
                        }
                    }
                });
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    };
    render() {
        if (this.state.visible === false) {
            return null;
        }
        const cp = this.p_array[0];
        let disp = <div>
            <h2>You are already subscribed to the following plan.</h2>

            <PlanElement plan={cp.props.plan} />     </div>;


        if (!this.state.subscribed) {
            if (this.state.show_plan === false) {
                disp =
                    <Row>
                        <Col >
                            <Elements>
                                <CheckoutForm handleSubmit={this.handleSubmit} fontSize={this.props.fontSize} />
                            </Elements>
                        </Col>
                    </Row>;
            } else {
                disp = <div>

                    {this.p_array}

                </div>;
            }
        }

        return (
            <div>
                {disp}
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
                            <SplitForm setDimmer={this.setDimmer} callback={this.props.callback}  user_id={this.props.user_id} subscribed={this.props.subscribed} fontSize="14px" />
                    <Dimmer active={this.state.dimmer} onClickOutside={this.handleHide}>
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

const _CheckoutForm = ({ stripe, handleSubmit, fontSize }) =>
    <form onSubmit={handleSubmit(stripe)}>
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
        <button>Pay</button>
    </form>;


const CheckoutForm = injectStripe(_CheckoutForm);

_CheckoutForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    fontSize: PropTypes.string.isRequired,
    stripe: PropTypes.func.isRequired
};

PlanElement.propTypes = {
    plan: PropTypes.object.isRequired,
    handleClick: PropTypes.func
};

PlanElement.defaultProps = {
    handleClick: null
};

SplitForm.propTypes = {
    user_id: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    subscribed: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired,
    setDimmer: PropTypes.func.isRequired,
};

AdminSubscriptionController.propTypes = {
    user_id: PropTypes.number.isRequired,
    subscribed: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired,
};


export default AdminSubscriptionController;

import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PostalCodeElement,
    Elements,
    injectStripe,
    StripeProvider
} from 'react-stripe-elements';

import stripeImage from '../../../assets/images/stripeSecure.png';
import appManager from '../../../utils/appManager';
import { updateUserQuery } from '../../../queries/users';


const PricePlanBlock = ({ plan, handleClick }) => {          // eslint-disable-line
    const meta_array = [];
    for (let key in plan.metadata) {            // eslint-disable-line
        meta_array.push(<div style={{ color: 'black', fontSize: '12px', backgroundColor: 'wheat' }} className="ui center aligned segment">
            <p> - {plan.metadata[key]} </p>
        </div>);
    }
    const dollars = plan.amount / 100;
    dollars.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return (
        <div className="six wide column">
            <div className="ui raised segments">
                <div className="ui center aligned secondary segment">
                    <div className="ui statistic">
                        <div
                            className="value"
                        >
                            <span style={{
                                fontSize: '40px'
                            }}>
                                ${dollars}
                            </span>
                        </div>
                        <div className="label">
                            per {plan.interval}
                        </div>
                    </div>
                </div>
                {meta_array}
            </div>
            {handleClick &&
                <div role="menuItem" tabIndex={0} className="ui green fluid button" onClick={() => handleClick(plan)}>
                    Select
             </div>
            }
        </div>);
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

class _CreditController extends Component {
    render() {
        return (
            <div>
                <form onSubmit={(ev) => { this.props.handleSubmit(ev, this.props.stripe); }}>
                    <div style={{ height: 40, marginBottom: 16 }}><img style={{ height: 'inherit' }} alt="Powered By Stripe" src={stripeImage} /></div>
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
                    <button>START FREE TRIAL</button>
                </form>
            </div>
        );
    }
}

const CreditController = injectStripe(_CreditController);

class PlanController extends Component {
    state = { visible: false, selected_plan: '', plan_array: [] }       // eslint-disable-line
    componentDidMount = () => {
        const plan_array = [];
        this.props.plans.forEach(plan => {
            plan_array.push(<PricePlanBlock plan={plan} handleClick={this.props.handleClick} />);
        });
        this.setState({ visible: true, plan_array });
    }
    render() {
        if (!this.state.visible) {
            return null;
        }
        return this.state.plan_array;
    }
}


class PaywallContent extends Component {
    state = { visible: false, display_credit_form: false, display_plan: true };
    componentDidMount = async () => {
        const plans = await axios.get(`${process.env.REACT_APP_API_SERVER}/stripe/new/retrieve_plans?product=${process.env.REACT_APP_STRIPE_PRODUCT_ID}`);
        this.pay_plans = plans.data.data;
        this.setState({ visible: true });
    }

    handlePlanClick = plan => {
        this.selected_plan = plan;
        this.setState({ display_plan: false, display_credit_form: true });
    }
    handleCCSubmit = (ev, stripe) => {
        ev.preventDefault();
        if (stripe) {
            stripe
                .createToken()
                .then(async (payload) => {
                    if (payload.error) {
                        toast.error(payload.error.message, {
                            position: toast.POSITION.TOP_LEFT,
                            autoClose: 3000
                        });
                        this.props.callback(false);
                    } else {
                        const response = await axios.post(
                            `${process.env.REACT_APP_API_SERVER}/stripe/new/create_subscription`,
                            {
                                token: payload.token.id,
                                customer_id: this.props.user_id,
                                plan: this.selected_plan.id,
                                trial_period_days: this.selected_plan.trial_period_days
                            },
                            {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                        );
                        if (response.data.status === 'error') {
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
                            if (response.data.status === 'subscribed') {
                                await appManager.executeQueryAuth('mutation', updateUserQuery, { id: this.props.user_id, subscribed: true });
                                toast.success('Thanks - You have been successfully subscribed!', {
                                    position: toast.POSITION.TOP_LEFT,
                                    autoClose: 3000
                                });

                                // add 4 more sponsors, if not already there.
                                // const sponsor_data = await appManager.executeQueryAuth('query', getSponsorsQuery, { subDomain: this.props.domain });
                                // const num_sponsors = sponsor_data.organisationAccountBySubDomain.orgSponsorsByOrganisation.nodes.length;
                                // const num_to_create = 8 - num_sponsors;
                                // for (let p = 0; p < num_to_create; p += 1) {
                                //     await appManager.executeQueryAuth('mutation', createSponsorsQuery, {                // eslint-disable-line
                                //         subDomain: this.props.domain,
                                //         imageUrl: 'https://s3.amazonaws.com/origin-images/origin/sponsor_images/logoSameColor.png',
                                //         hrefLink: 'http://origin.gg',
                                //         name: 'Origin.GG',
                                //         description: 'Building an Esports team is difficult. Recruiting players, practicing, and getting your teams to events is a full-time job. Allow us to handle the rest. Origin.gg makes it easy for you to set up a pro style organization.'
                                //     });
                                // }
                                // console.log(num_to_create);
                                this.props.callback(true, this.selected_plan);
                            }
                        }
                    }
                });
        } else {
            this.props.callback(false);
            console.log("Stripe.js hasn't loaded yet.");
        }
    }
    render() {
        if (!this.state.visible) {
            return null;
        }
        return (
            <div>
                {this.state.display_plan &&
                    <div style={{ backgroundColor: '#343c44' }}>
                        <div className="ui grid centered">
                            <PlanController plans={this.pay_plans} handleClick={this.handlePlanClick} />
                        </div>
                    </div>}
                {this.state.display_credit_form &&
                    <Elements>
                        <CreditController plans={this.selected_plan} handleSubmit={this.handleCCSubmit} />
                    </Elements>}
            </div>
        );
    }
}


class PaywallController extends Component {
    state = { subscribed: false, plan: null };
    handleCallback = (f, plan) => {
        this.props.subscribed(f);
        if (f) {
            this.setState({ subscribed: true, plan });
        }
    }
    render() {
        if (!this.state.subscribed) {
            return (
                <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PK_KEY} >
                    <PaywallContent callback={this.handleCallback} user_id={this.props.user_id} />
                </StripeProvider>
            );
        }

        return (
            <div style={{ display: 'block', color: 'wheat' }} className="ui grid centered">
                <div>
                    <h2>SUCCESSFULL</h2>
                </div>
                <div>
                <h4>You have subscribed to the following plan:</h4>
                </div>
                <PricePlanBlock plan={this.state.plan} />
            </div>);
    }
}


PaywallController.propTypes = {
    user_id: PropTypes.number.isRequired,
    subscribed: PropTypes.func.isRequired
};

PaywallContent.propTypes = {
    user_id: PropTypes.number.isRequired,
    callback: PropTypes.func.isRequired
};
PlanController.propTypes = {
    plans: PropTypes.array.isRequired,
    handleClick: PropTypes.func.isRequired,
};


_CreditController.propTypes = {
    stripe: PropTypes.object.isRequired,
    plan: PropTypes.object.isRequired,
    fontSize: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
};
PricePlanBlock.propTypes = {
    plan: PropTypes.object.isRequired,
    handleClick: PropTypes.func
};

PricePlanBlock.defaultProps = {
    handleClick: null
};

export default PaywallController;


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
import { updateUserQuery, getUserQuery } from '../../../queries/users';
import freeTrialImage from '../../../assets/images/free-trial.png';


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
                    <img src={freeTrialImage} alt="free trial" style={{ width: 112 }} />
                </div>
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
                    <label>
                        Code
                        <input />
                    </label>
                    <div style={{ paddingTop: 24 }}>
                        <Button size="mini" primary>START FREE TRIAL</Button>
                        <Button onClick={this.props.handleBack} size="mini" style={{ float: 'right' }}>BACK</Button>
                    </div>

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
    state = {
        visible: false, dimmer: false, display_credit_form: false, display_plan: true
    };
    componentDidMount = async () => {
        const plans = await axios.get(`${process.env.REACT_APP_API_SERVER}/stripe/new/retrieve_plans?product=${process.env.REACT_APP_STRIPE_PRODUCT_ID}`);
        this.pay_plans = plans.data.data;
        this.setState({ visible: true });
    }
    setDimmer = f => {
        this.setState({ dimmer: f });
    }
    handlePlanClick = plan => {
        this.selected_plan = plan;
        this.setState({ display_plan: false, display_credit_form: true });
    }
    handleBack = e => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ display_plan: true, display_credit_form: false });
    }
    handleCCSubmit = (ev, stripe) => {
        ev.preventDefault();
        this.setDimmer(true);
        if (stripe) {
            stripe
                .createToken()
                .then(async (payload) => {
                    if (payload.error) {
                        this.setDimmer(false);
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
                            if (response.data.status === 'subscribed') {
                                this.setDimmer(false);
                                await appManager.executeQueryAuth('mutation', updateUserQuery, { id: this.props.user_id, subscribed: true });
                                toast.success('Thanks - You have been successfully subscribed!', {
                                    position: toast.POSITION.TOP_LEFT,
                                    autoClose: 3000
                                });
                                appManager.executeQueryAuth('query', getUserQuery, { id: this.props.user_id }).then(pl => {
                                    let slack_payload = {
                                        text: `*REAL-SIGNUP-PRODUCTION*\n*Owner name:* ${pl.resultData.firstName} ${pl.resultData.lastName}\n*Plan:* ${this.selected_plan.id}\n*Owner Email:* ${pl.resultData.email}\n`,
                                    };
                                    if (process.env.REACT_APP_ENVIRONMENT !== 'production') {
                                        slack_payload = {
                                            text: `*TEST-NOT-PRODUCTION*\n*Owner name:* ${pl.resultData.firstName} ${pl.resultData.lastName}\n*Plan:* ${this.selected_plan.id}\n*Owner Email:* ${pl.resultData.email}\n`,
                                        };
                                    }
                                    axios.post(process.env.REACT_APP_SLACK_NEW_PRODUCT_WEBHOOK, JSON.stringify(slack_payload), {
                                        withCredentials: false,
                                        transformRequest: [(data, headers) => {
                                            delete headers.post['Content-Type'];                // eslint-disable-line
                                            return data;
                                        }]
                                    });
                                });
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
                    <div style={{ backgroundColor: '#343c44', paddingBottom: 16, marginBottom: 16 }}>
                        <div className="ui stackable grid centered">
                            <PlanController plans={this.pay_plans} handleClick={this.handlePlanClick} />
                        </div>
                    </div>}
                {this.state.display_credit_form &&
                    <Dimmer.Dimmable as={Segment} dimmed={this.state.dimmer}>
                        <Elements>
                            <CreditController plans={this.selected_plan} handleBack={this.handleBack} handleSubmit={this.handleCCSubmit} />
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
                }
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
            <div style={{ backgroundColor: '#343c44', paddingBottom: 22, marginBottom: 16 }}>
                <div style={{ display: 'block', color: 'wheat', paddingTop: 8 }} className="ui stackable grid centered">
                    <div>
                        <h2>SUCCESSFULL</h2>
                    </div>
                    <div>
                        <h4>You have subscribed to the following plan:</h4>
                    </div>
                    <PricePlanBlock plan={this.state.plan} />
                    <h4>You can now proceed and create your subdomain.</h4>
                </div></div>);
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
    handleSubmit: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired
};
PricePlanBlock.propTypes = {
    plan: PropTypes.object.isRequired,
    handleClick: PropTypes.func
};

PricePlanBlock.defaultProps = {
    handleClick: null
};

export default PaywallController;


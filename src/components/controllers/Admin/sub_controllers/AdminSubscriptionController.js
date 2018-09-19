import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Dimmer, Header, Segment } from 'semantic-ui-react';
import Spinner from 'react-svg-spinner';

import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PostalCodeElement,
    Elements,
    injectStripe
} from 'react-stripe-elements';

// import { Segment } from 'semantic-ui-react/dist/commonjs';
import stripeImage from '../../../../assets/images/powered_by_stripe@3x.png';
import appManager from '../../../../utils/appManager';
import { updateUserQuery } from '../../../../queries/users';
import { getSponsorsQuery, createSponsorsQuery } from '../../../../queries/sponsors';

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
    const dollars = plan.amount / 100;
    const f_array = [];
    for (const k in plan.metadata) {                    // eslint-disable-line
        f_array.push(<li className="feature"><span>{plan.metadata[k]}</span></li>);
    }
    const w = dollars.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    let call = <li style={{ cursor: 'pointer' }} onClick={() => { handleClick(plan); }} className="call-to-action">Buy Now</li>;
    if (!handleClick) {
        call = <li style={{ cursor: 'pointer' }} onClick={() => { handleClick(plan); }} className="call-to-action-bl" />;
    }
    return (
        <div className="pricing-table clearfix">
            <ul className="highlight-high">
                <li className="heading">{plan.nickname}</li>
                <li className="price">{w}/{plan.interval}</li>
                {f_array}
                {call}
            </ul>
        </div>
    );
};

class _SplitForm extends React.Component {
    state = {
        subscribed: false, show_plan: true, actual_plan: null, visible: false
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
    handleSubmit = (ev) => {
        ev.preventDefault();
        if (this.props.stripe) {
            this.props.setDimmer(true);
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
                                await appManager.executeQuery('mutation', updateUserQuery, { id: this.props.user_id, subscribed: true });
                                toast.success('Thanks - You have been successfully subscribed!', {
                                    position: toast.POSITION.TOP_LEFT,
                                    autoClose: 3000
                                });

                                // add 4 more sponsors, if not already there.
                                const sponsor_data = await appManager.executeQueryAuth('query', getSponsorsQuery, { subDomain: this.props.domain });
                                const num_sponsors = sponsor_data.organisationAccountBySubDomain.orgSponsorsByOrganisation.nodes.length;
                                const num_to_create = 8 - num_sponsors;
                                for (let p = 0; p < num_to_create; p += 1) {
                                    await appManager.executeQuery('mutation', createSponsorsQuery, {                // eslint-disable-line
                                        subDomain: this.props.domain,
                                        imageUrl: 'https://s3.amazonaws.com/origin-images/origin/sponsor_images/logoSameColor.png',
                                        hrefLink: 'http://origin.gg',
                                        name: 'Origin.GG',
                                        description: 'Building an Esports team is difficult. Recruiting players, practicing, and getting your teams to events is a full-time job. Allow us to handle the rest. Origin.gg makes it easy for you to set up a pro style organization.'
                                    });
                                }
                                console.log(num_to_create);
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
            <PlanElement plan={cp.props.plan} /></div>;

        if (!this.state.subscribed) {
            if (this.state.show_plan === false) {
                disp =
                    <Row>
                        <Col span={12} >
                            <form onSubmit={this.handleSubmit}>
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
                                <button>Pay</button>
                            </form>;
                            </Col>
                        <Col span={12}><PlanElement plan={this.state.actual_plan} /></Col>
                    </Row>;
            } else {
                disp = <div>
                    <h2 className="ui header">
                        <i aria-hidden="true" className="dollar sign icon" />
                        <div className="content">
                            Available Plans
                            <div className="sub header">Choose your plan below</div>
                        </div>
                    </h2>
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

const SplitForm = injectStripe(_SplitForm);

class AdminSubscriptionController extends Component {
    state = { dimmer: false }
    componentDidMount = () => {

    }
    setDimmer = f => {
        this.setState({ dimmer: f });
    }
    render() {
        return (
            <div style={{ width: 'calc(100vw - 400px)' }} >
                <Dimmer.Dimmable as={Segment} dimmed={this.state.dimmer}>
                    <div className="Checkout">
                        <Elements>
                            <SplitForm setDimmer={this.setDimmer} callback={this.props.callback} domain={this.props.domain} user_id={this.props.user_id} subscribed={this.props.subscribed} fontSize="14px" />
                        </Elements>
                    </div>
                    <Dimmer active={this.state.dimmer} onClickOutside={this.handleHide}>
                        <Header as="h2" icon inverted>
                            <div style={{ marginTop: 228 }}>
                                <Spinner color="yellow" size="64px" />
                            </div>
                            Processing....
            </Header>
                    </Dimmer>
                </Dimmer.Dimmable>
            </div>

        );
    }
}

PlanElement.propTypes = {
    plan: PropTypes.object.isRequired,
    handleClick: PropTypes.func
};

PlanElement.defaultProps = {
    handleClick: null
};

_SplitForm.propTypes = {
    user_id: PropTypes.number.isRequired,
    stripe: PropTypes.object.isRequired,
    fontSize: PropTypes.string.isRequired,
    subscribed: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired,
    setDimmer: PropTypes.func.isRequired,
    domain: PropTypes.string.isRequired
};

AdminSubscriptionController.propTypes = {
    user_id: PropTypes.number.isRequired,
    subscribed: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired,
    domain: PropTypes.string.isRequired
};


export default AdminSubscriptionController;

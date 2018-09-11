import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from 'axios';

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


class _SplitForm extends React.Component {
    state = { visible: false };
    componentDidMount = async () => {
        this.setState({ subscribed: this.props.subscribed, visible: true });
    }
    handleSubmit = (ev) => {
        ev.preventDefault();
        if (this.props.stripe) {
            this.props.stripe
                .createToken()
                .then(async (payload) => {
                    if (payload.error) {
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
                                plan_name: 'standard'
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
                                    break;
                                }
                            }
                            toast.error(message, {
                                position: toast.POSITION.TOP_LEFT,
                                autoClose: 3000
                            });
                        } else {
                            if (response.data.status === 'subscribed') {
                                await appManager.executeQuery('mutation', updateUserQuery, { id: this.props.user_id, subscribed: true });
                                toast.success('Thanks - You have been successfully subscribed!', {
                                    position: toast.POSITION.TOP_LEFT,
                                    autoClose: 3000
                                });
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
        return (
            <div>
                {!this.state.subscribed &&
                    <form onSubmit={this.handleSubmit}>
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
                    </form>
                }
                {this.state.subscribed &&
                    <p>We will tidy this up, but you are already subscribed!</p>
                }
            </div>
        );
    }
}

const SplitForm = injectStripe(_SplitForm);

class AdminSubscriptionController extends Component {
    componentDidMount = () => {

    }
    render() {
        return (
            <div className="Checkout">
                <div style={{ height: 40, marginBottom: 16 }}><img style={{ height: 'inherit' }} alt="Powered By Stripe" src={stripeImage} /></div>
                <Elements>
                    <SplitForm user_id={this.props.user_id} subscribed={this.props.subscribed} fontSize="14px" />
                </Elements>
            </div>
        );
    }
}

_SplitForm.propTypes = {
    user_id: PropTypes.number.isRequired,
    stripe: PropTypes.object.isRequired,
    fontSize: PropTypes.string.isRequired,
    subscribed: PropTypes.bool.isRequired
};

AdminSubscriptionController.propTypes = {
    user_id: PropTypes.number.isRequired,
    subscribed: PropTypes.bool.isRequired
};


export default AdminSubscriptionController;

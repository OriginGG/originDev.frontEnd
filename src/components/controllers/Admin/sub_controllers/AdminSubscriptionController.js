import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Message, Segment } from 'semantic-ui-react';
import stripeImage from '../../../../assets/images/powered_by_stripe@3x.png';

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


class CardForm extends Component {
    handleSubmit = (ev) => {
        ev.preventDefault();
        if (this.props.stripe) {
            this.props.stripe
                .createToken()
                .then((payload) => console.log('_[token]', payload));
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Message
                    style={{ width: 800 }}
                    icon="money bill alternate"
                    header="Current Subscription: $50.00"
                    content="No Coupon applied."
                />
                <label htmlFor="control">
                    Card details
          <CardElement
                        id="control"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onReady={handleReady}
                    />
                </label>
                <div style={{ display: 'flex' }} >
                    <input id="coupon" placeholder="Enter Coupon Code" />
                    <button style={{
                        fontSize: 9,
                        height: 24,
                        lineHeight: '8px',
                        marginTop: 16,
                        marginLeft: 12,
                        backgroundColor: 'green'
                    }}>APPLY COUPON</button>
                </div>
                <button>Pay</button>
                <Segment style={{ width: 700, fontSize: 12 }}>Terms and Conditions etc</Segment>
            </form>
        );
    }
}

CardForm.propTypes = {
    stripe: PropTypes.object.isRequired
};


class AdminSubscriptionController extends Component {
    render() {
        return (
            <div className="Checkout">
                <div style={{ height: 40, marginBottom: 16 }}><img style={{ height: 'inherit' }} alt="Powered By Stripe" src={stripeImage} /></div>
                <CardForm />
            </div>
        );
    }
}

export default injectStripe(AdminSubscriptionController);

import React from 'react';
import { Elements } from 'react-stripe-elements';

import AdminSubscriptionController from './AdminSubscriptionController';

class AdminSubscriptionCheckoutController extends React.Component {
    render() {
        return (
            <Elements>
                <AdminSubscriptionController />
            </Elements>
        );
    }
}

export default AdminSubscriptionCheckoutController;

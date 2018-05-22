import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { toast } from 'react-toastify';
import { GlobalStyles } from 'Theme/Theme';
import historyStore from '../../../utils/stores/browserHistory';

import { getIndividualUserByIdQuery } from '../../../queries/users';
import { authenticateIndividualQuery } from '../../../queries/login';
import { updateIndividualUserQuery } from '../../../queries/individuals';

class NewSignupIndividualPageController extends Component {
    componentWillMount = async () => {
        const token = this.props.appManager.GetQueryParams('p');
        const d = JSON.parse(Buffer.from(token, 'hex').toString('utf8'));
        debugger;
        const pre_user = await this.props.appManager.executeQuery('query', getIndividualUserByIdQuery, { id: d.id });
        const u = pre_user.allIndividualUsers.edges[0].node;
        // if (u == null) {
        //     const registered_user = await this.props.appManager.executeQuery('query', getIndividualUserByEmailQuery, { email: d.organisation });
        //     if (registered_user.allIndividualUsers.edges.length > 0) {
        //         toast.error(`${d.organisation} is already registered - Redirecting you to login page in 5 seconds`, {
        //             position: toast.POSITION.TOP_LEFT,
        //             autoClose: 5000
        //         });
        //     } else {
        //         toast.error(`${d.organisation} is not pre-registered anymore, and no user of that email exists - redirecting you to login page in 5 seconds!`, {
        //             position: toast.POSITION.TOP_LEFT,
        //             autoClose: 5000
        //         });
        //     }
        //     setTimeout(() => {
        //         historyStore.push('/signup');
        //     }, 5000);
        // }
        if (u) {
            if (u.authenticated === true) {
                toast.error(`${u.email} is already registered - Redirecting you to login page in 5 seconds`, {
                    position: toast.POSITION.TOP_LEFT,
                    autoClose: 5000
                });
                setTimeout(() => {
                    historyStore.push('/signup');
                }, 5000);
            } else {
                const payload = {
                    id: d.id,
                    firstName: u.firstName,
                    lastName: u.lastName,
                    userName: u.username,
                    email: u.email,
                    authenticated: true
                };
                await this.props.appManager.executeQuery('mutation', updateIndividualUserQuery, payload);
                const authPayload = await this.props.appManager.executeQuery('mutation', authenticateIndividualQuery, { email: u.email, password: d.password });
                const new_payload = Buffer.from(JSON.stringify(authPayload), 'utf8').toString('hex');
                historyStore.push(`/individual?p=${new_payload}`);
            }
        }
    }

    render() {
        return <span />;
    }
}

NewSignupIndividualPageController.propTypes = {
    appManager: PropTypes.object.isRequired,
};
export default inject('appManager', 'uiStore')(injectSheet(GlobalStyles)(NewSignupIndividualPageController));


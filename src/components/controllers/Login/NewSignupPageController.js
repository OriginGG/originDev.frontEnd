import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { toast } from 'react-toastify';
import { GlobalStyles } from 'Theme/Theme';
import historyStore from '../../../utils/stores/browserHistory';

import { getUserByEmailQuery, getPreUserQuery, createUserQuery, deletePreUserQuery } from '../../../queries/users';
import { authenticateQuery } from '../../../queries/login';

class NewSignupPageController extends Component {
    componentWillMount = async () => {
        const token = this.props.appManager.GetQueryParams('token');
        const d = this.props.appManager.decodeJWT(token);
        const pre_user = await this.props.appManager.executeQuery('query', getPreUserQuery, { id: d.id });
        const u = pre_user.resultData;
        if (u == null) {
            const registered_user = await this.props.appManager.executeQuery('query', getUserByEmailQuery, { email: d.organisation });
            if (registered_user.allUsers.edges.length > 0) {
                toast.error(`${d.organisation} is already registered - Redirecting you to login page in 5 seconds`, {
                    position: toast.POSITION.TOP_LEFT,
                    autoClose: 5000
                });
            } else {
                toast.error(`${d.organisation} is not pre-registered anymore, and no user of that email exists - redirecting you to login page in 5 seconds!`, {
                    position: toast.POSITION.TOP_LEFT,
                    autoClose: 5000
                });
            }
            setTimeout(() => {
                historyStore.push('/signup');
            }, 5000);
        }
        if (u) {
            const payload = {
                firstName: u.name,
                lastName: '',
                password: u.password,
                email: u.email,
                adminUser: true,
            };
            await this.props.appManager.executeQuery('mutation', createUserQuery, payload);
            const authPayload = await this.props.appManager.executeQuery('mutation', authenticateQuery, { email: u.email, password: u.password });
            const new_payload = Buffer.from(JSON.stringify(authPayload), 'utf8').toString('hex');
            await this.props.appManager.executeQuery('mutation', deletePreUserQuery, { id: d.id });
            historyStore.push(`/createsubdomain?p=${new_payload}`);
        }
    }

    render() {
        return <span />;
    }
}

NewSignupPageController.propTypes = {
    appManager: PropTypes.object.isRequired,
};
export default inject('appManager', 'uiStore')(injectSheet(GlobalStyles)(NewSignupPageController));


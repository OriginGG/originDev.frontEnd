import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { toast } from 'react-toastify';
import { GlobalStyles } from 'Theme/Theme';
import historyStore from '../../../utils/stores/browserHistory';

import { getUserQuery } from '../../../queries/users';
// import { getUserQuery, updateUserQuery } from '../../../queries/users';
import { authenticateQuery } from '../../../queries/login';
// import { deleteEmailRegistrationQuery } from '../../../queries/registrations';

class NewSignupPageController extends Component {
    componentDidMount = async () => {
        const token = this.props.appManager.GetQueryParams('p');
        const d = JSON.parse(Buffer.from(token, 'hex').toString('utf8'));
        const authPayload = await this.props.appManager.executeQuery('mutation', authenticateQuery, { email: d.email, password: d.password });
        const my_token = authPayload.authenticate.resultData.jwtToken;
        this.props.appManager.authToken = my_token;
        const user = await this.props.appManager.executeQueryAuth('query', getUserQuery, { id: d.id });
        const u = user.resultData;
        if (u.authenticated === true) {
            toast.error(`${d.organisation} is already registered - Redirecting you to login page in 5 seconds`, {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 5000
            });
            setTimeout(() => {
                historyStore.push('/signup');
            }, 5000);
        } else {
            // const payload = {
            //     authenticated: true,
            //     id: d.id,
            // };
            // await this.props.appManager.executeQuery('mutation', updateUserQuery, payload);
            // await this.props.appManager.executeQuery('mutation', deleteEmailRegistrationQuery, { email: u.email });
            const new_payload = Buffer.from(JSON.stringify(authPayload), 'utf8').toString('hex');
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


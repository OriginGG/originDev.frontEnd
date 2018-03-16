import React, { Component } from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Route } from 'react-router-dom';
import { getThemeQuery } from './queries/themes';
// import { authenticateQuery } from './queries/login';
import SignupPageController from './components/controllers/Login/SignupPageController';
import OrganizationPageController from './components/controllers/Main/OrganizationPageController';
import AdminPageController from './components/controllers/Admin/AdminController';
import { GlobalStyles } from './utils/themes/Theme';
import historyStore from './utils/stores/browserHistory';
import './App.css';
import CreateSubDomainController from './components/controllers/Login/CreateSubDomainController';


class App extends Component {
    componentWillMount = async () => {
        // pouchTest
        const is_root = location.pathname === '/';              // eslint-disable-line
        if (is_root) {
            const originTheme = await this.props.appManager.executeQuery('query', getThemeQuery, { subDomain: 'origin' });
            this.props.uiStore.setOriginTheme(originTheme.resultData);
            const domainInfo = this.props.appManager.getDomainInfo();
            const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_THEME_NAME : domainInfo.subDomain;

            const authPayload = this.props.appManager.GetQueryParams('p');
            if (authPayload) {
                const p = JSON.parse(Buffer.from(authPayload, 'hex').toString('utf8'));
                await this.props.appManager.pouchStore('authenticate', p);
                historyStore.push('/main');
            }
            // is there a query param?

            const auth = await this.props.appManager.pouchGet('authenticate');

            if (auth && auth.authenticate.resultData.organisation === subDomain) {
                const token = auth.authenticate.resultData.jwtToken;
                const d = this.props.appManager.decodeJWT(token);
                this.props.uiStore.setUserID(d.id);
                debugger;
                this.props.appManager.authToken = auth.authenticate.resultData.jwtToken;
                if (auth.authenticate.resultData.organisation === 'origin') {
                    historyStore.push('/signup');
                } else {
                    historyStore.push('/main');
                }
                // we are already logged in, and have same organisation
            } else {
                historyStore.push('/signup');
                // TODO direct to signup if not on admin page.
                // debugger;
                // either we're not logged in, or we are trying to log into a different sub-domain
                // historyStore.push('/signup');
            }
            //          // are we authenticated
            // const authPayload = await this.props.appManager.executeQuery('mutation', authenticateQuery);
            // await this.props.appManager.pouchStore('authenticate', authPayload);
            // // const res = await appManager.pouchGet('authenticate');
            // const domainInfo = this.props.appManager.getDomainInfo();
            // const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_THEME_NAME : domainInfo.subDomain;
            // const o = await this.props.appManager.executeQuery('query', getOrganisationQuery, { subDomain });
            // if (o.resultData === null) {
            //     console.log('sub domain does not exist!');
            // } else {
            //     this.props.uiStore.setOrganisation(o.resultData);
            // }
        }
    };
    render() {
        return (
            <div>
                <Route exact path="/signup" component={SignupPageController} />
                <Route exact path="/main" component={OrganizationPageController} />
                <Route exact path="/admin" component={AdminPageController} />
                <Route exact path="/createsubdomain" component={CreateSubDomainController} />
            </div>
        );
    }
}
App.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(App));


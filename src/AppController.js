import React, { Component } from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { getThemeQuery } from './queries/themes';
// import { authenticateQuery } from './queries/login';
import { GlobalStyles } from './utils/themes/Theme';
import historyStore from './utils/stores/browserHistory';
import './App.css';


class AppController extends Component {
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
                this.props.appManager.logged_in = true;
                historyStore.push('/main');
            }
            // is there a query param?

            const auth = await this.props.appManager.pouchGet('authenticate');

            if (auth && auth.authenticate.resultData.organisation === subDomain) {
                const token = auth.authenticate.resultData.jwtToken;
                const d = this.props.appManager.decodeJWT(token);
                d.organisation = subDomain;
                const new_token = this.props.appManager.encodeJWT(d);
                this.props.uiStore.setUserID(d.id);
                this.props.appManager.authToken = new_token;
                if (auth.authenticate.resultData.organisation === 'origin') {
                    window.location.href = '/landing/index.html';
                    // historyStore.push('/landing');
                } else {
                    this.props.appManager.logged_in = true;
                    historyStore.push('/main');
                }
                // we are already logged in, and have same organisation
            } else {
                window.location.href = '/landing/index.html';
                // historyStore.push('/landing');
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
        } else {
            if (location.pathname === '/admin') {            // eslint-disable-line
                const domainInfo = this.props.appManager.getDomainInfo();
                const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_THEME_NAME : domainInfo.subDomain;
                const auth = await this.props.appManager.pouchGet('authenticate');
                if (auth && auth.authenticate.resultData.organisation === subDomain) {
                    const token = auth.authenticate.resultData.jwtToken;
                    const d = this.props.appManager.decodeJWT(token);
                    d.organisation = subDomain;
                    const new_token = this.props.appManager.encodeJWT(d);
                    this.props.uiStore.setUserID(d.id);
                    this.props.appManager.authToken = new_token;
                    this.props.appManager.admin_logged_in = true;
                    historyStore.push('/admin_page');
                }
            }
        }
    };
    render() {
        return (
            <div />
        );
    }
}
AppController.propTypes = {
    appManager: PropTypes.object.isRequired,
    uiStore: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AppController));


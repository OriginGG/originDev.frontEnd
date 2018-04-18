import React, { Component } from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { getThemeQuery } from './queries/themes';
import { getOrganisationQuery } from './queries/organisation';
import { GlobalStyles } from './utils/themes/Theme';
import historyStore from './utils/stores/browserHistory';
import './App.css';


class AppController extends Component {
    componentWillMount = async () => {
        // pouchTest
        const is_root = location.pathname === '/';              // eslint-disable-line
        if (is_root) {
            // first check if we're being passed a domain token.

            const domainToken = await this.props.appManager.getDomainToken();
            if (domainToken && domainToken.token) {
                this.props.appManager.serveDomain = domainToken.host;
                historyStore.push('/main');
            } else {
                const authPayload = this.props.appManager.GetQueryParams('p');
                if (authPayload) {
                    const p = JSON.parse(Buffer.from(authPayload, 'hex').toString('utf8'));
                    await this.props.appManager.pouchStore('authenticate', p);
                }
                // const domainGo = this.props.appManager.GetQueryParams('domain');
                // if (domainGo) {
                //     this.props.appManager.serveDomain = domainGo;
                //     historyStore.push('/main');
                // }
                // console.log(domainGo);
                const originTheme = await this.props.appManager.executeQuery('query', getThemeQuery, { subDomain: 'origin' });
                this.props.uiStore.setOriginTheme(originTheme.resultData);
                const domainInfo = this.props.appManager.getDomainInfo();
                const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_THEME_NAME : domainInfo.subDomain;
                const o = await this.props.appManager.executeQuery('query', getOrganisationQuery, { subDomain });
                let u_string;
                if (o.resultData === null) {
                    if (subDomain) {
                        const { hostname } = domainInfo;
                        const new_host = hostname.replace(`${subDomain}.`, '');
                        u_string = `${domainInfo.protocol}//${new_host}:${domainInfo.port}`;
                        console.log(u_string);
                    }
                    if (process.env.REACT_APP_ENVIRONMENT === 'production') {
                        window.location = `${u_string}/landing/index.html`;
                    } else {
                        window.location = `${u_string}/signup`;
                    }
                } else {
                    if (subDomain === 'origin') {
                        if (process.env.REACT_APP_ENVIRONMENT === 'production') {
                            window.location.href = '/landing/index.html';
                        } else {
                            historyStore.push('/signup');
                        }
                    } else {
                        historyStore.push('/main');
                    }
                }
            }
        } else {
            if (location.pathname === '/admin') {  // eslint-disable-line
                const domainInfo = this.props.appManager.getDomainInfo();
                const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_THEME_NAME : domainInfo.subDomain;
                if (!domainInfo) {
                    historyStore.push('/signup');
                } else {
                    const o = await this.props.appManager.executeQuery('query', getOrganisationQuery, { subDomain });
                    if (o.resultData === null) {
                        const { hostname } = domainInfo;
                        const new_host = hostname.replace(`${subDomain}.`, '');
                        const u_string = `${domainInfo.protocol}//${new_host}:${domainInfo.port}`;
                        window.location = `${u_string}/signup`;
                    } else {
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
                        } else {
                            const { hostname } = domainInfo;
                            const new_host = hostname.replace(`${subDomain}.`, '');
                            const u_string = `${domainInfo.protocol}//${new_host}:${domainInfo.port}`;
                            window.location = `${u_string}/signup`;
                        }
                    }
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


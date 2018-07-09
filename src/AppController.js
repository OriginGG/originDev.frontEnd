import React, { Component } from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import _ from 'lodash';
import { getThemeQuery } from './queries/themes';
import { getOrganisationQuery } from './queries/organisation';
import { getIndividualUserByHandleQuery } from './queries/individuals';
import { GlobalStyles } from './utils/themes/Theme';
import historyStore from './utils/stores/browserHistory';
import './App.css';


const pathsToIgnore = [
    '/signup',
    '/password',
    '/landing',
    '/signup_org',
    '/signup_ind',
    '/new_signup',
    '/new_signup_ind',
    '/main',
    '/individual',
    '/admin_page',
    '/ind_invite',
    '/createsubdomain'
];

class AppController extends Component {
    componentDidMount = async () => {
        let admin = false;
        // pouchTest

        const is_root = location.pathname === '/';              // eslint-disable-line
        if (is_root) {
            const domainToken = await this.props.appManager.getDomainToken();
            if (domainToken && domainToken.token) {
                this.props.appManager.serveDomain = domainToken.host;
                historyStore.push('/main');
            } else {
                const domainInfo = this.props.appManager.getDomainInfo();
                const authPayload = this.props.appManager.GetQueryParams('p');
                if (authPayload) {
                    admin = true;
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
                const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_ORGANISATION_NAME : domainInfo.subDomain;
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
                        if (!admin) {
                            historyStore.push('/main');
                        } else {
                            historyStore.push('/admin');
                        }
                    }
                }
            }
        } else {
            if (location.pathname === '/admin') {  // eslint-disable-line
                const domainInfo = this.props.appManager.getDomainInfo();
                const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_ORGANISATION_NAME : domainInfo.subDomain;
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
            } else {
                const l = location.pathname;        // eslint-disable-line
                if (_.findIndex(pathsToIgnore, (o) => {
                    return o === l;
                }) === -1) {
                    const handle = (location.pathname).replace('/', '');            // eslint-disable-line
                    const user = await this.props.appManager.executeQuery('query', getIndividualUserByHandleQuery, { handle });
                    if (user.getinduserbyusername.edges.length > 0) {
                        const user_id = user.getinduserbyusername.edges[0].node.id;
                        historyStore.push(`/individual?u=${user_id}`);
                    } else {
                        console.log('cock 1');
                        historyStore.push('/');
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


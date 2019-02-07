import React, { Component } from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import _ from 'lodash';
import { getThemeByNameQuery } from './queries/themes';
import { getOrganisationQuery, getOrganisationByIdQuery } from './queries/organisation';
import { getIndividualUserByHandleQuery } from './queries/individuals';
import { GlobalStyles } from './utils/themes/Theme';
import historyStore from './utils/stores/browserHistory';
import './App.css';


const pathsToIgnore = [
    '/password',
    '/landing',
    '/signup_org',
    '/signup_ind',
    '/login_org',
    '/login_ind',
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
                    this.props.appManager.pouchStore('authenticate', p);
                    // await this.props.appManager.pouchStore('authenticate', p);
                }
                // const domainGo = this.props.appManager.GetQueryParams('domain');
                // if (domainGo) {
                //     this.props.appManager.serveDomain = domainGo;
                //     historyStore.push('/main');
                // }
                // console.log(domainGo);
                const originTheme = await this.props.appManager.executeQuery('query', getThemeByNameQuery, { themeName: 'origin' });
                this.props.uiStore.setOriginTheme(originTheme.resultData.nodes[0]);
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
                    if (process.env.REACT_APP_ENVIRONMENT === 'production' || process.env.REACT_APP_ENVIRONMENT === 'development') {
                        window.location = `${u_string}/landing/index.html`;
                    } else {
                        window.location = `${u_string}/login_org`;
                    }
                } else {
                    if (subDomain === 'origin') {
                        if (process.env.REACT_APP_ENVIRONMENT === 'production' || process.env.REACT_APP_ENVIRONMENT === 'development') {
                            window.location.href = '/landing/index.html';
                        } else {
                            historyStore.push('/login_org');
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
            if (location.pathname === '/blog') {  // eslint-disable-line
                const b_id = this.props.appManager.GetQueryParams('b');
                this.props.appManager.blog_id = parseInt(b_id, 10);
                historyStore.push('/main');
            }
            if (location.pathname === '/admin') {  // eslint-disable-line
                const domainInfo = this.props.appManager.getDomainInfo();
                const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_ORGANISATION_NAME : domainInfo.subDomain;
                if (!domainInfo) {
                    historyStore.push('/signup_org');
                } else {
                    const o = await this.props.appManager.executeQuery('query', getOrganisationQuery, { subDomain });
                    if (o.resultData === null) {
                        const { hostname } = domainInfo;
                        const new_host = hostname.replace(`${subDomain}.`, '');
                        const u_string = `${domainInfo.protocol}//${new_host}:${domainInfo.port}`;
                        window.location = `${u_string}/`;
                    } else {
                        const auth = this.props.appManager.pouchGet('authenticate');
                        // const auth = await this.props.appManager.pouchGet('authenticate');
                        if (auth) {
                            const my_org = await this.props.appManager.executeQuery('query', getOrganisationByIdQuery, { id: auth.authenticate.resultData.organisationId });
                            if (my_org.organisationAccountById.subDomain === subDomain) {
                                console.log(my_org);
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
                                window.location = `${u_string}/signup_org`;
                            }
                        } else {
                            const { hostname } = domainInfo;
                            const new_host = hostname.replace(`${subDomain}.`, '');
                            const u_string = `${domainInfo.protocol}//${new_host}:${domainInfo.port}`;
                            window.location = `${u_string}/signup_org`;
                        }
                    }
                }
            } else {
                const l = location.pathname;        // eslint-disable-line
                if (_.findIndex(pathsToIgnore, (o) => {
                    return o === l;
                }) === -1) {
                    let handle = (location.pathname).replace('/', '');            // eslint-disable-line
                    if (handle.indexOf('individual/') > -1) {
                        handle = (location.pathname).replace('/individual/', '');            // eslint-disable-line
                    }
                    const user = await this.props.appManager.executeQuery('query', getIndividualUserByHandleQuery, { handle });
                    if (user.allIndividualUsers.nodes.length > 0) {
                        // const user_id = user.allIndividualUsers.nodes[0].id;
                        historyStore.push(`/individual/${handle}`);
                    } else {
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


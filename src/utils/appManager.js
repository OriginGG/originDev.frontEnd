/**
 * Created by stefan on 7/10/17.
 *
 * This is a the app manager singleton, it will be used for global functions, and global variable store.
 * It's a static singleton, that is nothing more than a class store
 * Mobx will handle component to component communication via observables.
 */
import ApolloClient from 'apollo-client';
// import PouchDB from 'pouchdb';
import axios from 'axios';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { toast } from 'react-toastify';
import store from 'store';


const jwt = require('jsonwebtoken');

let app_manager_instance = null;

class AppManager {
    constructor() {
        if (!app_manager_instance) {
            app_manager_instance = this;
            this.apolloClient = null;
            this.authToken = '';
            this.logged_in = false;
            this.serveDomain = null;
            this.admin_logged_in = false;
            // this.localDB = new PouchDB('user', { adapter: 'idb', revs_limit: 1, auto_compaction: true });
        }

        return this.instance;
    }
    logError = e => {
        console.error(e);
    };
    networkError = () => {
        toast.error("Error loading content, are you sure you're connected to the Internet?", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 5000
        });
    }
    log = e => {
        console.log(e);
    };
    convertYoutubeURL = (url) => {
        if (url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;       // eslint-disable-line
            const match = url.match(regExp);
            if (match && match[2].length === 11) {
                return `https://www.youtube.com/embed/${match[2]}`;
            }
        }
        return null;
    }
    convertTwitchURL = (url) => {
        if (url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;       // eslint-disable-line
            const match = url.match(regExp);
            if (match && match[2].length === 11) {
                return `https://www.youtube.com/embed/${match[2]}`;
            }
        }
        return null;
    }
    pouchStore = (_id, payload) => {
        store.set(_id, payload);
        // const doc = await this.pouchGet(_id);
        // let new_doc;
        // if (doc === null) {
        //     new_doc = Object.assign(payload, { _id });
        // } else {
        //     new_doc = Object.assign(doc, payload);
        // }
        // return this.localDB.put(new_doc);
    }
    pouchGet = (_id) => {
        return store.get(_id);
        // try {
        //     return await this.localDB.get(_id);
        // } catch (e) {
        //     return null;
        // }
    }
    pouchDelete = (_id) => {
        store.remove(_id);
        // try {
            // const doc = await this.localDB.get(_id);
            // return await this.localDB.remove(doc);
        // } catch (e) {
            // return null;
        // }
    }
    getDomainInfo = () => {
        const regex = /[.:]/g;
        const { hostname, port, protocol } = window.location;
        console.log(`${hostname}, ${port}, ${protocol}`);
        const url_string = `${hostname}${(port === 443 || port === 80 || port === '') ? '' : `:${port}`}`;
        console.log(`urlstring = ${url_string}`);
        const spString = url_string.split(regex);
        let subDomain;
        if (spString.length === 3) {
            subDomain = spString[0];            // eslint-disable-line
        } else {
            subDomain = null;
        }
        if (this.serveDomain) {
            subDomain = this.serveDomain;
        }
        return {
            hostname,
            protocol,
            port,
            subDomain
        };
    }
    decodeJWT = token => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    encodeJWT = o => {
        return jwt.sign(o, 'bbo9Q4jsIkfQ1gkpolQAKLXO4WZ-s3SEcvo3gHwfxCEM_IBSisDWzlwcmDKjVfH0');
    }
    getDomainToken = () => {
        return new Promise((resolve, reject) => {
            let h = window.location.hostname;
            if (h.indexOf('www.') === 0) {
                h = window.location.hostname.replace('www.', '');
            }
            const full_url = `${process.env.REACT_APP_API_SERVER}/domain/get_domain_txt_record?host=${h}`;
            axios.get(full_url).then((x) => {
                resolve(x.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    GetQueryParams = name => {
        const url = window.location.href;
        const new_name = name.replace(/[[\]]/g, '\\$&');
        const regex = new RegExp(`[?&]${new_name}(=([^&#]*)|&|#|$)`);
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    createApolloClient = () => {
        if (this.apolloClient === null) {
            const httpLink = createHttpLink({
                uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
            });
            const middlewareLink = new ApolloLink((operation, forward) => {
                const { authToken } = this;
                operation.setContext({
                    headers: {
                        authorization: `Bearer ${authToken}`
                    }
                });
                return forward(operation);
            });
            const link = middlewareLink.concat(httpLink);
            this.apolloClient = new ApolloClient({
                link: httpLink,
                cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
            });
            this.apolloClientAuth = new ApolloClient({
                link,
                cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
            });
        }
        return this.apolloClient;
    };

    executeQueryAuth = async (type, query, payload) => {
        let p = {};
        if (payload !== undefined) {
            p = payload;
        }
        try {
            return this.executeApolloQuery(type, query, p, this.apolloClientAuth);
        } catch (err) {
            throw err;
        }
    }
    executeQuery = async (type, query, payload) => {
        let p = {};
        if (payload !== undefined) {
            p = payload;
        }
        try {
            return this.executeApolloQuery(type, query, p, this.apolloClient);
        } catch (err) {
            throw err;
        }
    }

    executeApolloQuery = async (type, query, payload, client) => {
        return new Promise(async (resolve, reject) => {
            if (type === 'mutation') {
                try {
                    const data = await client
                        .mutate({
                            mutation: query,
                            variables: payload
                        });
                    resolve(data.data);
                } catch (err) {
                    reject(new Error('Network Error'));
                }
            } else {
                try {
                    const data = await client
                        .query({
                            query,
                            variables: payload,
                            fetchPolicy: 'network-only'
                        });
                    resolve(data.data);
                } catch (err) {
                    reject(new Error('Network Error'));
                }
            }
        });
    }
}

const _am = new AppManager();

export default _am;

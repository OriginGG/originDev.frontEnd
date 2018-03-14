/**
 * Created by stefan on 7/10/17.
 *
 * This is a the app manager singleton, it will be used for global functions, and global variable store.
 * It's a static singleton, that is nothing more than a class store
 * Mobx will handle component to component communication via observables.
 */
import ApolloClient from 'apollo-client';
import PouchDB from 'pouchdb';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

let app_manager_instance = null;

class AppManager {
    constructor() {
        if (!app_manager_instance) {
            app_manager_instance = this;
            this.apolloClient = null;
            this.authToken = '';
            this.localDB = new PouchDB('user', { revs_limit: 1, auto_compaction: true });
        }

        return this.instance;
    }
    logError = e => {
        console.error(e);
    };

    log = e => {
        console.log(e);
    };
    pouchStore = async (_id, payload) => {
        const doc = await this.pouchGet(_id);
        let new_doc;
        if (doc === null) {
            new_doc = Object.assign(payload, { _id });
        } else {
            new_doc = Object.assign(doc, payload);
        }
        return this.localDB.put(new_doc);
    }
    pouchGet = async (_id) => {
        try {
            return await this.localDB.get(_id);
        } catch (e) {
            return null;
        }
    }
    getDomainInfo = () => {
        const regex = /[.:]/g;
        const { hostname, port, protocol } = window.location;
        const url_string = `${hostname}${(port === 443 || port === 80) ? '' : `:${port}`}`;
        const spString = url_string.split(regex);
        let subDomain;
        if (spString.length === 3) {
            subDomain = spString[0];            // eslint-disable-line
        } else {
            subDomain = null;
        }
        return {
            hostname,
            protocol,
            port,
            subDomain
        };
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
        return this.executeApolloQuery(type, query, p, this.apolloClientAuth);
    }
    executeQuery = async (type, query, payload) => {
        let p = {};
        if (payload !== undefined) {
            p = payload;
        }
        return this.executeApolloQuery(type, query, p, this.apolloClient);
    }

    executeApolloQuery = async (type, query, payload, client) => {
        return new Promise(async (resolve) => {
            if (type === 'mutation') {
                const data = await client
                    .mutate({
                        mutation: query,
                        variables: payload
                    });
                resolve(data.data);
            } else {
                const data = await client
                    .query({
                        query,
                        variables: payload,
                        fetchPolicy: 'network-only'
                    });
                resolve(data.data);
            }
        });
    }
}

const _am = new AppManager();

export default _am;

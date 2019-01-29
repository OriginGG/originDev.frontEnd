import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Provider } from 'mobx-react';
import { ApolloProvider } from 'react-apollo';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import TagManager from 'react-gtm-module';
import historyStore from './utils/stores/browserHistory';
import uiStore from './utils/stores/uiStore';
import './index.css';
import App from './App';
import appManager from './utils/appManager';
// import registerServiceWorker from './registerServiceWorker';
import { GlobalTheme } from './utils/themes/Theme';

const tagManagerArgs = {
    gtmId: 'GTM-WV9WPCK'
};

export const initGA = () => {
    ReactGA.initialize('UA-119536253-1');
};
export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
};

const h = appManager.getDomainInfo();
if (h.subDomain && h.subDomain.toLowerCase() === 'www') {
    const dm = h.hostname.substring(4, h.hostname.length);
    const redirect_url = `${h.protocol}//${dm}:${h.port}${h.pathname}`;
    window.location = redirect_url;
}

initGA();
logPageView();
TagManager.initialize(tagManagerArgs);

require('default-passive-events');

const stores = {
    appManager,
    uiStore,
};

// const ref = document.referrer;
// console.log(`referred from:${ref}`);
appManager.createApolloClient();


ReactDOM.render(
    <Router history={historyStore}>
        <ThemeProvider theme={GlobalTheme}>
            <ApolloProvider client={appManager.apolloClient}>
                <Provider {...stores}>
                    <App />

                </Provider>
            </ApolloProvider>
        </ThemeProvider>

    </Router>,
    document.getElementById('root')
);
// registerServiceWorker();

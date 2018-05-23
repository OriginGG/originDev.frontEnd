import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Provider } from 'mobx-react';
import { ApolloProvider } from 'react-apollo';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import historyStore from './utils/stores/browserHistory';
import uiStore from './utils/stores/uiStore';
import './index.css';
import App from './App';
import appManager from './utils/appManager';
import registerServiceWorker from './registerServiceWorker';
import { GlobalTheme } from './utils/themes/Theme';

export const initGA = () => {
    console.log('Google Analytics Starts!');
    ReactGA.initialize('UA-119536253-1');
  };
export const logPageView = () => {
    console.log({ page: window.location.pathname });
    console.log(window.location.pathname);
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  };

require('default-passive-events');

const stores = {
    appManager,
    uiStore,
};

const ref = document.referrer;
console.log(`referred from:${ref}`);
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
registerServiceWorker();

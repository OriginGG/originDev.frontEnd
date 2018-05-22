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


require('default-passive-events');


export const initGA = () => {
    console.log('initGA');
    ReactGA.initialize('UA-119536253-1');
  };

export const logPageView = () => {
    console.log('logPageview');
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  };


const stores = {
    appManager,
    uiStore,
};

const ref = document.referrer;
console.log(`referred from:${ref}`);
initGA();
logPageView();
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

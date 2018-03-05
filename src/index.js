import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { ApolloProvider } from 'react-apollo';
import { Router } from 'react-router-dom';
import historyStore from './utils/stores/browserHistory';
import uiStore from './utils/stores/uiStore';
import './index.css';
import App from './App';
import appManager from './utils/appManager';
import registerServiceWorker from './registerServiceWorker';

const stores = {
    appManager,
    uiStore,
};

appManager.createApolloClient();

ReactDOM.render(
    <Router history={historyStore}>
        <ApolloProvider client={appManager.apolloClient}>
            <Provider {...stores}>
                <App />
            </Provider>
        </ApolloProvider>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();

import React, { Component } from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import { authenticateQuery } from './queries/login';
import { getOrganisationQuery } from './queries/organisation';

import './App.css';

class App extends Component {
    componentWillMount = async () => {
        // pouchTest
        const authPayload = await this.props.appManager.executeQuery('mutation', authenticateQuery);
        await this.props.appManager.pouchStore('authenticate', authPayload);
        // const res = await appManager.pouchGet('authenticate');
        const domainInfo = this.props.appManager.getDomainInfo();
        const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_THEME_NAME : domainInfo.subDomain;
        const o = await this.props.appManager.executeQuery('query', getOrganisationQuery, { subDomain });
        if (o.resultData === null) {
            console.log('sub domain does not exist!');
        } else {
            this.props.uiStore.setOrganisation(o.resultData);
        }
    };
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
            </div>
        );
    }
}
App.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(App);


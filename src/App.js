import React, { Component } from 'react';
import appManager from './utils/appManager';
import logo from './logo.svg';
import { authenticateQuery } from './queries/login';

import './App.css';

class App extends Component {
    componentWillMount = async () => {
        // pouchTest
        const p = await appManager.executeQuery('mutation', authenticateQuery);
        await appManager.pouchStore('authenticate', p);
        const res = await appManager.pouchGet('authenticate');
        console.log(res);
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

export default App;

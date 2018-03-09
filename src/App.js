import React, { Component } from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Route } from 'react-router-dom';

// import { authenticateQuery } from './queries/login';
import SignupPageController from './components/controllers/Login/SignupPageController';
import OrganizationPageController from './components/controllers/Origin/OrganizationPageController';
import { GlobalStyles } from './utils/themes/Theme';
import historyStore from './utils/stores/browserHistory';
import './App.css';


class App extends Component {
    componentWillMount = async () => {
        // pouchTest
        const domainInfo = this.props.appManager.getDomainInfo();
        const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_THEME_NAME : domainInfo.subDomain;
        const auth = await this.props.appManager.pouchGet('authenticate');
        if (auth && auth.authenticate.resultData.organisation === subDomain) {
            // we are already logged in, and have same organisation
            historyStore.push('/main');
            console.log('already logged in');
        } else {
            // either we're not logged in, or we are trying to log into a different sub-domain
            historyStore.push('/signup');
        }
        //          // are we authenticated
        // const authPayload = await this.props.appManager.executeQuery('mutation', authenticateQuery);
        // await this.props.appManager.pouchStore('authenticate', authPayload);
        // // const res = await appManager.pouchGet('authenticate');
        // const domainInfo = this.props.appManager.getDomainInfo();
        // const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_THEME_NAME : domainInfo.subDomain;
        // const o = await this.props.appManager.executeQuery('query', getOrganisationQuery, { subDomain });
        // if (o.resultData === null) {
        //     console.log('sub domain does not exist!');
        // } else {
        //     this.props.uiStore.setOrganisation(o.resultData);
        // }
        // this.setState({ visible: true });
    };
    render() {
        return (
            <div>
                <Route exact path="/signup" component={SignupPageController} />
                <Route exact path="/main" component={OrganizationPageController} />
            </div>
        );
    }
}
App.propTypes = {
    // uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(App));


import React, { Component } from 'react';
import { inject } from 'mobx-react';
import injectSheet from 'react-jss';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppController from './AppController';
// import SignupPageController from './components/controllers/Login/SignupPageController';
import PasswordPageController from './components/controllers/Login/PasswordPageController';
// complete signup
import NewSignupPageController from './components/controllers/Login/NewSignupPageController';
import NewSignupIndividualPageController from './components/controllers/Login/NewSignupIndividualPageController';
import OrganizationPageController from './components/controllers/Main/OrganizationPageController';
import AdminPageController from './components/controllers/Admin/AdminController';
import IndividualPageController from './components/controllers/Individuals/IndividualPageController';
import { GlobalStyles } from './utils/themes/Theme';
import './App.css';
import CreateSubDomainController from './components/controllers/Login/CreateSubDomainController';
// import OriginLandingPageController from './components/controllers/Login/OriginLandingPageController';
import { SignupInd, SignupOrg, LoginInd, LoginOrg } from './components/controllers/Login/CredentialsController';
// Test

const reload = () => window.location.reload();


class App extends Component {
    render() {
        return (
            <div>
                {/* {process.env.REACT_APP_ENVIRONMENT === 'production' ? <FullStory org="EBQW0" /> : console.log(`Fullstory only works in production, your current enviroment is ${process.env.REACT_APP_ENVIRONMENT}`)} */}
                <Route exact path="/" component={AppController} />
                <Route exact path="/signup_org" component={SignupOrg} />
                <Route exact path="/signup_ind" component={SignupInd} />
                <Route exact path="/login_org" component={LoginOrg} />
                <Route exact path="/login_ind" component={LoginInd} />
                <Route exact path="/new_signup" component={NewSignupPageController} />
                <Route exact path="/password" component={PasswordPageController} />
                <Route exact path="/new_signup_ind" component={NewSignupIndividualPageController} />
                <Route exact path="/main" component={OrganizationPageController} />
                <Route exact path="/ind_invite" component={OrganizationPageController} />
                <Route exact path="/individual" component={IndividualPageController} />
                <Route exact path="/individual/*" component={IndividualPageController} />
                <Route exact path="/admin" component={AppController} />
                <Route exact path="/admin_page" component={AdminPageController} />
                <Route exact path="/createsubdomain" component={CreateSubDomainController} />
                <Route exact path="/blog" component={AppController} />
                <Route path="/landing" onEnter={reload} />
                <Route path="/landing/index/html" onEnter={reload} />
                <Route path="*" component={AppController} />
                <ToastContainer autoClose={2500} />
            </div>
        );
    }
}

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(App));


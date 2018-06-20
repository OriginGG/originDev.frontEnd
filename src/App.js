import React, { Component } from 'react';
import { inject } from 'mobx-react';
import injectSheet from 'react-jss';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import { authenticateQuery } from './queries/login';
import AppController from './AppController';
import SignupChoiceController from './components/controllers/Login/SignupChoiceController';
import SignupPageController from './components/controllers/Login/SignupPageController';
import SignupIndividualController from './components/controllers/Login/SignupIndividualController';
import NewSignupPageController from './components/controllers/Login/NewSignupPageController';
import NewSignupIndividualPageController from './components/controllers/Login/NewSignupIndividualPageController';
import OrganizationPageController from './components/controllers/Main/OrganizationPageController';
import AdminPageController from './components/controllers/Admin/AdminController';
import IndividualPageController from './components/controllers/Individuals/IndividualPageController';
import { GlobalStyles } from './utils/themes/Theme';
import './App.css';
import CreateSubDomainController from './components/controllers/Login/CreateSubDomainController';
// import OriginLandingPageController from './components/controllers/Login/OriginLandingPageController';
// Test

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={AppController} />
                <Route exact path="/signup" component={SignupChoiceController} />
                <Route exact path="/signup_org" component={SignupPageController} />
                <Route exact path="/signup_ind" component={SignupIndividualController} />
                <Route exact path="/new_signup" component={NewSignupPageController} />
                <Route exact path="/new_signup_ind" component={NewSignupIndividualPageController} />
                <Route exact path="/main" component={OrganizationPageController} />
                <Route exact path="/ind_invite" component={OrganizationPageController} />
                <Route exact path="/individual" component={IndividualPageController} />
                <Route exact path="/admin" component={AppController} />
                <Route exact path="/admin_page" component={AdminPageController} />
                <Route exact path="/createsubdomain" component={CreateSubDomainController} />
                <Route path="*" component={AppController} />
                <ToastContainer autoClose={2500} />
            </div>
        );
    }
}

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(App));


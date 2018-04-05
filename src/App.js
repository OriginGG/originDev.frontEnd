import React, { Component } from 'react';
import { inject } from 'mobx-react';
import injectSheet from 'react-jss';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import { authenticateQuery } from './queries/login';
import AppController from './AppController';
import SignupPageController from './components/controllers/Login/SignupPageController';
import NewSignupPageController from './components/controllers/Login/NewSignupPageController';
import OrganizationPageController from './components/controllers/Main/OrganizationPageController';
import AdminPageController from './components/controllers/Admin/AdminController';
import { GlobalStyles } from './utils/themes/Theme';
import './App.css';
import CreateSubDomainController from './components/controllers/Login/CreateSubDomainController';
// import OriginLandingPageController from './components/controllers/Login/OriginLandingPageController';


class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={AppController} />
                <Route exact path="/signup" component={SignupPageController} />
                <Route exact path="/new_signup" component={NewSignupPageController} />
                <Route exact path="/main" component={OrganizationPageController} />
                <Route exact path="/admin" component={AppController} />
                <Route exact path="/admin_page" component={AdminPageController} />
                <Route exact path="/createsubdomain" component={CreateSubDomainController} />
                <ToastContainer autoClose={2500} />
            </div>
        );
    }
}

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(App));


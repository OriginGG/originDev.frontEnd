import React, { Component, lazy, Suspense } from 'react';
import { inject } from 'mobx-react';
import injectSheet from 'react-jss';
import LogRocket from 'logrocket';
import FullStory from 'react-fullstory';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import AppController from './AppController';
// import SignupPageController from './components/controllers/Login/SignupPageController';
// complete signup
import NewSignupPageController from './components/controllers/Login/NewSignupPageController';
import NewSignupIndividualPageController from './components/controllers/Login/NewSignupIndividualPageController';
// import OrganizationPageController from './components/controllers/Main/OrganizationPageController';
// import AdminPageController from './components/controllers/Admin/AdminController';
// import IndividualPageController from './components/controllers/Individuals/IndividualPageController';
import { GlobalStyles } from './utils/themes/Theme';
import './App.css';
// import CreateSubDomainController from './components/controllers/Login/CreateSubDomainController';
// import OriginLandingPageController from './components/controllers/Login/OriginLandingPageController';
import { SignupInd, SignupOrg, LoginInd, LoginOrg, LoginOrgUpdatePayment } from './components/controllers/Login/CredentialsController';
// import PaywallController from './components/controllers/Login/PaywallController';
// Test


const reload = () => window.location.reload();

const OrganizationPageControllerComponent = lazy(() => import('./components/controllers/Main/OrganizationPageController'));
function OrganizationPageController(props) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<OrganizationPageControllerComponent {...props} />
		</Suspense>
	);
}
function LogRocketRender() {
	LogRocket.init('gbiu7l/origingg');
	console.log('log rocket showing');
}
LogRocketRender();


const IndividualPageControllerComponent = lazy(() => import('./components/controllers/Individuals/IndividualPageController'));
function IndividualPageController(props) {
	return (
		<div>
		{process.env.REACT_APP_ENVIRONMENT === 'production' ? <FullStory org="EBQW0" /> : console.log(`Fullstory only works in production, your current enviroment is ${process.env.REACT_APP_ENVIRONMENT}`)}
		{console.log('react fullstory is rendering')}
		<Suspense fallback={<div />}>
			<IndividualPageControllerComponent {...props} />
		</Suspense>
		</div>
	);
}

const PasswordPageControllerComponent = lazy(() => import('./components/controllers/Login/PasswordPageController'));
function PasswordPageController(props) {
	return (
		<Suspense fallback={<div />}>
			<PasswordPageControllerComponent {...props} />
		</Suspense>
	);
}

const AdminPageControllerComponent = lazy(() => import('./components/controllers/Admin/AdminController'));
function AdminPageController(props) {
	return (
		<div>
		<Suspense fallback={<div />}>
			<AdminPageControllerComponent {...props} />
		</Suspense>
		{process.env.REACT_APP_ENVIRONMENT === 'production' ? <FullStory org="EBQW0" /> : console.log(`Fullstory only works in production, your current enviroment is ${process.env.REACT_APP_ENVIRONMENT}`)}
		{console.log('react fullstory is rendering')}
		</div>
	);
}

const PaywallControllerComponent = lazy(() => import('./components/controllers/Login/PaywallController'));
function PaywallController(props) {
	return (
		<div>
		{process.env.REACT_APP_ENVIRONMENT === 'production' ? <FullStory org="EBQW0" /> : console.log(`Fullstory only works in production, your current enviroment is ${process.env.REACT_APP_ENVIRONMENT}`)}
		{console.log('react fullstory is rendering')}
		<Suspense fallback={<div />}>
			<PaywallControllerComponent {...props} />
		</Suspense>
		</div>
	);
}
const AppControllerComponent = lazy(() => import('./AppController'));
function AppController(props) {
	return (
		<Suspense fallback={<div />}>
			<AppControllerComponent {...props} />
		</Suspense>
	);
}

const CreateSubDomainControllerComponent = lazy(() => import('./components/controllers/Login/CreateSubDomainController'));
function CreateSubDomainController(props) {
	return (
		<div>
		{process.env.REACT_APP_ENVIRONMENT === 'production' ? <FullStory org="EBQW0" /> : console.log(`Fullstory only works in production, your current enviroment is ${process.env.REACT_APP_ENVIRONMENT}`)}
		{console.log('react fullstory is rendering')}
		<Suspense fallback={<div />}>
			<CreateSubDomainControllerComponent {...props} />
		</Suspense>
		</div>
	);
}

class App extends Component {
	render() {
		return (
			<div>
				{console.log(process.env.REACT_APP_API_SERVER)}
				<Route exact path="/" component={AppController} />
				<Route exact path="/signup_org" component={SignupOrg} />
				<Route exact path="/signup_ind" component={SignupInd} />
				<Route exact path="/login_org" component={LoginOrg} />
				<Route exact path="/login_ind" component={LoginInd} />
				<Route exact path="/update_payment" component={LoginOrgUpdatePayment} />
				<Route exact path="/new_signup" component={NewSignupPageController} />
				<Route exact path="/password" component={PasswordPageController} />
				<Route exact path="/new_signup_ind" component={NewSignupIndividualPageController} />
				<Route exact path="/main" component={OrganizationPageController} />
				<Route exact path="/ind_invite" component={OrganizationPageController} />
				<Route exact path="/individual" component={IndividualPageController} />
				<Route exact path="/individual/*" component={IndividualPageController} />
				<Route exact path="/admin" component={AppController} />
				<Route exact path="/admin_page" component={AdminPageController} />
				<Route exact path="/paywall" component={PaywallController} />
				<Route exact path="/go_paywall" component={AppController} />
				<Route exact path="/createsubdomain" component={CreateSubDomainController} />
				<Route exact path="/blog" component={AppController} />
				<Route path="/landing" onEnter={reload} />
				<Route path="/landing/index/html" onEnter={reload} />
				<Route
					path="*"
					component={() => {
						return <AppController ignore_routes={true} />;
					}}
				/>
				<ToastContainer autoClose={2500} />
			</div>
		);
	}
}

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(App));

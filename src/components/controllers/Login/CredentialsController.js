import React, { Component } from 'react';
import { ThemeProvider } from 'react-jss';
// import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import FullStory from 'react-fullstory';
import { Header } from 'semantic-ui-react/dist/commonjs';
// import { GlobalStyles } from 'Theme/Theme';
import appManager from '../../../utils/appManager';
import CredentialsComponentRender from '../../render_components/signup/CredentialsComponentRender';
import logoTop from '../../../assets/images/logo-top.png';
import uiStore from '../../../utils/stores/uiStore';
import SignupControllerOrg from './SignupControllerOrg';
import SignupControllerInd from './SignupControllerInd';
import LoginControllerOrg from './LoginControllerOrg';
import LoginControllerInd from './LoginControllerInd';


const HeaderOrg = <div style={{ display: 'inline' }}><img alt="" src={logoTop} /><Header as="h1" style={{ float: 'right', marginTop: 12 }}>ORGANIZATION</Header></div>;
const HeaderInd = <div style={{ display: 'inline' }}><img alt="" src={logoTop} /><Header as="h1" style={{ float: 'right', marginTop: 12 }}>INDIVIDUAL</Header></div>;

export class SignupOrg extends Component {
    render() {
        return (<div>
            <CredentialsController headerComponent={HeaderOrg} bodyComponent={<SignupControllerOrg />} />
        </div>);
    }
}
export class SignupInd extends Component {
    render() {
        return (<div>
            <CredentialsController headerComponent={HeaderInd} bodyComponent={<SignupControllerInd />} />
        </div>);
    }
}
export class LoginOrg extends Component {
    render() {
        return (<div>
            <CredentialsController headerComponent={HeaderOrg} bodyComponent={<LoginControllerOrg location={this.props.location} />} />
        </div>);
    }
}
export class LoginInd extends Component {
    render() {
        return (<div>
            <CredentialsController headerComponent={HeaderInd} bodyComponent={<LoginControllerInd />} />
        </div>);
    }
}

export class LoginOrgUpdatePayment extends Component {
    render() {
        return (<div>
            <CredentialsController headerComponent={HeaderOrg} bodyComponent={<LoginControllerOrg pw={true} location={this.props.location} />} />
        </div>);
    }
}


class CredentialsController extends Component {
    componentDidMount = () => {
        document.getElementById('origin_loader').style.display = 'none';
        const c = appManager.GetQueryParams('clear');
        if (c) {
            appManager.pouchDelete('authenticate');
        }
    }
    render() {
        return (
            <ThemeProvider theme={uiStore.origin_theme_data}>
                <div>
                {process.env.REACT_APP_ENVIRONMENT === 'production' ? <FullStory org="EBQW0" /> : console.log(`Fullstory only works in production, your current enviroment is ${process.env.REACT_APP_ENVIRONMENT}`)}
                     {console.log('react fullstory is rendering')}
                    <CredentialsComponentRender {...this.props} />
                </div>
            </ThemeProvider>
        );
    }
}

LoginOrg.propTypes = {
    location: PropTypes.object.isRequired,
};
LoginOrgUpdatePayment.propTypes = {
    location: PropTypes.object.isRequired,
};


export default CredentialsController;


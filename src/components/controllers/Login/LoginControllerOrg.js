import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Formik } from 'formik';
import { inject } from 'mobx-react';
import { Button } from 'semantic-ui-react/dist/commonjs';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Modal } from 'antd';
import axios from 'axios';
import { GlobalStyles } from 'Theme/Theme';
import LoginComponentRender from '../../render_components/signup/LoginComponentRender';
import { authenticateQuery } from '../../../queries/login';
import { getUserByEmailQuery } from '../../../queries/users';
import { getOrganisationByIdQuery, getOrganisationByName } from '../../../queries/organisation';
import historyStore from '../../../utils/stores/browserHistory';

const { confirm } = Modal;

// import { getOrganisationQuery } from './queries/organisation'
class LoginControllerOrg extends Component {
    state = { button_disabled: false };
    componentDidMount = () => {
        document.getElementById('origin_loader').style.display = 'none';
    }
    sendEmail = (url) => {
        return new Promise((resolve, reject) => {
            const full_url = `${process.env.REACT_APP_API_SERVER}${url}`;
            axios.get(full_url).then((x) => {
                resolve(x.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    showSendConfirm = () => {
        return new Promise(resolve => {
            confirm({
                title: 'User already pre-registered!',
                content: 'Do you want to re-send registration email?',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: () => {
                    resolve(true);
                },
                onCancel: () => {
                    resolve(false);
                }
            });
        });
    };
    handleForgotPassword = (e) => {
        e.stopPropagation();
        e.preventDefault();
        historyStore.push('/password?t=reset_org');
    }
    render() {
        return (
            <Formik
                ref={(c) => { this.formikForm = c; }}
                initialValues={{
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    userName: ''
                }}
                validate={values => {
                    let disabled = false;
                    // same as above, but feel free to move this into a class method now.
                    const errors = {};
                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (errors.password || errors.email) {
                        disabled = true;
                    }
                    if (!values.password || !values.email) {
                        disabled = true;
                    }
                    this.setState({ button_disabled: disabled });
                    return errors;
                }}
                onSubmit={async (v) => {
                    // console.log('submitting....');
                    const registered_user = await this.props.appManager.executeQuery('query', getUserByEmailQuery, { email: v.email });
                    if (registered_user.allUsers.edges.length > 0 && registered_user.allUsers.edges[0].node.authenticated === false) {
                        toast.error("You haven't completed the signup process yet. Check your email and hit the link to proceed!", {
                            position: toast.POSITION.TOP_LEFT,
                            autoClose: 5000
                        });
                        return;
                    }
                    v.email = v.email.toLowerCase();            // eslint-disable-line
                    const authPayload = await this.props.appManager.executeQuery('mutation', authenticateQuery, v);
                    if (authPayload.authenticate.resultData !== null) {
                        // console.log('submitting2....');
                        const token = authPayload.authenticate.resultData.jwtToken;
                        this.props.appManager.authToken = token;
                        const d = this.props.appManager.decodeJWT(token);
                        // console.log(`d:-${d}`);
                        this.props.uiStore.setUserID(d.id);

                        const { organisationId } = authPayload.authenticate.resultData;
                        const domainInfo = this.props.appManager.getDomainInfo();
                        // console.log(`domain info:-${domainInfo}`);
                        const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_ORGANISATION_NAME : domainInfo.subDomain;
                        // console.log(`subDomain-${subDomain}`);
                        // we might have a valid user somewhere, but is he part of this domain?
                        const payload = Buffer.from(JSON.stringify(authPayload), 'utf8').toString('hex');
                        // console.log(`payload:-${d}`);
                        const org = await this.props.appManager.executeQuery('query', getOrganisationByIdQuery, { id: organisationId });
                        const organisation = org.organisationAccountById.subDomain;
                        const named_org = await this.props.appManager.executeQuery('query', getOrganisationByName, { subdomain: organisation });
                        console.log(named_org);
                        if (subDomain === 'origin' && organisationId !== null) {
                            const u_string = `${domainInfo.protocol}//${organisation}.${domainInfo.hostname}:${domainInfo.port}?p=${payload}`;
                            window.location = u_string;
                        }
                        if (subDomain === 'origin' && !organisationId) {
                            if (authPayload.authenticate.resultData.isAdmin === false) {
                                // it's an individual users, go to ind page.
                                this.props.appManager.pouchStore('ind_authenticate', payload);
                                historyStore.push(`/individual?u=${d.id}`);
                            } else {
                                historyStore.push(`/createsubdomain?p=${payload}`);
                            }
                        }
                        if (subDomain === named_org.getorganisationbyname.edges[0].node.subDomain) {
                            // succesfully logged in store in pouch then change page.
                            this.props.appManager.pouchStore('authenticate', authPayload);
                            // await this.props.appManager.pouchStore('authenticate', authPayload);
                            historyStore.push('/admin');
                        }
                    } else {
                        // does user exist as a pre-user?
                        // const pre_user = await this.props.appManager.executeQuery('mutation', authenticatePreUserQuery, { email: v.email, password: v.password });
                        // const { jwtToken } = pre_user.preUserAuthenticate;
                        // if (jwtToken) {
                        //     debugger;
                        // }
                        toast.error(`Cannot log into ${v.email}. Check email & password is correct. Are you signed up?`, {
                            position: toast.POSITION.TOP_LEFT,
                            autoClose: 5000
                        });
                    }
                    // console.log('submitting3....');
                    // const authPayload = await this.props.appManager.executeQuery('mutation', authenticateQuery, v);
                }}
                render={({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    // isSubmitting,
                }) => (
                        <div>
                                <LoginComponentRender
                                    loginAccountButton={
                                        <Button
                                            disabled={this.state.button_disabled}
                                            className="ui fluid large"
                                            style={{
                                                color: 'white', background: 'rgb(10, 154, 180)', fontSize: 18, marginTop: 40
                                            }}>Login</Button>
                                    }
                                    forgotPasswordButton={
                                        <Button
                                            onClick={(e) => { this.handleForgotPassword(e); }}
                                            className="ui fluid large"
                                            style={{
                                                color: 'white', background: 'rgb(10, 154, 180)', fontSize: 18, marginTop: 20
                                            }}>Forgot Password?</Button>
                                    }
                                    errors={errors}
                                    touched={touched}
                                    values={values}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    handleBlur={handleBlur}
                                    handleClick={this.handleClick} />
                        </div>
                    )}
            />

        );
    }
}


LoginControllerOrg.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
};


export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(LoginControllerOrg));

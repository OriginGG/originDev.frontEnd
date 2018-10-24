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
import LoginComponentRender from '../../../render_components/signup/LoginComponentRender';
import SignupComponentRender from '../../../render_components/signup/SignupComponentRender';
import { authenticateQuery, authenticateIndividualQuery } from '../../../../queries/login';
import { createUserQuery, createIndividualUserQuery, getUserByEmailQuery, getIndividualUserByEmailQuery } from '../../../../queries/users';
import { getIndividualUserByHandleQuery } from '../../../../queries/individuals';
import { createEmailRegistrationQuery, getEmailRegistrationQuery } from '../../../../queries/registrations';
import historyStore from '../../../../utils/stores/browserHistory';

const { confirm } = Modal;

// import { getOrganisationQuery } from './queries/organisation'
class LoginController extends Component {
    state = { button_disabled: false, content_display: 'login' };
    handleClick = () => {
        const p = this.state.content_display;
        if (p === 'login') {
            this.setState({ content_display: 'signup' });
        } else {
            this.setState({ content_display: 'login' });
        }
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
        if (this.props.ind) {
            historyStore.push('/password?t=reset_ind');
        } else {
            historyStore.push('/password?t=reset_org');
        }
    }
    render() {
        let s_username_style = { display: 'none' };
        if (this.state.content_display !== 'login' && this.props.ind === true) {
            s_username_style = { display: 'inherit' };
        }
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
                    if (this.props.ind && this.state.content_display !== 'login') {
                        if (!values.userName) {
                            errors.userName = 'Required';
                        }
                        if (values.userName.indexOf(' ') > -1) {
                            errors.userName = 'No Spaces allowed!';
                        }
                    }
                    if (this.state.content_display !== 'login') {
                        if (!values.firstName) {
                            errors.firstName = 'Required';
                        }
                    }
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (this.props.ind && this.state.content_display !== 'login') {
                        if (errors.password || errors.email || errors.userName) {
                            disabled = true;
                        }
                    } else {
                        if (errors.password || errors.email) {
                            disabled = true;
                        }
                    }
                    if (this.props.ind && this.state.content_display !== 'login') {
                        if (!values.password || !values.email || !values.userName) {
                            disabled = true;
                        }
                    } else {
                        if (!values.password || !values.email) {
                            disabled = true;
                        }
                    }
                    this.setState({ button_disabled: disabled });
                    return errors;
                }}
                onSubmit={async (v) => {
                    if (this.state.content_display === 'login' && this.props.ind === true) {
                        const registered_user = await this.props.appManager.executeQuery('query', getIndividualUserByEmailQuery, { email: v.email });
                        if (registered_user.allIndividualUsers.edges.length > 0 && registered_user.allIndividualUsers.edges[0].node.authenticated === false) {
                            toast.error("You haven't completed the signup process yet. Check your email and hit the link to proceed!", {
                                position: toast.POSITION.TOP_LEFT,
                                autoClose: 5000
                            });
                            return;
                        }
                        const authPayload = await this.props.appManager.executeQuery('mutation', authenticateIndividualQuery, v);
                        const payload = Buffer.from(JSON.stringify(authPayload), 'utf8').toString('hex');
                        historyStore.push(`/individual?p=${payload}`);
                    } else {
                        if (this.state.content_display === 'login') {
                            console.log('submitting....');
                            const registered_user = await this.props.appManager.executeQuery('query', getUserByEmailQuery, { email: v.email });
                            if (registered_user.allUsers.edges.length > 0 && registered_user.allUsers.edges[0].node.authenticated === false) {
                                toast.error("You haven't completed the signup process yet. Check your email and hit the link to proceed!", {
                                    position: toast.POSITION.TOP_LEFT,
                                    autoClose: 5000
                                });
                                return;
                            }
                            const authPayload = await this.props.appManager.executeQuery('mutation', authenticateQuery, v);
                            if (authPayload.authenticate.resultData !== null) {
                                console.log('submitting2....');
                                const token = authPayload.authenticate.resultData.jwtToken;
                                debugger;
                                this.props.appManager.authToken = token;
                                const d = this.props.appManager.decodeJWT(token);
                                console.log(`d:-${d}`);
                                this.props.uiStore.setUserID(d.id);

                                const { organisation } = authPayload.authenticate.resultData;
                                const domainInfo = this.props.appManager.getDomainInfo();
                                console.log(`domain info:-${domainInfo}`);
                                const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_ORGANISATION_NAME : domainInfo.subDomain;
                                console.log(`subDomain-${subDomain}`);
                                // we might have a valid user somewhere, but is he part of this domain?
                                const payload = Buffer.from(JSON.stringify(authPayload), 'utf8').toString('hex');
                                console.log(`payload:-${d}`);

                                if (subDomain === 'origin' && organisation !== null) {
                                    const u_string = `${domainInfo.protocol}//${organisation}.${domainInfo.hostname}:${domainInfo.port}?p=${payload}`;
                                    window.location = u_string;
                                }
                                if (subDomain === 'origin' && organisation === null) {
                                    if (authPayload.authenticate.resultData.isAdmin === false) {
                                        // it's an individual users, go to ind page.
                                        historyStore.push(`/individual?p=${payload}`);
                                    } else {
                                        historyStore.push(`/createsubdomain?p=${payload}`);
                                    }
                                }
                                if (subDomain === authPayload.authenticate.resultData.organisation) {
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
                            console.log('submitting3....');
                        } else {
                            if (process.env.REACT_APP_SIGNUP_PROCESS === 'SIGNUP_FUZZY') {
                                const payload = {
                                    firstName: v.firstName,
                                    lastName: v.lastName,
                                    password: v.password,
                                    userName: v.userName,
                                    email: v.email,
                                    adminUser: !this.props.ind,
                                };


                                await this.props.appManager.executeQuery('mutation', createUserQuery, payload);
                                toast.success(`Account ${v.email} created, you can now login.`, {
                                    position: toast.POSITION.TOP_LEFT
                                });
                            } else {
                                const payload = {
                                    firstName: v.firstName,
                                    lastName: v.lastName,
                                    password: v.password,
                                    email: v.email,
                                    adminUser: !this.props.ind,
                                    authenticated: false,
                                    userName: v.userName,

                                };
                                const a = this.props.ind ? 'admin_user=false' : 'admin_user=true';
                                let registered_user;
                                // first see if user exists in normal db?
                                let ll = 0;
                                if (!this.props.ind) {
                                    registered_user = await this.props.appManager.executeQuery('query', getUserByEmailQuery, { email: v.email });
                                    if (registered_user.allUsers.edges.length > 0) {
                                        if (registered_user.allUsers.edges[0].node.authenticated === true) {
                                            ll = 1;
                                        }
                                        if (registered_user.allUsers.edges[0].node.authenticated === false) {
                                            ll = 2;
                                        }
                                    }
                                } else {
                                    registered_user = await this.props.appManager.executeQuery('query', getIndividualUserByEmailQuery, { email: v.email });
                                    if (registered_user.allIndividualUsers.edges.length > 0) {
                                        if (registered_user.allIndividualUsers.edges[0].node.authenticated === true) {
                                            ll = 1;
                                        }
                                        if (registered_user.allIndividualUsers.edges[0].node.authenticated === false) {
                                            ll = 2;
                                        }
                                    }
                                }

                                if (ll > 0) {
                                    if (ll === 1) {
                                        toast.success(`Account ${v.email} already registered. Please sign in as normal`, {
                                            position: toast.POSITION.TOP_LEFT,
                                            autoClose: 15000
                                        });
                                    } else {
                                        const f = await this.showSendConfirm();
                                        if (f) {
                                            const r = await this.props.appManager.executeQuery('query', getEmailRegistrationQuery, { email: v.email });
                                            const email_payload = r.registrationEmailByEmail.payload;
                                            const url = Buffer.from(email_payload, 'hex').toString('utf8');
                                            await this.sendEmail(url);
                                            toast.success(`Registration email re-sent to ${v.email}, please check your email for further instructions.`, {
                                                position: toast.POSITION.TOP_LEFT,
                                                autoClose: 15000
                                            });
                                        }
                                    }
                                } else {
                                    try {
                                        let pre_user;
                                        let u_id;
                                        if (this.props.ind) {
                                            // test if individual user already exists!
                                            const exists = await this.props.appManager.executeQuery('query', getIndividualUserByHandleQuery, { handle: payload.userName });
                                            if (exists.getinduserbyusername && exists.getinduserbyusername.edges.length > 0) {
                                                toast.error(`The username ${payload.userName} is unavailable/already taken, please choose another.`, {
                                                    position: toast.POSITION.TOP_LEFT,
                                                    autoClose: 5000
                                                });
                                                return;
                                            }
                                            pre_user = await this.props.appManager.executeQuery('mutation', createIndividualUserQuery, payload);
                                            u_id = pre_user.individualUserRegister.individualUser.id;
                                        } else {
                                            pre_user = await this.props.appManager.executeQuery('mutation', createUserQuery, payload);
                                            u_id = pre_user.registerUser.user.id;
                                        }
                                        const host = window.location.origin;
                                        const url = `/emails/signup?host=${host}&email=${v.email}&password=${v.password}&name=${v.firstName}&${a}&id=${u_id}&dev=false`;
                                        await this.sendEmail(url);
                                        const payload_email = Buffer.from(url, 'utf8').toString('hex');
                                        const r_email = await this.props.appManager.executeQuery('mutation', createEmailRegistrationQuery, { email: v.email, payload: payload_email });
                                        console.log(pre_user, r_email);
                                        toast.success(`Account ${v.email} registered, please check your email for further instructions.`, {
                                            position: toast.POSITION.TOP_LEFT,
                                            autoClose: 15000
                                        });
                                    } catch (err) {
                                        console.log(err);
                                    }
                                }
                            }
                        }
                        // const authPayload = await this.props.appManager.executeQuery('mutation', authenticateQuery, v);
                    }
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
                            {this.state.content_display !== 'login' &&
                                <SignupComponentRender
                                    createAccountButton={
                                        <Button
                                            disabled={this.state.button_disabled}
                                            className="ui fluid large"
                                            style={{
                                                color: 'white', background: 'rgb(10, 154, 180)', fontSize: 18, marginTop: 40
                                            }}>Create an Account</Button>
                                    }
                                    user_style={s_username_style}
                                    errors={errors}
                                    touched={touched}
                                    values={values}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    handleBlur={handleBlur}
                                    handleClick={this.handleClick} />
                            }
                            {this.state.content_display === 'login' &&
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
                            }
                        </div>
                    )}
            />

        );
    }
}


LoginController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    ind: PropTypes.bool
};

LoginController.defaultProps = {
    ind: false
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(LoginController));

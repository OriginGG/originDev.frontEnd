import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Formik } from 'formik';
import { inject } from 'mobx-react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Modal } from 'antd';
import axios from 'axios';
import { GlobalStyles } from 'Theme/Theme';
import LoginComponentRender from '../../../render_components/signup/LoginComponentRender';
import SignupComponentRender from '../../../render_components/signup/SignupComponentRender';
import { authenticateQuery } from '../../../../queries/login';
import { createUserQuery, createPreUserQuery, getUserByEmailQuery } from '../../../../queries/users';
// import { createUserQuery, createPreUserQuery, authenticatePreUserQuery } from '../../../../queries/users';
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
    render() {
        return (
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    name: ''
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
                    if (this.state.content_display === 'login') {
                        console.log('submitting....');
                        const authPayload = await this.props.appManager.executeQuery('mutation', authenticateQuery, v);
                        if (authPayload.authenticate.resultData !== null) {
                            console.log('submitting2....');
                            const token = authPayload.authenticate.resultData.jwtToken;
                            const d = this.props.appManager.decodeJWT(token);
                            console.log(`d:-${d}`);
                            this.props.uiStore.setUserID(d.id);

                            const { organisation } = authPayload.authenticate.resultData;
                            const domainInfo = this.props.appManager.getDomainInfo();
                            console.log(`domain info:-${domainInfo}`);
                            const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_THEME_NAME : domainInfo.subDomain;
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
                                await this.props.appManager.pouchStore('authenticate', authPayload);
                                historyStore.push('/main');
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
                                firstName: v.name,
                                lastName: '',
                                password: v.password,
                                email: v.email,
                                adminUser: !this.props.ind,
                            };
                            await this.props.appManager.executeQuery('mutation', createUserQuery, payload);
                            toast.success(`Account ${v.email} created, you can now login.`, {
                                position: toast.POSITION.TOP_LEFT
                            });
                        } else {
                            const payload = {
                                name: v.name,
                                password: v.password,
                                email: v.email,
                                adminUser: !this.props.ind,
                            };

                            const a = this.props.ind ? 'admin_user=false' : 'admin_user=true';

                            // first see if user exists in normal db?

                            const registered_user = await this.props.appManager.executeQuery('query', getUserByEmailQuery, { email: v.email });
                            if (registered_user.allUsers.edges.length > 0) {
                                toast.success(`Account ${v.email} already registered. Please sign in as normal`, {
                                    position: toast.POSITION.TOP_LEFT,
                                    autoClose: 15000
                                });
                            } else {
                                try {
                                    const pre_user = await this.props.appManager.executeQuery('mutation', createPreUserQuery, payload);

                                    const { jwtToken } = pre_user.preRegisterUser;
                                    const url = `/emails/signup?email=${v.email}&password=${v.password}&name=${v.name}&${a}&token=${jwtToken}&dev=false`;
                                    await this.sendEmail(url);
                                    console.log(pre_user);
                                    toast.success(`Account ${v.email} registered, please check your email for further instructions.`, {
                                        position: toast.POSITION.TOP_LEFT,
                                        autoClose: 15000
                                    });
                                } catch (err) {
                                    const { message } = err;
                                    if (message.indexOf('duplicate') > -1) {
                                        const f = await this.showSendConfirm();
                                        if (f) {
                                            toast.success(`Registration email re-sent to ${v.email}, please check your email for further instructions.`, {
                                                position: toast.POSITION.TOP_LEFT,
                                                autoClose: 15000
                                            });
                                        }
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

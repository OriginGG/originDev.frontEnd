import React, { Component } from 'react';
// import injectSheet from 'react-jss';
import { Formik } from 'formik';
import { inject } from 'mobx-react';
import { Button } from 'semantic-ui-react/dist/commonjs';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Modal } from 'antd';
import axios from 'axios';
// import { GlobalStyles } from 'Theme/Theme';
import SignupComponentRender from '../../render_components/signup/SignupComponentRender';
import { createUserQuery, createIndividualUserQuery, getIndividualUserByEmailQuery } from '../../../queries/users';
import { getIndividualUserByHandleQuery } from '../../../queries/individuals';
import { createIndEmailRegistrationQuery, getIndEmailRegistrationQuery } from '../../../queries/registrations';

const { confirm } = Modal;

// import { getOrganisationQuery } from './queries/organisation'
class SignupControllerInd extends Component {
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
    render() {
        const s_username_style = { display: 'inherit' };
        return (
            <Formik
                ref={(c) => { this.formikForm = c; }}
                initialValues={{
                    email: '',
                    password: '',
                    confirm_password: '',
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
                    if (!values.userName) {
                        errors.userName = 'Required';
                    }
                    if (values.userName.indexOf(' ') > -1) {
                        errors.userName = 'No Spaces allowed!';
                    }
                    if (values.password && values.confirm_password) {
                        if (values.password !== values.confirm_password) {
                            errors.confirm_password = 'Passwords do not match!';
                        }
                    }
                    if (!values.firstName) {
                        errors.firstName = 'Required';
                    }
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (errors.password || errors.email || errors.userName || errors.confirm_password) {
                        disabled = true;
                    }
                    if (!values.password || !values.email || !values.userName) {
                        disabled = true;
                    }
                    this.setState({ button_disabled: disabled });
                    return errors;
                }}
                onSubmit={async (v) => {
                    if (process.env.REACT_APP_SIGNUP_PROCESS === 'SIGNUP_FUZZY') {
                        const payload = {
                            firstName: v.firstName,
                            lastName: v.lastName,
                            password: v.password,
                            userName: v.userName,
                            email: v.email.toLowerCase(),
                            adminUser: false,
                        };
                        await this.props.appManager.executeQuery('mutation', createUserQuery, payload);
                        toast.success(`Account ${v.email.toLowerCase()} created, you can now login.`, {
                            position: toast.POSITION.TOP_LEFT
                        });
                    } else {
                        const payload = {
                            firstName: v.firstName,
                            lastName: v.lastName,
                            password: v.password,
                            email: v.email.toLowerCase(),
                            adminUser: false,
                            authenticated: false,
                            userName: v.userName,

                        };
                        const a = 'admin_user=false';
                        // first see if user exists in normal db?
                        let ll = 0;
                        const registered_user = await this.props.appManager.executeQuery('query', getIndividualUserByEmailQuery, { email: v.email.toLowerCase() });
                        if (registered_user.allIndividualUsers.edges.length > 0) {
                            if (registered_user.allIndividualUsers.edges[0].node.authenticated === true) {
                                ll = 1;
                            }
                            if (registered_user.allIndividualUsers.edges[0].node.authenticated === false) {
                                ll = 2;
                            }
                        }

                        if (ll > 0) {
                            if (ll === 1) {
                                toast.success(`Account ${v.email.toLowerCase()} already registered. Please sign in as normal`, {
                                    position: toast.POSITION.TOP_LEFT,
                                    autoClose: 15000
                                });
                            } else {
                                const f = await this.showSendConfirm();
                                if (f) {
                                    const r = await this.props.appManager.executeQuery('query', getIndEmailRegistrationQuery, { email: v.email.toLowerCase() });
                                    const email_payload = r.indRegistrationEmailByEmail.payload;
                                    const url = Buffer.from(email_payload, 'hex').toString('utf8');
                                    await this.sendEmail(url);
                                    toast.success(`Registration email re-sent to ${v.email.toLowerCase()}, please check your email for further instructions.`, {
                                        position: toast.POSITION.TOP_LEFT,
                                        autoClose: 15000
                                    });
                                }
                            }
                        } else {
                            try {
                                // test if individual user already exists!
                                const exists = await this.props.appManager.executeQuery('query', getIndividualUserByHandleQuery, { handle: payload.userName });
                                if (exists.allIndividualUsers.nodes.length > 0) {
                                    toast.error(`The username ${payload.userName} is unavailable/already taken, please choose another.`, {
                                        position: toast.POSITION.TOP_LEFT,
                                        autoClose: 5000
                                    });
                                    return;
                                }
                                const pre_user = await this.props.appManager.executeQuery('mutation', createIndividualUserQuery, payload);
                                const u_id = pre_user.individualUserRegister.individualUser.id;
                                const host = window.location.origin;
                                const url = `/emails/signup?host=${host}&email=${v.email.toLowerCase()}&password=${v.password}&name=${v.firstName}&${a}&id=${u_id}&dev=false`;
                                await this.sendEmail(url);
                                const payload_email = Buffer.from(url, 'utf8').toString('hex');
                                await this.props.appManager.executeQuery('mutation', createIndEmailRegistrationQuery, { email: v.email.toLowerCase(), payload: payload_email });
                                toast.success(`Account ${v.email.toLowerCase()} registered, please check your email for further instructions.`, {
                                    position: toast.POSITION.TOP_LEFT,
                                    autoClose: 15000
                                });
                            } catch (err) {
                                console.log(err);
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
                        </div>
                    )}
            />

        );
    }
}


SignupControllerInd.propTypes = {
    appManager: PropTypes.object.isRequired,
};


export default inject('uiStore', 'appManager')(SignupControllerInd);

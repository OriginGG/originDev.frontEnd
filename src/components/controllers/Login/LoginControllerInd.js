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
import LoginComponentRender from '../../render_components/signup/LoginComponentRender';
import { getIndividualUserByEmailQuery } from '../../../queries/users';
import { authenticateIndividualQuery } from '../../../queries/login';
import historyStore from '../../../utils/stores/browserHistory';

const { confirm } = Modal;

// import { getOrganisationQuery } from './queries/organisation'
class LoginControllerInd extends Component {
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
        historyStore.push('/password?t=reset_ind');
    }
    handleNeedAccount = (e) => {
        e.stopPropagation();
        e.preventDefault();
        historyStore.push('/signup_ind');
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
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)
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
                    v.email = v.email.toLowerCase();            // eslint-disable-line
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
                    if (!authPayload.authenticateIndividual.individualAuthPayload) {
                        toast.error("User doesn't exist, or password is incorrect!", {
                            position: toast.POSITION.TOP_LEFT,
                            autoClose: 5000
                        });
                        return;
                    }
                    this.props.appManager.pouchStore('ind_authenticate', payload);
                    historyStore.push(`/individual?u=${authPayload.authenticateIndividual.individualAuthPayload.userId}`);
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
                                needAccountButton={
                                    <Button
                                        onClick={(e) => { this.handleNeedAccount(e); }}
                                        className="ui fluid large"
                                        style={{
                                            color: 'white', background: 'rgb(10, 154, 180)', fontSize: 18, marginTop: 20
                                        }}>Sign Up Here</Button>
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


LoginControllerInd.propTypes = {
    appManager: PropTypes.object.isRequired,
};


export default inject('uiStore', 'appManager')(LoginControllerInd);

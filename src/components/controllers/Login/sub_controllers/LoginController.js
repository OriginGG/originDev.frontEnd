import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Formik } from 'formik';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import { GlobalStyles } from 'Theme/Theme';
import LoginComponentRender from '../../../render_components/signup/LoginComponentRender';
import SignupComponentRender from '../../../render_components/signup/SignupComponentRender';
import { authenticateQuery } from '../../../../queries/login';
import { createUserQuery } from '../../../../queries/users';
import historyStore from '../../../../utils/stores/browserHistory';

// import { getOrganisationQuery } from './queries/organisation'
class LoginController extends Component {
    state = { content_display: 'login' };

    handleClick = () => {
        const p = this.state.content_display;
        if (p === 'login') {
            this.setState({ content_display: 'signup' });
        } else {
            this.setState({ content_display: 'login' });
        }
    }

    render() {
        return (
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    name: ''
                }}
                validate={values => {
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
                                historyStore.push(`/createsubdomain?p=${payload}`);
                            }
                            if (subDomain === authPayload.authenticate.resultData.organisation) {
                                // succesfully logged in store in pouch then change page.
                                await this.props.appManager.pouchStore('authenticate', authPayload);
                                historyStore.push('/main');
                            }
                        }
                        console.log('submitting3....');
                    } else {
                        const payload = {
                            firstName: v.name,
                            lastName: '',
                            password: v.password,
                            email: v.email,
                            adminUser: true,
                        };
                        await this.props.appManager.executeQuery('mutation', createUserQuery, payload);
                        toast.success(`Account ${v.email} created, you can now login.`, {
                            position: toast.POSITION.TOP_LEFT
                        });
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
                                <SignupComponentRender errors={errors} touched={touched} values={values} handleChange={handleChange} handleSubmit={handleSubmit} handleBlur={handleBlur} handleClick={this.handleClick} />
                            }
                            {this.state.content_display === 'login' &&
                                <LoginComponentRender errors={errors} touched={touched} values={values} handleChange={handleChange} handleSubmit={handleSubmit} handleBlur={handleBlur} handleClick={this.handleClick} />
                            }
                            <ToastContainer autoClose={2500} />
                        </div>
                    )}
            />

        );
    }
}

LoginController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(LoginController));

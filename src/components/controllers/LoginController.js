import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Formik } from 'formik';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import LoginComponentRender from '../render_components/LoginComponentRender';
import SignupComponentRender from '../render_components/SignupComponentRender';
import { authenticateQuery } from '../../queries/login';
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
                }}
                validate={values => {
                    // same as above, but feel free to move this into a class method now.
                    const errors = {};
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
                    const authPayload = await this.props.appManager.executeQuery('mutation', authenticateQuery, v);
                    if (authPayload.authenticate.resultData !== null) {
                        await this.props.appManager.pouchStore('authenticate', authPayload);
                    }
                }}
                render={({
                    values,
                    // errors,
                    // touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                        <div>
                            {this.state.content_display !== 'login' &&
                                <SignupComponentRender values={values} handleChange={handleChange} handleSubmit={handleSubmit} handleBlur={handleBlur} handleClick={this.handleClick} />
                            }
                            {this.state.content_display === 'login' &&
                                <LoginComponentRender values={values} handleChange={handleChange} handleSubmit={handleSubmit} handleBlur={handleBlur} handleClick={this.handleClick} />
                            }
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                             </button>
                        </div>
                    )}
            />

        );
    }
}

LoginController.propTypes = {
    // uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(LoginController));

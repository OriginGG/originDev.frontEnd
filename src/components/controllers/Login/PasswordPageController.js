import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet, { ThemeProvider } from 'react-jss';
import { inject } from 'mobx-react';
import { Segment, Button, Input } from 'semantic-ui-react/dist/commonjs';
import { Row, Col } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GlobalStyles } from 'Theme/Theme';
import SignupPageComponentRender from '../../render_components/signup/SignupPageComponentRender';
import logoTop from '../../../assets/images/logo-top.png';
import { getIndividualUserByEmailQuery } from '../../../queries/individuals';
import { getUserByEmailQuery2 } from '../../../queries/users';
import { setPasswordOrganisationQuery, setPasswordIndividualQuery } from '../../../queries/registrations';
import historyStore from '../../../utils/stores/browserHistory';

const HeaderComp = () => {
    return (
        <div style={{ display: 'inline' }}><img alt="" src={logoTop} /></div>
    );
};

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;       // eslint-disable-line
    return re.test(String(email).toLowerCase());
};

class InputBoxEmail extends Component {
    state = { button_disabled: true, email: '' };
    handleInputChange = (e, field) => {
        const p = this.state;
        p[field] = e.target.value;
        if (validateEmail(e.target.value)) {
            p.button_disabled = false;
        } else {
            p.button_disabled = true;
        }
        this.setState(p);
    }
    render() {
        return (
            <Row>
                <Col span={12} offset={6}>
                    <div style={{ textAlign: 'center', paddingTop: 80, }}>
                        <Segment style={{
                            backgroundColor: '#00000050', padding: 16, color: 'white'
                        }}>
                            <h2 style={{ color: 'yellow' }} >Forgot Password</h2>

                            <h4>Enter email address to receive a password reset email:</h4>
                            <Input value={this.state.email} onChange={(e) => { this.handleInputChange(e, 'email'); }} style={{ width: '50%' }} placeholder="Email..." />
                            <Row>
                                <Button disabled={this.state.button_disabled} onClick={() => { this.props.handleSubmit(this.state.email); }} style={{ marginTop: 12 }} primary size="mini">SUBMIT</Button>
                            </Row>
                        </Segment>
                    </div>
                </Col>
            </Row>
        );
    }
}
class InputBoxPassword extends Component {
    state = { button_disabled: true, password: '', password_confirm: '' };
    handleInputChange = (e, field) => {
        const p = this.state;
        p[field] = e.target.value;
        this.setState(p);
        if (e.target.value.length > 3) {
            if (p.password === p.password_confirm) {
                p.button_disabled = false;
            } else {
                p.button_disabled = true;
            }
        } else {
            p.button_disabled = true;
        }
    }
    // eslint-disable-line
    render() {
        return (
            <Row>
                <Col span={12} offset={6}>
                    <div style={{ textAlign: 'center', paddingTop: 80, }}>
                        <Segment style={{
                            backgroundColor: '#00000050', padding: 16, color: 'white'
                        }}>
                            <h2 style={{ color: 'yellow' }} >Select New Password</h2>
                            <h4>Enter new password:</h4>
                            <Input value={this.state.password} onChange={(e) => { this.handleInputChange(e, 'password'); }} type="password" style={{ width: '50%' }} placeholder="Password..." />
                            <h4>Enter new password again:</h4>
                            <Input value={this.state.password_confirm} onChange={(e) => { this.handleInputChange(e, 'password_confirm'); }} type="password" style={{ width: '50%' }} placeholder="Password..." />
                            <Row>
                                <Button disabled={this.state.button_disabled} onClick={() => { this.props.handleSubmit(this.state.password); }} style={{ marginTop: 12 }} primary size="mini">SUBMIT</Button>
                            </Row>
                        </Segment>
                    </div>
                </Col>
            </Row>
        );
    }
}


class PasswordPageController extends Component {
    state = { visible: false, rsComponent: null };
    componentDidMount = () => {
        document.getElementById('origin_loader').style.display = 'none';
        const t = this.props.appManager.GetQueryParams('t');
        this.current_id = parseInt(this.props.appManager.GetQueryParams('id'), 10);
        let rsComponent = <span />;
        this.ind = false;
        switch (t) {
            case 'reset_ind': {
                this.ind = true;
                rsComponent = <InputBoxEmail handleSubmit={this.handleSubmitEmail} />;
                break;
            }
            case 'set_ind': {
                this.ind = true;
                rsComponent = <InputBoxPassword handleSubmit={this.handleSubmitPassword} />;
                break;
            }
            case 'reset_org': {
                this.ind = false;
                rsComponent = <InputBoxEmail handleSubmit={this.handleSubmitEmail} />;
                break;
            }
            case 'set_org': {
                this.ind = false;
                rsComponent = <InputBoxPassword handleSubmit={this.handleSubmitPassword} />;
                break;
            }
            default: {
                break;
            }
        }
        this.setState({ visible: true, rsComponent });
    }

    handleSubmitEmail = async (v) => {
        // find out if email exists.
        // for org or ind.
        let q = getIndividualUserByEmailQuery;
        if (!this.ind) {
            q = getUserByEmailQuery2;
        }
        const r = await this.props.appManager.executeQuery('query', q, { email: v });
        // const email_payload = r.registrationEmailByEmail.payload;
        // const url = Buffer.from(email_payload, 'hex').toString('utf8');
        // console.log(v);
        let sm = false;
        if (this.ind) {
            if (r.individualUserByEmail) {
                sm = true;
            }
        } else {
            if (r.userByEmail) {
                sm = true;
            }
        }
        if (!sm) {
            toast.error("User isn't in our database!", {
                position: toast.POSITION.TOP_LEFT
            });
        } else {
            const host = window.location.origin;
            if (this.ind) {
                const url = `/emails/reset_password_ind?id=${r.individualUserByEmail.id}&host=${host}&email=${v}`;
                await this.sendEmail(url);
            } else {
                const url = `/emails/reset_password_org?id=${r.userByEmail.id}&host=${host}&email=${v}`;
                await this.sendEmail(url);
            }
            toast.success(`Password reset email sent to ${v} - Redirecting you to login in 5 seconds`, {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 5000
            });
            setTimeout(() => {
                historyStore.push('/signup');
            }, 5000);
        }
        // console.log(r);
    }

    handleSubmitPassword = async (v) => {
        if (!this.ind) {
            await this.props.appManager.executeQuery('mutation', setPasswordOrganisationQuery, { id: this.current_id, password: v });
        } else {
            await this.props.appManager.executeQuery('mutation', setPasswordIndividualQuery, { id: this.current_id, password: v });
        }
        toast.success('Your password has been reset, redirecting you to sign-in page!', {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 5000
        });
        setTimeout(() => {
            if (!this.ind) {
                historyStore.push('/login_org');
            } else {
                historyStore.push('/login_ind');
            }
        }, 5000);
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
    render() {
        if (!this.state.visible) {
            return null;
        }
        return (
            <ThemeProvider theme={this.props.uiStore.origin_theme_data}>
                <SignupPageComponentRender headerComponent={<HeaderComp />} bodyComponent={this.state.rsComponent} />
            </ThemeProvider>
        );
    }
}

PasswordPageController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
};

InputBoxEmail.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

InputBoxPassword.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};


export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(PasswordPageController));


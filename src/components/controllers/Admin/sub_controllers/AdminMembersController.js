import React, { Component } from 'react';
import PropTypes from 'prop-types';         // eslint-disable-line
import injectSheet from 'react-jss';
import axios from 'axios';
import { Card, Input, Segment, Button, Header } from 'semantic-ui-react';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import { toast } from 'react-toastify';
import { getIndividualUserByEmailQuery } from '../../../../queries/individuals';

// import OrganizationAdminBlogComponentRender from '../../../render_components/OrganizationAdminBlogComponentRender';

class AdminMembersController extends Component {
    state = {
        visible: true,
        email: ''                           // eslint-disable-line
    };
    handleInputChange = (e, field) => {
        const p = this.state;
        p[field] = e.target.value;
        this.setState(p);
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
    handleSubmit = async () => {
        const { email } = this.state;
        const { subDomain } = this.props.uiStore.current_organisation;
        console.log(email);
        const user = await this.props.appManager.executeQuery('query', getIndividualUserByEmailQuery, {
            email
        });
        if (user.individualUserByEmail && user.individualUserByEmail.authenticated) {
            const host = window.location.origin;
            const url = `/emails/invite_ind?host=${host}&email=${email}&organisation=${subDomain}`;
            await this.sendEmail(url);
            toast.success(`Invitation e-mail sent to ${email}!`, {
                position: toast.POSITION.TOP_LEFT
            });
            // valid users.
        } else if (user.individualUserByEmail && user.individualUserByEmail.authenticated === false) {
            toast.error("This user exists, but they haven't autheticate their account yet!", {
                position: toast.POSITION.TOP_LEFT
            });
        } else if (!user.individualUserByEmail) {
            toast.error("This user hasn't signed up for an individual account yet!", {
                position: toast.POSITION.TOP_LEFT
            });
        }
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        return (
            <div style={{ height: '100vh', width: 'calc(100vw - 420px)' }}>
                <Card style={{ width: 'calc(100vw - 380px)' }}>
                    <Card.Content>
                        <Card.Header>
                            Add Members
                    </Card.Header>
                        <Card.Description>
                            <Segment>
                                <Header as="h5">Enter a valid email below, and click SUBMIT</Header>
                                <Input value={this.state.about_title} onChange={(e) => { this.handleInputChange(e, 'email'); }} style={{ width: 'calc(100vw - 478px)' }} label="Email:" placeholder="Email" />
                            </Segment>
                            <Button primary onClick={this.handleSubmit}>SUBMIT</Button>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>

        );
    }
}

AdminMembersController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    // classes: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminMembersController));


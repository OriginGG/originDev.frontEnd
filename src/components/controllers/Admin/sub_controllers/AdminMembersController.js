import React, { Component } from 'react';
import PropTypes from 'prop-types';         // eslint-disable-line
import injectSheet from 'react-jss';
import axios from 'axios';
import _ from 'lodash';
import { Modal } from 'antd';
import { Table, Image, Icon, Card, Input, Segment, Button, Header } from 'semantic-ui-react/dist/commonjs';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import { toast } from 'react-toastify';
import { getIndividualUserByHandleQuery } from '../../../../queries/individuals';
import { getOrganisationMembersQuery, deleteOrganisaionMemberQuery } from '../../../../queries/members';

const { confirm } = Modal;

// import OrganizationAdminBlogComponentRender from '../../../render_components/OrganizationAdminBlogComponentRender';

class AdminMembersController extends Component {
    state = {
        visible: false,
        disabled: false,
        members: [],
        handle: '',                         // eslint-disable-line
        email: ''                           // eslint-disable-line
    };
    componentDidMount = () => {
        this.calcMembers();
    }

    calcMembers = async () => {
        const { subDomain } = this.props.uiStore.current_organisation;
        const members = await this.props.appManager.executeQuery('query', getOrganisationMembersQuery, {
            subDomain
        });
        this.current_members = members.allOrganisationMembers.edges;
        const m_array = [];
        members.allOrganisationMembers.edges.forEach((m) => {
            m_array.push(<Table.Row>
                <Table.Cell>
                    <Header as="h4" image>
                        <Image src={m.node.individualUserByIndividalUserId.profileImageUrl} rounded size="mini" />
                        <Header.Content>
                            {m.node.individualUserByIndividalUserId.username}
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell>
                    <Icon style={{ cursor: 'pointer' }} name="trash" onClick={() => { this.deleteMember(m.node.id); }} />
                </Table.Cell>
            </Table.Row>);
        });
        this.setState({ members: m_array, visible: true });
    }

    showDeleteConfirm = () => {
        return new Promise(resolve => {
            confirm({
                title: 'Delete this Member',
                content: 'Are you sure?',
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

    deleteMember = async (id) => {
        const f = await this.showDeleteConfirm();
        if (f) {
            await this.props.appManager.executeQuery(
                'mutation', deleteOrganisaionMemberQuery,
                {
                    id
                }
            );
            toast.success('Member deleted !', {
                position: toast.POSITION.TOP_LEFT
            });
        }
        this.calcMembers();
    }
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
        const { handle } = this.state;
        this.setState({ disabled: true });
        const fnd = _.findIndex(this.current_members, m => {
            return (m.node.individualUserByIndividalUserId.username.toLowerCase() === handle.toLowerCase());
        });
        if (fnd > -1) {
            toast.error('That user is already a member of your organzation!', {
                position: toast.POSITION.TOP_LEFT
            });
            this.setState({ disabled: false });
            return;
        }
        const user = await this.props.appManager.executeQuery('query', getIndividualUserByHandleQuery, {
            handle
        });
        const { subDomain } = this.props.uiStore.current_organisation;
        // const user = await this.props.appManager.executeQuery('query', getIndividualUserByEmailQuery, {
        //     email
        // });
        if (user.allIndividualUsers.nodes.length === 0) {
            toast.error("This user hasn't signed up for an individual account yet!", {
                position: toast.POSITION.TOP_LEFT
            });
            this.setState({ disabled: false });
            return;
        }
        if (user.allIndividualUsers.nodes[0].authenticated) {
            const { email } = user.allIndividualUsers.nodes[0];
            const host = window.location.origin;
            const url = `/emails/invite_ind?host=${host}&email=${email}&organisation=${subDomain}`;
            await this.sendEmail(url);
            toast.success(`Invitation e-mail sent to ${handle}!`, {
                position: toast.POSITION.TOP_LEFT
            });
        } else {
            toast.error("This user exists, but they haven't autheticate their account yet!", {
                position: toast.POSITION.TOP_LEFT
            });
        }
        this.setState({ disabled: false });
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
                                <Header as="h5">Enter Users Handle, and click SUBMIT</Header>
                                <Header as="h5">You can send your members to https://origin.gg/signup_ind if they havent created an individual account</Header>
                                <Input value={this.state.about_title} onChange={(e) => { this.handleInputChange(e, 'handle'); }} style={{ width: 'calc(100vw - 478px)' }} label="Handle:" placeholder="Handle" />
                            </Segment>
                            <Button disabled={this.state.disabled} primary onClick={this.handleSubmit}>SUBMIT</Button>
                        </Card.Description>
                    </Card.Content>
                </Card>
                <Card>
                    <Table style={{ marginLeft: 8, marginTop: 12 }} basic="very" celled collapsing>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Current Members</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <div style={{ maxHeight: 180, overflowY: 'auto' }}>
                                {this.state.members}
                            </div>
                        </Table.Body>
                    </Table>
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


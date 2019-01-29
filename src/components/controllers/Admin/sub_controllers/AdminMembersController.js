import React, { Component } from 'react';
import PropTypes from 'prop-types';         // eslint-disable-line
import injectSheet from 'react-jss';
import axios from 'axios';
import _ from 'lodash';
import { Modal } from 'antd';
import { Table, Image, Icon, Checkbox, Card, Input, Segment, Button, Header } from 'semantic-ui-react/dist/commonjs';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import { toast } from 'react-toastify';
import { searchIndividualUsersByHandleQuery } from '../../../../queries/individuals';
import { getOrganisationMembersQuery, deleteOrganisaionMemberQuery } from '../../../../queries/members';

const { confirm } = Modal;

// import OrganizationAdminBlogComponentRender from '../../../render_components/OrganizationAdminBlogComponentRender';

const MemberCharacter = ({ user, handleCheckbox, key_index }) => {
    return <Table.Row style={{ height: 64 }}>
        <Table.Cell style={{ width: 64 }}>
            <Image style={{ marginLeft: 4 }} centered src={user.profileImageUrl} rounded size="mini" />
        </Table.Cell>
        <Table.Cell>
            {user.firstName} {user.lastName}
        </Table.Cell>
        <Table.Cell><span style={{ color: 'grey' }}>{user.username}</span></Table.Cell>
        <Table.Cell style={{ width: 96, textAlign: 'center' }}>
            <Checkbox key={`cbox_key_${key_index}`} defaultChecked={false} onChange={(e, data) => { handleCheckbox(e, data, user); }} />
        </Table.Cell>
    </Table.Row>;
};

class AdminMembersController extends Component {
    state = {
        found_members: [],                  // eslint-disable-line
        visible: false,
        disabled: true,
        found_disabled: false,
        members: [],
        handle: '',                         // eslint-disable-line
        email: ''                           // eslint-disable-line
    };
    componentDidMount = () => {
        this.calcMembers();
        this.invite_array = [];
        this.key_index = 1;
    }

    calcMembers = async () => {
        const members = await this.props.appManager.executeQuery('query', getOrganisationMembersQuery, {
            organisationId: this.props.uiStore.current_organisation.id
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
        const v = e.target.value;
        p[field] = v;
        if (field === 'handle') {
            if (v && v.length > 1) {
                p.disabled = false;
            } else {
                p.disabled = true;
            }
        }
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
    handleCheckbox = (e, data, user) => {
        if (data.checked === true) {
            this.invite_array.push(user);
        } else {
            const fnd = this.invite_array.findIndex(m => {
                return m.id === user.id;
            });
            if (fnd > -1) {
                this.invite_array.splice(fnd, 1);
            }
        }
    }
    handleSearch = async () => {
        const { handle } = this.state;
        const users = await this.props.appManager.executeQuery('query', searchIndividualUsersByHandleQuery, {
            handle
        });
        const found_members = [];
        users.allIndividualUsers.nodes.forEach(m => {
            found_members.push(<MemberCharacter key_index={this.key_index} user={m} handleCheckbox={this.handleCheckbox} />);
            this.key_index += 1;
        });
        this.setState({ found_members });           // eslint-disable-line
    }
    handleSubmit = async () => {
        let error = false;
        if (this.invite_array.length === 0) {
            toast.error('You have to selected some users to invite!', {
                position: toast.POSITION.TOP_LEFT
            });
            return;
        }
        this.setState({ found_disabled: true });
        this.invite_array.forEach(o => {
            const fnd = _.findIndex(this.current_members, m => {
                return (m.node.individualUserByIndividalUserId.username === o.username);
            });
            if (fnd > -1) {
                toast.error(`${o.username} is already a member of your organzation!`, {
                    position: toast.POSITION.TOP_LEFT
                });
                this.setState({ found_disabled: false });
                error = true;
            }
        });
        if (error) {
            return;
        }

        const { subDomain } = this.props.uiStore.current_organisation;
        // const user = await this.props.appManager.executeQuery('query', getIndividualUserByEmailQuery, {
        //     email
        // });
        this.invite_array.forEach(async o => {
            const { email } = o;
            const host = window.location.origin;
            const url = `/emails/invite_ind?host=${host}&email=${email}&organisation_id=${this.props.uiStore.current_organisation.id}&organisation_name=${subDomain}`;
            await this.sendEmail(url);
        });
        toast.success('Invitation e-mail(s) sent!', {
            position: toast.POSITION.TOP_LEFT
        });
        this.setState({ found_disabled: false, found_members: [] });
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        let found_mem = <span />;
        if (this.state.found_members.length > 0) {
            found_mem = <Card.Content>
                <Card.Header>
                    Found Members
                    </Card.Header>
                <Card.Description>
                    <div style={{ maxHeight: 220, width: '100%', overflowY: 'auto' }}>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Image</Table.HeaderCell>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Username</Table.HeaderCell>
                                    <Table.HeaderCell>Invite Y/N</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            {this.state.found_members}
                        </Table>
                        <Button disabled={this.state.found_disabled} primary onClick={this.handleSubmit}>SEND INVITE(S)</Button>
                    </div>
                </Card.Description>
            </Card.Content>;
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
                                <Header as="h5">Enter Users Handle, and click SEARCH</Header>
                                <Header as="h5">You can send your members to https://origin.gg/signup_ind if they havent created an individual account</Header>
                                <Input value={this.state.handle} onChange={(e) => { this.handleInputChange(e, 'handle'); }} style={{ width: 'calc(100vw - 478px)' }} label="Handle:" placeholder="Handle" />
                            </Segment>
                            <Button disabled={this.state.disabled} primary onClick={this.handleSearch}>SEARCH</Button>
                        </Card.Description>
                    </Card.Content>
                    {found_mem}
                </Card>
                <Card>
                    <Table style={{ marginLeft: 8, marginTop: 12 }} basic="very" celled collapsing>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Current Members</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <div style={{ height: 180, overflowY: 'auto' }}>
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

MemberCharacter.propTypes = {
    user: PropTypes.object.isRequired,
    handleCheckbox: PropTypes.func.isRequired,
    key_index: PropTypes.number.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminMembersController));


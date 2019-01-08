import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import _ from 'lodash';
import { Header, Button } from 'semantic-ui-react/dist/commonjs';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import { getOrganisationMembersQuery } from '../../../../queries/members.js';
// import { deleteContentTeamQuery, deleteContentTeamUserQuery, createContentTeamUserQuery, getContentTeamQuery, createContentTeamQuery } from '../../../../queries/ContentTeam.js';
import { deleteRosterUserQuery, createRosterUserQuery, getRosterQuery, createRosterQuery } from '../../../../queries/rosters.js';
import AdminPickListController from './AdminPickList.js';


export class ModalContentAddUser extends Component {
    state = { visible: false, source: [], target: [] }
    componentDidMount = async () => {
        const users = await this.props.appManager.executeQueryAuth('query', getOrganisationMembersQuery, { organisationId: this.props.uiStore.current_organisation.id });
        const edges = users.allOrganisationMembers.edges.slice(0);
        const s_array = [];
        this.props.users.forEach((x) => {
            const f = _.findIndex(edges, (o) => {
                return o.node.individualUserByIndividalUserId.id === x.node.individualUserByIndividualId.id;
            });
            if (f > -1) {
                edges.splice(f, 1);
            }
        });
        edges.forEach((x1) => {
            s_array.push({ node: x1.node.individualUserByIndividalUserId });
        });
        const t_array = [];
        this.props.users.forEach((p) => {
            t_array.push({ node: p.node.individualUserByIndividualId });
        });
        this.setState({
            target: t_array,
            source: s_array,
            visible: true
        });
    }
    handleOk = () => {
        this.props.handleSubmit(this.state.target);
    }
    handleCancel = () => {
        this.props.closeModal();
    }
    onChange = (s, t) => {
        this.setState({
            source: s, target: t
        });
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        return (
            <div style={{
                display: 'flex', backgroundColor: 'black', flexDirection: 'column', padding: 16, width: 600
            }} >
                <div style={{
                    paddingTop: 16, paddingBottom: 12, display: 'inherit', justifyContent: 'center', flexDirection: 'row'
                }}>
                    <Header color="blue" as="h3">Content Team</Header>

                </div>
                <div style={{
                    paddingBottom: 12, display: 'inherit', justifyContent: 'center', flexDirection: 'row'
                }}>
                    {/* <div style={{ width: 32, height: 32 }}><img style={{ width: 'inherit' }} alt="" src={currGame.image} /></div> */}
                </div>
                <div style={{
                    paddingBottom: 12, display: 'inherit', justifyContent: 'center', flexDirection: 'row'
                }}>
                    <AdminPickListController
                        source={this.state.source}
                        target={this.state.target}
                        onChange={this.onChange} />
                </div>
                <div style={{ padding: 24 }}>
                    <Button onClick={this.handleOk} primary>Ok</Button>
                    <Button onClick={this.handleCancel} style={{ float: 'right' }} secondary>Cancel</Button>
                </div>
            </div>
        );
    }
}


// Sp

const AddUserModal = (props) => {
    return (
        <Modal
            destroyOnClose
            style={{ top: 32 }}
            width="max-content"
            closable={false}
            footer={null}
            visible={props.user_modal_open}
            animationDuration={1000}
        >
            <div style={{ display: 'block' }}>
                {props.content}
            </div>
        </Modal >);
};

const AddGameModal = (props) => {
    return (
        <Modal
            style={{ top: 32 }}
            width="max-content"
            closable={false}
            footer={null}
            visible={props.game_modal_open}
            animationDuration={1000}
        >
            <div style={{ display: 'block' }}>
                {props.content}
            </div>
        </Modal >);
};


class AdminContentTeamController extends Component {
    state = {
        visible: false
    };
    componentDidMount = () => {
        this.getRosterData();
    }
    getRosterData = async () => {
        return new Promise(async (resolve) => {
            let ContentTeam_data = await this.props.appManager.executeQueryAuth('query', getRosterQuery, { rosterType: 'content_team', organisationId: this.props.uiStore.current_organisation.id });
            if (ContentTeam_data.allCombinedRosters.edges.length === 0) {
                ContentTeam_data = await this.props.appManager.executeQuery('mutation', createRosterQuery, { rosterType: 'content_team', organisationId: this.props.uiStore.current_organisation.id });
                this.current_roster_users = ContentTeam_data.createCombinedRoster.combinedRoster.combinedRosterIndividualsByRosterId.edges;
                this.current_roster = ContentTeam_data.createCombinedRoster.combinedRoster;
            } else {
                this.current_roster_users = ContentTeam_data.allCombinedRosters.edges[0].node.combinedRosterIndividualsByRosterId.edges;
                this.current_roster = ContentTeam_data.allCombinedRosters.edges[0].node;
            }
            this.setState({ visible: true });
            resolve(true);
        });
    }

    handleUserSubmit = async (t) => {
        const add_array = [];
        const delete_array = [];
        t.forEach((u) => {
            const p = _.findIndex(this.current_roster_users, (o) => {
                return o.node.individualUserByIndividualId.id === u.node.id;
            });
            if (p === -1) {
                add_array.push(u.node);
            }
        });
        this.current_roster_users.forEach((u) => {
            const p = _.findIndex(t, (o) => {
                return o.node.id === u.node.individualUserByIndividualId.id;
            });
            if (p === -1) {
                // make sure its not in add array
                const p2 = _.findIndex(add_array, (a) => {
                    return a.id === u.node.id;
                });
                if (p2 === -1) {
                    delete_array.push(u.node);
                }
            }
        });
        for (let a in add_array) {          // eslint-disable-line
            const x = add_array[a];
            await this.props.appManager.executeQuery('mutation', createRosterUserQuery, { rosterId: this.current_roster.id, individualId: x.id });         // eslint-disable-line
        }
        for (let a in delete_array) {          // eslint-disable-line
            const x = delete_array[a];
            await this.props.appManager.executeQuery('mutation', deleteRosterUserQuery, { id: x.id });         // eslint-disable-line
        }
        let f = false;
        if (add_array.length > 0 && delete_array.length === 0) {
            f = true;
            toast.success(`${add_array.length} User(s) added..`, {
                position: toast.POSITION.TOP_LEFT
            });
        }
        if (add_array.length === 0 && delete_array.length > 0) {
            f = true;
            toast.success(`${delete_array.length} User(s) removed..`, {
                position: toast.POSITION.TOP_LEFT
            });
        }
        if (add_array.length > 0 && delete_array.length > 0) {
            f = true;
            toast.success(`${add_array.length} User(s) added, and ${delete_array.length} User(s) removed...`, {
                position: toast.POSITION.TOP_LEFT
            });
        }
        if (!f) {
            toast.success('No Changes made!', {
                position: toast.POSITION.TOP_LEFT
            });
        }
        await this.getRosterData();

        // here we calculate a list of id's to add or delete..
        // first found the add id's
    }

    render() {
        if (this.state.visible === false) {
            return null;
        }
        return (
            <div style={{
                width: 'calc(100vw - 416px)'
            }}>
                <ModalContentAddUser handleSubmit={this.handleUserSubmit} users={this.current_roster_users} closeModal={this.closeUserModal} {...this.props} />
            </div>
        );
    }
}

AdminContentTeamController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
};

ModalContentAddUser.propTypes = {
    uiStore: PropTypes.object.isRequired,
    users: PropTypes.object,
    appManager: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};
ModalContentAddUser.defaultProps = {
    users: null
};
AddGameModal.propTypes = {
    game_modal_open: PropTypes.bool.isRequired,
    content: PropTypes.object.isRequired
};
AddUserModal.propTypes = {
    user_modal_open: PropTypes.bool.isRequired,
    content: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminContentTeamController));

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Header, Button } from 'semantic-ui-react/dist/commonjs';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import { getOrganisationMembersQuery } from '../../../../queries/members.js';
import { createContentTeamQuery, deleteContentTeamQuery } from '../../../../queries/content_team';
import AdminPickListController from './AdminPickList.js';

const { confirm } = Modal;

export class ModalContentAddUser extends Component {
    state = { visible: false, source: [], target: [] }
    componentDidMount = async () => {
        this.setState({ visible: false });
        const users = await this.props.appManager.executeQuery('query', getOrganisationMembersQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
        const s_array = [];
        const t_array = [];
        this.current_game_node = users.allOrganisationMembers.edges;
        users.allOrganisationMembers.edges.forEach(n => {
            if (n.node.contentTeamsByMemberId.nodes.length > 0) {
                t_array.push({ member_id: n.node.id, contentTeamsByMemberId: n.node.contentTeamsByMemberId, node: n.node.individualUserByIndividalUserId });
            } else {
                s_array.push({ member_id: n.node.id, contentTeamsByMemberId: n.node.contentTeamsByMemberId, node: n.node.individualUserByIndividalUserId });
            }
        });
        this.setState({
            target: t_array,
            source: s_array,
            visible: true
        });
    }
    handleOk = () => {
        this.props.handleSubmit(this.state.target, this.state.source);
    }
    handleCancel = () => {
        this.props.closeModal();
    }
    showDeleteConfirm = () => {
        return new Promise(resolve => {
            confirm({
                title: 'Delete this Staff Position',
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
                    <Header color="blue" as="h3">Content Team:</Header>

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


const RosterGame = (props) => {
    return (
        <div
            role="menuItem"
            tabIndex={-1}
            onClick={() => { props.handleClick(props.game, props.game_node); }}
            style={{
                cursor: 'pointer', display: 'flex', padding: 8, backgroundColor: 'aliceblue', border: '1px solid', borderColor: '#9e9ed6', borderRadius: 8
            }}>
            <p style={{
                fontSize: 14, lineHeight: '24px', color: 'black', paddingLeft: 4
            }}>{props.game.text}</p>
        </div >
    );
};

class AdminContentTeamController extends Component {
    state = {
        visible: true, my_index: 1
    };
    // getRosterData = async () => {
    //     return new Promise(async (resolve) => {
    //         const p_array = [];
    //         const staff_data = await this.props.appManager.executeQuery('query', getOrganisationMembersQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
    //         // staff_data.allStaff.edges.forEach((r, i) => {
    //         //     const { positionId } = r.node;
    //         //     const currGame = _.find(staffOptions, (o) => {
    //         //         return o.position_id === positionId;
    //         //     });
    //         //     p_array.push(<RosterGame handleClick={this.handleGameSelectClick} game_node={r.node} key={`roster_game_${i}`} game={currGame} />);
    //         // });
    //         this.current_roster_users = staff_data.allStaff.edges;
    //         this.setState({ visible: true });
    //         resolve(true);
    //     });
    // }

    handleUserSubmit = async (t, s) => {
        let added = 0;
        let removed = 0;
        for (let p = 0; p < t.length; p += 1) {
            const u = t[p];
            if (u.contentTeamsByMemberId.nodes.length === 0) {
                await this.props.appManager.executeQuery('mutation', createContentTeamQuery, { memberId: u.member_id });         // eslint-disable-line
                added += 1;
            }
        }
        for (let f = 0; f < s.length; f += 1) {
            const u = s[f];
            if (u.contentTeamsByMemberId.nodes.length > 0) {
                await this.props.appManager.executeQuery('mutation', deleteContentTeamQuery, { id: u.contentTeamsByMemberId.nodes[0].id });         // eslint-disable-line
                removed += 1;
            }
        }
        if (added > 0 && removed === 0) {
            toast.success(`${added} User(s) added..`, {
                position: toast.POSITION.TOP_LEFT
            });
        }
        if (added === 0 && removed > 0) {
            toast.success(`${removed} User(s) removed..`, {
                position: toast.POSITION.TOP_LEFT
            });
        }
        if (added > 0 && removed > 0) {
            toast.success(`${added} User(s) added, and ${removed} User(s) removed...`, {
                position: toast.POSITION.TOP_LEFT
            });
        }
        let k = this.state.my_index;
        k += 1;
        this.setState({ my_index: k });

        // await this.getRosterData();
        // this.closeUserModal();

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
                <ModalContentAddUser key={this.state.my_index} handleSubmit={this.handleUserSubmit} game_node={this.current_game_node} closeModal={this.closeUserModal} {...this.props} />
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
    appManager: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};
AddGameModal.propTypes = {
    game_modal_open: PropTypes.bool.isRequired,
    content: PropTypes.object.isRequired
};
AddUserModal.propTypes = {
    user_modal_open: PropTypes.bool.isRequired,
    content: PropTypes.object.isRequired
};
RosterGame.propTypes = {
    game: PropTypes.object.isRequired,
    game_node: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminContentTeamController));

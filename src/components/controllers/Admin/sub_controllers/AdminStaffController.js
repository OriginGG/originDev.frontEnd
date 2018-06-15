import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import _ from 'lodash';
import { Dropdown, Header, Button } from 'semantic-ui-react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import { getAllIndividualUsersQuery } from '../../../../queries/users.js';
import { deleteStaffQuery, deleteStaffUserQuery, createStaffUserQuery, getStaffQuery, createStaffQuery } from '../../../../queries/staff.js';
import OrganizationAdminStaffComponentRender from '../../../render_components/admin/OrganizationAdminStaffComponentRender';
import { staffOptions } from './data/AllPositions.js';
import AdminPickListController from './AdminPickList';

const { confirm } = Modal;

export class ModalContentAddUser extends Component {
    state = { visible: false, source: [], target: [] }
    componentDidMount = async () => {
        const users = await this.props.appManager.executeQuery('query', getAllIndividualUsersQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
        const edges = users.allIndividualUsers.edges.slice(0);
        this.props.game_node.staffIndividualsByStaffId.edges.forEach((x) => {
            const f = _.findIndex(edges, (o) => {
                return o.node.id === x.node.individualUserByIndividualId.id;
            });
            if (f > -1) {
                edges.splice(f, 1);
            }
        });
        const t_array = [];
        this.props.game_node.staffIndividualsByStaffId.edges.forEach((p) => {
            t_array.push({ node: p.node.individualUserByIndividualId });
        });
        this.setState({
            target: t_array,
            source: edges,
            visible: true
        });
    }
    handleOk = () => {
        this.props.handleSubmit(this.state.target);
    }
    handleCancel = () => {
        this.props.closeModal();
    }
    onChange = (event) => {
        this.setState({
            source: event.source,
            target: event.target
        });
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
    handleDeleteStaff = async () => {
        const p = this.props.game_node;
        console.log(p);
        const action = await this.showDeleteConfirm();
        if (action) {
            await this.props.appManager.executeQuery(
                'mutation', deleteStaffQuery,
                {
                    id: p.id
                }
            );
            toast.success('Staff position deleted !', {
                position: toast.POSITION.TOP_LEFT
            });
            this.props.closeModal();
        }
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        const currGame = _.find(staffOptions, (o) => {
            return o.position_id === this.props.game_node.positionId;
        });
        return (
            <div style={{
                display: 'flex', backgroundColor: 'black', flexDirection: 'column', padding: 16, width: 600
            }} >
                <div style={{
                    paddingTop: 16, paddingBottom: 12, display: 'inherit', justifyContent: 'center', flexDirection: 'row'
                }}>
                    <Header color="blue" as="h3">Staff Position:</Header>

                </div>
                <div style={{
                    paddingBottom: 12, display: 'inherit', justifyContent: 'center', flexDirection: 'row'
                }}>
                    {/* <div style={{ width: 32, height: 32 }}><img style={{ width: 'inherit' }} alt="" src={currGame.image} /></div> */}
                    <p style={{ fontSize: 19, color: 'white', paddingLeft: 4 }}>{currGame.text}</p>
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
                <div style={{ padding: 24 }}>
                    <Button onClick={this.handleDeleteStaff} color="red" >Delete This Roster</Button>
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


class ModalContentAddGame extends Component {
    state = { visible: false, current_game: null };
    componentDidMount = async () => {
        this.setState({ visible: true, current_game: staffOptions[0] });
    }
    handleDropDown = (e, data) => {
        this.setState({ current_game: data });
    }
    handleOk = () => {
        const currGame = _.find(staffOptions, (o) => {
            return o.value === this.state.current_game.value;
        });
        this.props.handleSubmit(currGame);
    }
    handleCancel = () => {
        this.props.closeModal();
    }

    render() {
        if (this.state.visible === false) {
            return null;
        }
        const currGame = _.find(staffOptions, (o) => {
            return o.value === this.state.current_game.value;
        });
        return (
            <div style={{ width: 500, backgroundColor: 'black' }}>
                <div style={{
                    paddingTop: 8, flexDirection: 'column', display: 'flex', justifyContent: 'center'
                }}>
                    <div style={{
                        paddingTop: 8, paddingBottom: 12, display: 'inherit', justifyContent: 'center', flexDirection: 'row'
                    }}>
                        <Header color="yellow" as="h2">Add Staff</Header>
                    </div>
                    <div style={{ display: 'inherit', justifyContent: 'center', flexDirection: 'row' }}>
                        <Dropdown defaultValue={staffOptions[0].value} onChange={this.handleDropDown} style={{ width: 200, clear: 'both' }} placeholder="Select Game" fluid selection options={staffOptions} />
                    </div>
                    <div style={{
                        paddingTop: 44, paddingBottom: 12, display: 'inherit', justifyContent: 'center', flexDirection: 'row'
                    }}>
                        <Header color="blue" as="h3">Selected Staff:</Header>

                    </div>
                    <div style={{
                        paddingBottom: 12, display: 'inherit', justifyContent: 'center', flexDirection: 'row'
                    }}>
                        {/* <div style={{ width: 32, height: 32 }}><img style={{ width: 'inherit' }} alt="" src={currGame.image} /></div> */}
                        <p style={{ fontSize: 19, color: 'white', paddingLeft: 4 }}>{currGame.text}</p>
                    </div>
                    <div style={{ padding: 24 }}>
                        <Button onClick={this.handleOk} primary>Ok</Button>
                        <Button onClick={this.handleCancel} style={{ float: 'right' }} secondary>Cancel</Button>
                    </div>
                </div>
            </div>
        );
    }
}
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

class AdminStaffController extends Component {
    state = {
        games: [], user_modal_open: false, game_modal_open: false, visible: false
    };
    componentDidMount = () => {
        this.getRosterData();
    }
    getRosterData = async () => {
        return new Promise(async (resolve) => {
            const p_array = [];
            const staff_data = await this.props.appManager.executeQuery('query', getStaffQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
            staff_data.allStaff.edges.forEach((r, i) => {
                const { positionId } = r.node;
                const currGame = _.find(staffOptions, (o) => {
                    return o.position_id === positionId;
                });
                p_array.push(<RosterGame handleClick={this.handleGameSelectClick} game_node={r.node} key={`roster_game_${i}`} game={currGame} />);
            });
            this.current_roster_users = staff_data.allStaff.edges;
            this.setState({ visible: true, games: p_array });
            resolve(true);
        });
    }

    handleUserSubmit = async (t) => {
        const add_array = [];
        const delete_array = [];
        t.forEach((u) => {
            const p = _.findIndex(this.current_game_node.staffIndividualsByStaffId.edges, (o) => {
                return o.node.individualUserByIndividualId.id === u.node.id;
            });
            if (p === -1) {
                add_array.push(u.node);
            }
        });
        this.current_game_node.staffIndividualsByStaffId.edges.forEach((u) => {
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
            await this.props.appManager.executeQuery('mutation', createStaffUserQuery, { staffId: this.current_game_node.id, individualId: x.id });         // eslint-disable-line
        }
        for (let a in delete_array) {          // eslint-disable-line
            const x = delete_array[a];
            await this.props.appManager.executeQuery('mutation', deleteStaffUserQuery, { id: x.id });         // eslint-disable-line
        }
        if (add_array.length > 0 && delete_array.length === 0) {
            toast.success(`${add_array.length} User(s) added..`, {
                position: toast.POSITION.TOP_LEFT
            });
        }
        if (add_array.length === 0 && delete_array.length > 0) {
            toast.success(`${delete_array.length} User(s) removed..`, {
                position: toast.POSITION.TOP_LEFT
            });
        }
        if (add_array.length > 0 && delete_array.length > 0) {
            toast.success(`${add_array.length} User(s) added, and ${delete_array.length} User(s) removed...`, {
                position: toast.POSITION.TOP_LEFT
            });
        }
        await this.getRosterData();
        this.closeUserModal();

        // here we calculate a list of id's to add or delete..
        // first found the add id's
    }

    handleGameSelectClick = (game, game_node) => {
        this.current_game_node = game_node;
        this.setState({ user_modal_open: true });
        console.log(game, game_node);
    }
    handleAddNewGame = () => {
        this.setState({ game_modal_open: true });
    }
    handleSubmit = async (game) => {
        this.closeModal();
        await this.props.appManager.executeQuery('mutation', createStaffQuery, { subDomain: this.props.uiStore.current_organisation.subDomain, positionId: game.position_id });
        toast.success(`Staff Position ${game.text} added!`, {
            position: toast.POSITION.TOP_LEFT
        });
        this.getRosterData();
    }
    closeModal = () => {
        this.setState({ game_modal_open: false });
    }
    closeUserModal = () => {
        this.setState({ user_modal_open: false });
        this.getRosterData();
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        return (
            <div style={{
                width: 'calc(100vw - 416px)'
            }}>
                <OrganizationAdminStaffComponentRender game_list={this.state.games} handleAddNewGame={this.handleAddNewGame} />
                <AddGameModal
                    game_modal_open={this.state.game_modal_open}
                    content={<ModalContentAddGame handleSubmit={this.handleSubmit} closeModal={this.closeModal} {...this.props} user_id={this.user_id} />}
                />
                <AddUserModal
                    user_modal_open={this.state.user_modal_open}
                    content={<ModalContentAddUser handleSubmit={this.handleUserSubmit} game_node={this.current_game_node} closeModal={this.closeUserModal} {...this.props} />}
                />
            </div>
        );
    }
}

AdminStaffController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
};

ModalContentAddUser.propTypes = {
    uiStore: PropTypes.object.isRequired,
    game_node: PropTypes.object,
    appManager: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};
ModalContentAddUser.defaultProps = {
    game_node: null
};
ModalContentAddGame.propTypes = {
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

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminStaffController));

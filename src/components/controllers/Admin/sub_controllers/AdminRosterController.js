import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import _ from 'lodash';
import { Dropdown, Header, Button } from 'semantic-ui-react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { GlobalStyles } from 'Theme/Theme';
import { PickList } from 'primereact/components/picklist/PickList';
import { inject } from 'mobx-react';
import { getAllIndividualUsersQuery } from '../../../../queries/users.js';
import { deleteRosterUserQuery, deleteRosterQuery, createRosterUserQuery, getRosterQuery, createRosterQuery } from '../../../../queries/rosters.js';
import OrganizationAdminRosterComponentRender from '../../../render_components/admin/OrganizationAdminRosterComponentRender';
import { gameOptions } from './data/AllGames.js';
import blankProfileImage from '../../../../assets/images/blank_person.png';

const { confirm } = Modal;

export class ModalContentAddUser extends Component {
    state = { visible: false, source: [], target: [] }
    componentDidMount = async () => {
        const users = await this.props.appManager.executeQuery('query', getAllIndividualUsersQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
        const edges = users.allIndividualUsers.edges.slice(0);
        this.props.game_node.rosterIndividualsByRosterId.edges.forEach((x) => {
            const f = _.findIndex(edges, (o) => {
                return o.node.id === x.node.individualUserByIndividualId.id;
            });
            if (f > -1) {
                edges.splice(f, 1);
            }
        });
        const t_array = [];
        this.props.game_node.rosterIndividualsByRosterId.edges.forEach((p) => {
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

    userTemplate = (user) => {
        let im = blankProfileImage;
        if (user.node.profileImageUrl) {
            im = user.node.profileImageUrl;
        }
        return (
            <div className="ui-helper-clearfix">
                <img src={im} alt="" style={{ display: 'inline-block', margin: '2px 0 2px 2px', width: 48 }} />
                <div style={{ fontSize: '14px', float: 'right', margin: '15px 5px 0 0' }}>{user.node.username}</div>
            </div>
        );
    }
    showDeleteConfirm = () => {
        return new Promise(resolve => {
            confirm({
                title: 'Delete this Roster',
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
    handleDeleteRoster = async () => {
        const p = this.props.game_node;
        console.log(p);
        const action = await this.showDeleteConfirm();
        if (action) {
            await this.props.appManager.executeQuery(
                'mutation', deleteRosterQuery,
                {
                    id: p.id
                }
            );
            toast.success('Roster deleted !', {
                position: toast.POSITION.TOP_LEFT
            });
            this.props.closeModal();
        }
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        const currGame = _.find(gameOptions, (o) => {
            return o.game_id === this.props.game_node.gameId;
        });
        return (
            <div style={{
                display: 'flex', backgroundColor: 'black', flexDirection: 'column', padding: 16, width: 600
            }} >
                <div style={{
                    paddingTop: 16, paddingBottom: 12, display: 'inherit', justifyContent: 'center', flexDirection: 'row'
                }}>
                    <Header color="blue" as="h3">Roster Game:</Header>

                </div>
                <div style={{
                    paddingBottom: 12, display: 'inherit', justifyContent: 'center', flexDirection: 'row'
                }}>
                    <div style={{ width: 32, height: 32 }}><img style={{ width: 'inherit' }} alt="" src={currGame.image} /></div>
                    <p style={{ fontSize: 19, color: 'white', paddingLeft: 4 }}>{currGame.text}</p>
                </div>
                <div style={{
                    paddingBottom: 12, display: 'inherit', justifyContent: 'center', flexDirection: 'row'
                }}>
                    <PickList
                        source={this.state.source}
                        target={this.state.target}
                        itemTemplate={this.userTemplate}
                        sourceHeader="Available Users"
                        targetHeader="Added Users"
                        responsive={true}
                        sourceStyle={{ height: '300px' }}
                        targetStyle={{ height: '300px' }}
                        onChange={this.onChange} />
                </div>
                <div style={{ padding: 24 }}>
                    <Button onClick={this.handleOk} primary>Ok</Button>
                    <Button onClick={this.handleCancel} style={{ float: 'right' }} secondary>Cancel</Button>
                </div>
                <div style={{ padding: 24 }}>
                    <Button onClick={this.handleDeleteRoster} color="red" >Delete This Roster</Button>
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
        this.setState({ current_game: gameOptions[0], visible: true });
    }
    handleDropDown = (e, data) => {
        this.setState({ current_game: data });
    }
    handleOk = () => {
        const currGame = _.find(gameOptions, (o) => {
            return o.value === this.state.current_game.value;
        });
        this.props.handleSubmit(currGame);
    }
    handleCancel = () => {
        this.props.closeModal();
    }
    render() {
        if (!this.state.visible) {
            return null;
        }
        const currGame = _.find(gameOptions, (o) => {
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
                        <Header color="yellow" as="h2">Add Game</Header>
                    </div>
                    <div style={{ display: 'inherit', justifyContent: 'center', flexDirection: 'row' }}>
                        <Dropdown defaultValue={gameOptions[0].value} onChange={this.handleDropDown} style={{ width: 200, clear: 'both' }} placeholder="Select Game" fluid selection options={gameOptions} />
                    </div>
                    <div style={{
                        paddingTop: 44, paddingBottom: 12, display: 'inherit', justifyContent: 'center', flexDirection: 'row'
                    }}>
                        <Header color="blue" as="h3">Selected Game:</Header>

                    </div>
                    <div style={{
                        paddingBottom: 12, display: 'inherit', justifyContent: 'center', flexDirection: 'row'
                    }}>
                        <div style={{ width: 32, height: 32 }}><img style={{ width: 'inherit' }} alt="" src={currGame.image} /></div>
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
            <div style={{ width: 24, height: 24 }}><img style={{ width: 'inherit' }} alt="" src={props.game.image} /></div>
            <p style={{
                fontSize: 14, lineHeight: '24px', color: 'black', paddingLeft: 4
            }}>{props.game.text}</p>
        </div >
    );
};

class AdminRosterController extends Component {
    state = {
        games: [], user_modal_open: false, game_modal_open: false, visible: false
    };
    componentDidMount = () => {
        this.getRosterData();
    }
    getRosterData = async () => {
        return new Promise(async (resolve) => {
            const p_array = [];
            const roster_data = await this.props.appManager.executeQuery('query', getRosterQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
            roster_data.allRosters.edges.forEach((r, i) => {
                const { gameId } = r.node;
                const currGame = _.find(gameOptions, (o) => {
                    return o.game_id === gameId;
                });
                p_array.push(<RosterGame handleClick={this.handleGameSelectClick} game_node={r.node} key={`roster_game_${i}`} game={currGame} />);
            });
            this.current_roster_users = roster_data.allRosters.edges;
            this.setState({ visible: true, games: p_array });
            resolve(true);
        });
    }

    handleUserSubmit = async (t) => {
        const add_array = [];
        const delete_array = [];
        t.forEach((u) => {
            const p = _.findIndex(this.current_game_node.rosterIndividualsByRosterId.edges, (o) => {
                return o.node.individualUserByIndividualId.id === u.node.id;
            });
            if (p === -1) {
                add_array.push(u.node);
            }
        });
        this.current_game_node.rosterIndividualsByRosterId.edges.forEach((u) => {
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
            await this.props.appManager.executeQuery('mutation', createRosterUserQuery, { rosterId: this.current_game_node.id, individualId: x.id });         // eslint-disable-line
        }
        for (let a in delete_array) {          // eslint-disable-line
            const x = delete_array[a];
            await this.props.appManager.executeQuery('mutation', deleteRosterUserQuery, { id: x.id });         // eslint-disable-line
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
        await this.props.appManager.executeQuery('mutation', createRosterQuery, { subDomain: this.props.uiStore.current_organisation.subDomain, gameId: game.game_id });
        toast.success(`Game ${game.text} added!`, {
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
                <OrganizationAdminRosterComponentRender game_list={this.state.games} handleAddNewGame={this.handleAddNewGame} />
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

AdminRosterController.propTypes = {
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

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminRosterController));

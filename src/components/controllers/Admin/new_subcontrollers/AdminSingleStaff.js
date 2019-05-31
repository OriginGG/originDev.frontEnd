import React, { Component } from 'react';
import PropTypes from 'prop-types';
import findIndex from 'lodash/findIndex';
import { inject } from 'mobx-react';
import {
	// Button,
	// ButtonToolbar,
	// Panel,
	// Form,
	// FormGroup,
	// FormControl,
	// Modal,
	Icon,
	IconButton
	// Uploader,
	// ControlLabel,
	// Notification,
	// HelpBlock,
	// Grid,
	// Col
} from 'rsuite';

import { deleteRosterUserQuery, createRosterUserQuery } from '../../../../queries/rosters.js';
import { getOrganisationMembersQuery } from '../../../../queries/members.js';
import TeamUserComponent from './helpers/TeamUserComponent';
import open from './helpers/Notify';
import PersonSwitcher from './helpers/PersonSwitcher.js';
import ConfirmModalComponent from './helpers/ConfirmModal';

class AdminSingleRosterController extends Component {
	state = {
		visible: false,
		delete_modal_open: false
	};
	componentDidMount() {
		this.current_sub_domain = this.props.uiStore.current_organisation.subDomain;
		this.getData();
	}
	getData = async () => {
		const users = await this.props.appManager.executeQuery('query', getOrganisationMembersQuery, {
			organisationId: this.props.uiStore.current_organisation.id
		});
		const edges = users.allOrganisationMembers.edges.slice(0);
		const s_array = [];
		this.props.game_node.combinedRosterIndividualsByRosterId.edges.forEach((x) => {
			const f = findIndex(edges, (o) => {
				return o.node.individualUserByIndividalUserId.id === x.node.individualUserByIndividualId.id;
			});
			if (f > -1) {
				edges.splice(f, 1);
			}
		});
		edges.forEach((x1) => {
			s_array.push(<TeamUserComponent user={x1.node.individualUserByIndividalUserId} />);
		});
		const t_array = [];
		this.props.game_node.combinedRosterIndividualsByRosterId.edges.forEach((p) => {
			t_array.push(<TeamUserComponent user={p.node.individualUserByIndividualId} />);
		});
		this.target = t_array;
		this.source = s_array;
		this.setState({
			visible: true
		});
	};
	updateArrays = (s, t) => {
		this.target = t;
		this.source = s;
	};
	handleUserSubmit = async (t) => {
		const add_array = [];
		const delete_array = [];
		t.forEach((u) => {
			const p = findIndex(this.props.game_node.combinedRosterIndividualsByRosterId.edges, (o) => {
				return o.node.individualUserByIndividualId.id === u.props.user.id;
			});
			if (p === -1) {
				add_array.push(u.props.user);
			}
		});
		this.props.game_node.combinedRosterIndividualsByRosterId.edges.forEach((u) => {
			const p = findIndex(t, (o) => {
				return o.props.user.id === u.node.individualUserByIndividualId.id;
			});
			if (p === -1) {
				// make sure its not in add array
				const p2 = findIndex(add_array, (a) => {
					return a.id === u.node.id;
				});
				if (p2 === -1) {
					delete_array.push(u.node);
				}
			}
		});
		for (const a in add_array) {
			// eslint-disable-line
			const x = add_array[a];
			await this.props.appManager.executeQuery('mutation', createRosterUserQuery, {
				rosterId: this.props.game_node.id,
				individualId: x.id
			}); // eslint-disable-line
		}
		for (const a in delete_array) {
			// eslint-disable-line
			const x = delete_array[a];
			await this.props.appManager.executeQuery('mutation', deleteRosterUserQuery, { id: x.id }); // eslint-disable-line
		}
		let f = false;
		if (add_array.length > 0 && delete_array.length === 0) {
			f = true;
			open('success', `${add_array.length} User(s) added..`);
		}
		if (add_array.length === 0 && delete_array.length > 0) {
			f = true;
			open('success', `${delete_array.length} User(s) deleted..`);
		}
		if (add_array.length > 0 && delete_array.length > 0) {
			f = true;
			open('success', `${add_array.length} User(s) added, and ${delete_array.length} User(s) removed...`);
		}
		if (!f) {
			open('success', 'No Changes made!');
		}
		await this.getData();
	};

	render() {
		if (this.state.visible === false) {
			return null;
		}
		return (
			<div>
				<ConfirmModalComponent
					modal_open={this.state.delete_modal_open}
					modal_text="Are you sure you want to delete this roster?"
					modalConfirm={this.deleteTheRoster}
					modalCancel={() => {
						this.setState({ delete_modal_open: false });
					}}
				/>
				<PersonSwitcher updateArrays={this.updateArrays} target={this.target} source={this.source} />
				<IconButton
					onClick={() => {
						this.handleUserSubmit(this.target);
					}}
					appearance="primary"
					icon={<Icon icon="user" />}
					placement="right"
				>
					UPDATE STAFF
				</IconButton>
				<IconButton
					style={{ marginLeft: 8 }}
					onClick={() => {
						this.props.handleBack();
					}}
					appearance="secondary"
					icon={<Icon icon="arrow-left" />}
					placement="right"
				>
					BACK
				</IconButton>
			</div>
		);
	}
}

AdminSingleRosterController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	handleBack: PropTypes.func.isRequired,
	appManager: PropTypes.object.isRequired,
	game_node: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(AdminSingleRosterController);

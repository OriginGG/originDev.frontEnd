import React, { Component } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import { inject } from 'mobx-react';
import {
	// Button,
	// ButtonToolbar,
	Panel,
	Dropdown,
	IconButton,
	// Form,
	// FormGroup,
	// FormControl,
	// Modal,
	Icon,
	// Uploader,
	// ControlLabel,
	// Notification,
	// HelpBlock,
	Grid,
	Col
} from 'rsuite';

import { getRosterQuery, createRosterQuery, deleteRosterQuery } from '../../../../queries/rosters.js';
import open from './helpers/Notify';
import ConfirmModalComponent from './helpers/ConfirmModal.js';
import AdminSingleRosterController from './AdminSingleRoster.js';
import { staffOptions } from './data/AllPositions.js';

const StaffPosition = ({ handleClick, handleDeleteClick, game_node, game }) => {
	return (
		<div>
			<div
				style={{
					cursor: 'pointer',
					marginTop: 4,
					marginBottom: 4,
					border: '1px solid #e5e5ea',
					borderRadius: '6px'
				}}
			>
				<Grid style={{ paddingLeft: 0, paddingRight: 0 }} fluid>
					<Col
						onClick={() => {
							handleClick(game, game_node);
						}}
						style={{ paddingRight: 0, paddingLeft: 0 }}
						lg={21}
						xs={21}
					>
						<div
							style={{
								paddingRight: 0,
								paddingLeft: 8,
								backgroundColor: 'aquamarine',
								display: 'flex',
								alignItems: 'center',
								height: 48
							}}
						>
							<h3>{game.text}</h3>
						</div>
					</Col>
					<Col lg={2} xs={2}>
						<IconButton
							onClick={() => {
								handleDeleteClick(game_node);
							}}
							style={{ marginTop: 6 }}
							color="red"
							icon={<Icon icon="trash" />}
						/>
					</Col>
					<Col lg={6} xs={2} />
				</Grid>
			</div>
		</div>
	);
};

class AdminStaffController extends Component {
	state = {
		visible: false,
		delete_modal_open: false,
		games: [],
		select_game_options: []
	};
	componentDidMount() {
		this.getRosterData();
	}
	getRosterData = async () => {
		const p_array = [];
		const staff_data = await this.props.appManager.executeQuery('query', getRosterQuery, {
			rosterType: 'staff',
			organisationId: this.props.uiStore.current_organisation.id
		});
		staff_data.allCombinedRosters.edges.forEach((r, i) => {
			const { positionId } = r.node;
			const currGame = find(staffOptions, (o) => {
				return o.position_id === parseInt(positionId, 10);
			});
			p_array.push(
				<StaffPosition
					handleDeleteClick={this.deleteRoster}
					handleClick={() => {
						this.handleGameSelectClick(r.node);
					}}
					game_node={r.node}
					key={`roster_game_${i}`}
					game={currGame}
				/>
			);
		});
		const select_game_options = [];
		staffOptions.forEach((g) => {
			select_game_options.push(
				<Dropdown.Item eventKey={g.value}>
					<span style={{ marginLeft: 6 }}>{g.text}</span>
				</Dropdown.Item>
			);
		});
		this.current_roster_users = staff_data.allCombinedRosters.edges;
		this.setState({ visible: true, games: p_array, select_game_options });
	};
	handleGameSelectClick = (g_node) => {
		this.setState({
			singleRoster: <AdminSingleRosterController handleBack={this.handleBack} game_node={g_node} />
		});
	};
	selectAddNewGame = async (v) => {
		const currGame = find(staffOptions, (o) => {
			return o.value === v;
		});
		await this.props.appManager.executeQuery('mutation', createRosterQuery, {
			rosterType: 'staff',
			organisationId: this.props.uiStore.current_organisation.id,
			positionId: currGame.position_id
		});
		open('success', `Staff Position ${currGame.text} added!`);
		this.getRosterData();
	};
	deleteRoster = (g_node) => {
		this.delete_roster_node = g_node;
		this.setState({ delete_modal_open: true });
	};
	confirmDeleteRoster = async () => {
		this.setState({ delete_modal_open: false });
		const p = this.delete_roster_node;
		await this.props.appManager.executeQuery('mutation', deleteRosterQuery, {
			id: p.id
		});
		open('success', 'Staff position deleted !');
		this.getRosterData();
	};
	handleBack = () => {
		this.getRosterData();
		this.setState({ singleRoster: null });
	};
	render() {
		if (this.state.visible === false) {
			return null;
		}
		if (this.state.singleRoster) {
			return <div>{this.state.singleRoster}</div>;
		}
		return (
			<div>
				<ConfirmModalComponent
					modal_open={this.state.delete_modal_open}
					modal_text="Are you sure you want to delete this roster?"
					modalConfirm={this.confirmDeleteRoster}
					modalCancel={() => {
						this.setState({ delete_modal_open: false });
					}}
				/>
				<Panel style={{ paddingBottom: 170 }} header={<h3>Template</h3>} bordered>
					<Grid fluid>
						<Col lg={12} xs={24}>
							{this.state.games}
							<Dropdown
								onSelect={this.selectAddNewGame}
								menuStyle={{ maxHeight: 200, overflowY: 'auto' }}
								placement="rightTop"
								renderTitle={() => {
									return <IconButton appearance="primary" icon={<Icon icon="plus" />} circle />;
								}}
							>
								{this.state.select_game_options}
							</Dropdown>
						</Col>
					</Grid>
				</Panel>
			</div>
		);
	}
}

StaffPosition.propTypes = {
	game: PropTypes.object.isRequired,
	game_node: PropTypes.object.isRequired,
	handleClick: PropTypes.func.isRequired,
	handleDeleteClick: PropTypes.func.isRequired
};
AdminStaffController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(AdminStaffController);

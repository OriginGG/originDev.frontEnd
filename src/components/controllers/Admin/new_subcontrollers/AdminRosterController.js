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
import { gameOptions } from './data/AllGames';
import open from './helpers/Notify';
import ConfirmModalComponent from './helpers/ConfirmModal.js';

const RosterGame = ({ handleClick, handleDeleteClick, game_node, game }) => {
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
						style={{ backgroundColor: 'aquamarine', paddingLeft: 0, paddingRight: 0 }}
						lg={6}
						xs={6}
					>
						<img
							alt=""
							style={{
								borderRight: '1px solid #e5e5ea',
								width: '180px',
								height: '48px',
								objectFit: 'contain',
								objectPosition: 'left'
							}}
							src={game.image}
						/>
					</Col>
					<Col
						onClick={() => {
							handleClick(game, game_node);
						}}
						style={{ paddingRight: 0, paddingLeft: 0 }}
						lg={16}
						xs={16}
					>
						<div
							style={{
								paddingRight: 0,
								paddingLeft: 0,
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
				</Grid>
			</div>
		</div>
	);
};

class AdminRosterController extends Component {
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
		const roster_data = await this.props.appManager.executeQuery('query', getRosterQuery, {
			rosterType: 'roster',
			organisationId: this.props.uiStore.current_organisation.id
		});
		roster_data.allCombinedRosters.edges.forEach((r, i) => {
			const { gameId } = r.node;
			const currGame = find(gameOptions, (o) => {
				return o.game_id === gameId;
			});

			p_array.push(
				<RosterGame
					handleDeleteClick={this.deleteRoster}
					handleClick={this.handleGameSelectClick}
					game_node={r.node}
					key={`roster_game_${i}`}
					game={currGame}
				/>
			);
		});
		const select_game_options = [];
		gameOptions.forEach((g) => {
			select_game_options.push(
				<Dropdown.Item eventKey={g.value}>
					<img
						alt=""
						style={{ width: 40, height: 'auto', objectFit: 'contain', objectPosition: 'left' }}
						src={g.image}
					/>
					<span style={{ marginLeft: 6 }}>{g.text}</span>
				</Dropdown.Item>
			);
		});
		this.current_roster_users = roster_data.allCombinedRosters.edges;
		this.setState({ visible: true, games: p_array, select_game_options });
	};
	selectAddNewGame = async (v) => {
		const currGame = find(gameOptions, (o) => {
			return o.value === v;
		});
		await this.props.appManager.executeQuery('mutation', createRosterQuery, {
			rosterType: 'roster',
			organisationId: this.props.uiStore.current_organisation.id,
			gameId: currGame.game_id
		});
		open('success', `Game ${currGame.text} added!`);
		this.getRosterData();
	};
	deleteRoster = (g_node) => {
		this.delete_roster_node = g_node;
		this.setState({ delete_modal_open: true });
	}
	confirmDeleteRoster = async () => {
		this.setState({ delete_modal_open: false });
		const p = this.delete_roster_node;
            await this.props.appManager.executeQuery(
                'mutation', deleteRosterQuery,
                {
                    id: p.id
                }
            );
		open('success', 'Roster deleted !');
		this.getRosterData();
    }
	render() {
		if (this.state.visible === false) {
			return null;
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

RosterGame.propTypes = {
	game: PropTypes.object.isRequired,
	game_node: PropTypes.object.isRequired,
	handleClick: PropTypes.func.isRequired,
	handleDeleteClick: PropTypes.func.isRequired
};
AdminRosterController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(AdminRosterController);

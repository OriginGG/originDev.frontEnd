import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import {
	// Button,
	// ButtonToolbar,
	// Panel,
	Table,
	// Cell,
	// Column,
	// HeaderCell,
	Popover,
	Dropdown,
	IconButton,
	Icon,
	Whisper,
	Panel,
	// Form,
	// FormGroup,
	// FormControl,
	// Modal,
	// Icon,
	// Uploader,
	// ControlLabel,
	// Notification,
	// HelpBlock,
	Grid,
	Col
} from 'rsuite';
import find from 'lodash/find';
import open from './helpers/Notify';
import { gameOptions } from './data/AllGames';
import imagePlaceholder from '../../../../assets/images/blank_person.png';
import { recentMatchesQuery, deleteRecentMatchQuery } from '../../../../queries/matches';
import AdminSingleMatchController from './AdminSingleMatch';
import ConfirmModalComponent from './helpers/ConfirmModal';

const { Cell, Column, HeaderCell } = Table;

// import OrganizationAdminProfileComponentRender from '../../../render_components/admin/OrganizationAdminProfileComponentRender';
// import {
// 	updateOrganisationQuery,
// 	getOrganisationQuery,
// 	getOrganisationQueryAnyCase
// } from '../../../../queries/organisation';
// import { updateThemeQuery } from '../../../../queries/themes';
// import UploaderButton from './helpers/UploaderButton';

// function open(funcName, description) {
// 	Notification[funcName]({
// 		title: funcName,
// 		description
// 	});
// }

const ImageCell = ({ rowData, dataKey, ...props }) => (
	<Cell {...props} style={{ padding: 0 }}>
		<div
			style={{
				width: 40,
				height: 40,
				// background: '#f5f5f5',
				// borderRadius: 20,
				// marginTop: 2,
				overflow: 'hidden',
				display: 'inline-block'
			}}
		>
			<img alt="" src={rowData[dataKey]} width="44" />
		</div>
	</Cell>
);

const Menu = ({ onSelect }) => (
	<Dropdown.Menu onSelect={onSelect}>
		<Dropdown.Item eventKey="edit">
			Edit
			<span style={{ marginLeft: 4 }}>
				<Icon icon="edit" />
			</span>
		</Dropdown.Item>
		<Dropdown.Item eventKey="delete">
			<div>
				<span style={{ color: 'red' }}>Delete</span>
				<span style={{ marginLeft: 4 }}>
					<Icon icon="trash" />
				</span>
			</div>
		</Dropdown.Item>
	</Dropdown.Menu>
);

const MenuPopover = ({ onSelect, ...rest }) => (
	<Popover {...rest} full>
		<Menu onSelect={onSelect} />
	</Popover>
);

let tableBody;

class CustomWhisper extends React.Component {
	render() {
		return (
			<Whisper
				placement="autoVerticalLeft"
				trigger="click"
				triggerRef={(ref) => {
					this.trigger = ref;
				}}
				container={() => {
					return tableBody;
				}}
				speaker={
					<MenuPopover
						onSelect={(e) => {
							this.props.handleSelect(e, this.props.row);
						}}
					/>
				}
			>
				{this.props.children}
			</Whisper>
		);
	}
}

const ActionCell = ({ rowData, handleSelect, dataKey, ...props }) => {
	return (
		<Cell {...props} className="link-group">
			<CustomWhisper handleSelect={handleSelect} row={rowData}>
				<IconButton style={{ marginTop: 0 }} appearance="subtle" icon={<Icon icon="more" />} />
			</CustomWhisper>
		</Cell>
	);
};

class AdminRecentMatchesController extends Component {
	state = {
		visible: false,
		data: [],
		addMatch: null
	};
	componentDidMount() {
		this.current_sub_domain = this.props.uiStore.current_organisation.subDomain;
		this.calcMatches();
	}
	calcMatches = async () => {
		const m = await this.props.appManager.executeQueryAuth('query', recentMatchesQuery, {
			organisationId: this.props.uiStore.current_organisation.id
		});
		const e = m.resultdata.edges;
		const d = [];
		e.forEach((match) => {
			const g_image = find(gameOptions, (o) => {
				return o.value === match.node.gameName;
			});
			const opp_src = match.node.gameLogo ? match.node.gameLogo : imagePlaceholder;
			const game_src = g_image.image;
			d.push({
				opp_src,
				game_src,
				node: match.node,
				score: match.node.score
			});
		});
		this.setState({ data: d, visible: true });
	};
	handleSelect = (e, row) => {
		if (e === 'edit') {
			this.setState({ addMatch: <AdminSingleMatchController handleBack={this.handleBack} match={row.node} /> });
		}
		if (e === 'delete') {
			this.deleteMatch(row.node.id);
		}
	};
	deleteMatch = (id) => {
		this.delete_match_id = id;
		this.setState({ delete_modal_open: true });
	};
	confirmDeleteMatch = async () => {
		this.setState({ delete_modal_open: false });
		await this.props.appManager.executeQueryAuth('mutation', deleteRecentMatchQuery, {
			id: this.delete_match_id
		});
		open('success', 'Recent match deleted !');
		this.calcMatches();
	}
	addMatch = () => {
		this.setState({ addMatch: <AdminSingleMatchController handleBack={this.handleBack} /> });
	};
	handleBack = () => {
		this.setState({ addMatch: null });
		this.calcMatches();
	};
	render() {
		const { data } = this.state;
		if (this.state.visible === false) {
			return null;
		}
		if (this.state.addMatch) {
			return <div>{this.state.addMatch}</div>;
		}
		return (
			<div>
				<ConfirmModalComponent
					modal_open={this.state.delete_modal_open}
					modal_text="Are you sure you want to delete this match?"
					modalConfirm={this.confirmDeleteMatch}
					modalCancel={() => {
						this.setState({ delete_modal_open: false });
					}}
				/>
				<Panel header={<h3>Recent Matches...</h3>} bordered>
					<Grid fluid>
						<Col lg={24} xs={24}>
							<Table
								data={data}
								id="table"
								bodyRef={(ref) => {
									tableBody = ref;
								}}
							>
								<Column width={140} align="center">
									<HeaderCell>Game</HeaderCell>
									<ImageCell dataKey="game_src" />
								</Column>

								<Column width={140} align="center">
									<HeaderCell>Opposition Team</HeaderCell>
									<ImageCell dataKey="opp_src" />
								</Column>

								<Column width={160}>
									<HeaderCell>Score</HeaderCell>
									<Cell dataKey="score" />
									{/* <NameCell dataKey="firstName" /> */}
								</Column>
								<Column width={200}>
									<HeaderCell>Action</HeaderCell>
									<ActionCell handleSelect={this.handleSelect} dataKey="id" />
								</Column>
							</Table>
							<IconButton
								onClick={this.addMatch}
								appearance="primary"
								icon={<Icon icon="plus" />}
								circle
							/>
						</Col>
					</Grid>
				</Panel>
			</div>
		);
	}
}

CustomWhisper.propTypes = {
	handleSelect: PropTypes.func.isRequired,
	children: PropTypes.object.isRequired,
	row: PropTypes.object.isRequired
};
ImageCell.propTypes = {
	rowData: PropTypes.array.isRequired,
	dataKey: PropTypes.string.isRequired
};

ActionCell.propTypes = {
	handleSelect: PropTypes.func.isRequired,
	rowData: PropTypes.array.isRequired,
	dataKey: PropTypes.string.isRequired
};
Menu.propTypes = {
	onSelect: PropTypes.func.isRequired
};
MenuPopover.propTypes = {
	onSelect: PropTypes.func.isRequired
};

AdminRecentMatchesController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(AdminRecentMatchesController);

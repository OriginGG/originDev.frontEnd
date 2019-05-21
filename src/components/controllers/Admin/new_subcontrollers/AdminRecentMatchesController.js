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

import { gameOptions } from './data/AllGames';
import imagePlaceholder from '../../../../assets/images/blank_person.png';
import { recentMatchesQuery } from '../../../../queries/matches';
import AdminSingleMatchController from './AdminSingleMatch';

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

const NameCell = ({ rowData, dataKey, ...props }) => {
	const speaker = (
		<Popover title="Description">
			<p>
				<b>Name:</b> {`${rowData.firstName} ${rowData.lastName}`}{' '}
			</p>
			<p>
				<b>Email:</b> {rowData.email}{' '}
			</p>
			<p>
				<b>Company:</b> {rowData.companyName}{' '}
			</p>
			<p>
				<b>Sentence:</b> {rowData.sentence}{' '}
			</p>
		</Popover>
	);

	return (
		<Cell {...props}>
			<Whisper placement="top" speaker={speaker}>
				<a>{rowData[dataKey].toLocaleString()}</a>
			</Whisper>
		</Cell>
	);
};

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
	constructor(props) {
		super(props);
		this.handleSelectMenu = this.handleSelectMenu.bind(this);
	}
	handleSelectMenu(eventKey) {
		console.log(eventKey);
		this.trigger.hide();
	}
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
				speaker={<MenuPopover onSelect={this.handleSelectMenu} />}
			>
				{this.props.children}
			</Whisper>
		);
	}
}

const ActionCell = ({ rowData, dataKey, ...props }) => {
	return (
		<Cell {...props} className="link-group">
			<CustomWhisper>
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
				score: match.node.score
			});
		});
		this.setState({ data: d, visible: true });
	};
	addMatch = () => {
		this.setState({ addMatch: <AdminSingleMatchController /> });
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
				<Panel header={<h3>Recent Matches...</h3>} bordered>
					<Grid fluid>
						<Col lg={24} xs={24}>
							<Table
								autoHeight
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
									<ActionCell dataKey="id" />
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
	children: PropTypes.object.isRequired
};
ImageCell.propTypes = {
	rowData: PropTypes.array.isRequired,
	dataKey: PropTypes.string.isRequired
};
NameCell.propTypes = {
	rowData: PropTypes.array.isRequired,
	dataKey: PropTypes.string.isRequired
};

ActionCell.propTypes = {
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

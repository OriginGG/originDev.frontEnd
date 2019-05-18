import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { isMobile } from 'react-device-detect';

import {
	Panel,
	// Form,
	// FormGroup,
	// FormControl,
	// ControlLabel,
	Button,
	ButtonToolbar,
	IconButton,
	Modal,
	// Divider,
	Icon,
	// Icon,
	Notification,
	// Uploader,
	// HelpBlock,
	Grid,
	Col
	// Row
} from 'rsuite';
import {
	getOrganisationMembersQuery,
	deleteOrganisaionMemberQuery,
	createOrganisationMemberQuery
} from '../../../../queries/members';
import { createContentTeamQuery, deleteContentTeamQuery, getContentTeamQuery } from '../../../../queries/content_team'; // eslint-disable-line
import { deleteIndQueryNew } from '../../../../queries/individuals';

import imagePlaceholder from '../../../../assets/images/blank_person.png';
import AdminAddIndividualController from './AdminAddIndividualController';

function open(funcName, description) {
	Notification[funcName]({
		title: funcName,
		description
	});
}
const MemberComponent = ({ user, handleDeleteMember, handleEditMember, member }) => {
	const profileImageUrl = user.profileImageUrl ? user.profileImageUrl : imagePlaceholder;
	const header = `${user.username} (${user.firstName} ${user.lastName})`;
	const s = isMobile ? {} : { height: 300, marginBottom: 8 };
	const accom_header = isMobile ? <h5>Accomplishments</h5> : <h3>Accomplishments</h3>;
	const about_header = isMobile ? <h5>About</h5> : <h3>About</h3>;

	return (
		<Panel style={s} header={<h3>{header}</h3>} bordered>
			<Grid fluid>
				<Col lg={4} xs={24}>
					<img alt="" style={{ width: '90%', height: 'auto', objectFit: 'cover' }} src={profileImageUrl} />
				</Col>
				<Col lg={8} xs={24}>
					<Panel style={{ height: 200, marginBottom: 8 }} header={about_header} bordered>
						<div style={{ maxHeight: 110, overflowY: 'auto' }}>{user.about}</div>
					</Panel>
				</Col>
				<Col lg={8} xs={24}>
					<Panel style={{ height: 200, marginBottom: 8 }} header={accom_header} bordered>
						<div style={{ maxHeight: 110, overflowY: 'auto' }}>{user.accomplishments}</div>
					</Panel>
				</Col>
				<Col lg={4} xs={24}>
					<div
						style={{
							height: 180,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<ButtonToolbar>
							<IconButton
								onClick={() => {
									handleEditMember(user);
								}}
								appearance="primary"
								icon={<Icon icon="edit" />}
								placement="right"
							/>
							<IconButton
								onClick={() => {
									handleDeleteMember(user, member);
								}}
								color="red"
								icon={<Icon icon="trash" />}
								placement="right"
							/>
						</ButtonToolbar>
					</div>
				</Col>
			</Grid>
		</Panel>
	);
};
class AdminMembersController extends Component {
	state = {
		add_member: null,
		visible: false,
		members: [],
		show_modal: false
	};
	componentDidMount = async () => {
		await this.calcMembers();
		this.setState({ visible: true });
	};
	calcMembers = async () => {
		const members = await this.props.appManager.executeQuery('query', getOrganisationMembersQuery, {
			organisationId: this.props.uiStore.current_organisation.id
		});
		this.current_members = members.allOrganisationMembers.edges;
		const m_array = [];
		members.allOrganisationMembers.edges.forEach((m) => {
			m_array.push(
				<MemberComponent
					member={m.node}
					handleEditMember={this.updateMember}
					handleDeleteMember={this.handleDeleteMember}
					user={m.node.individualUserByIndividalUserId}
				/>
			);
		});
		this.setState({ members: m_array, visible: true });
	};
	handleDeleteMember = (u, m) => {
		this.delete_user = u;
		this.delete_member = m;
		this.setState({ show_modal: true });
	};
	closeModal = () => {
		this.setState({ show_modal: false });
	};
	deleteTheMember = async () => {
		this.setState({ show_modal: false });
		const ct = await this.props.appManager.executeQuery('query', getContentTeamQuery, {
			memberId: this.delete_member.id
		});
		if (ct.allContentTeams.nodes.length > 0) {
			await this.props.appManager.executeQuery('mutation', deleteContentTeamQuery, {
				id: ct.allContentTeams.nodes[0].id
			});
		}
		await this.props.appManager.executeQuery('mutation', deleteOrganisaionMemberQuery, {
			id: this.delete_member.id
		});
		await this.props.appManager.executeQueryAuth('mutation', deleteIndQueryNew, {
			id: this.delete_user.id
		});
		open('success', 'Member sucessfully deleted.');
		this.calcMembers();
	};
	addInvididual = () => {
		this.setState({
			add_member: (
				<AdminAddIndividualController handleAddMember={this.handleAddMember} handleCancel={this.handleCancel} />
			)
		});
	};
	updateMember = (u) => {
		this.setState({
			add_member: (
				<AdminAddIndividualController
					user={u}
					handleAddMember={this.handleAddMember}
					handleCancel={this.handleCancel}
				/>
			)
		});
	};
	handleAddMember = async (user_id, d_a) => {
		if (!d_a) {
			const member = await this.props.appManager.executeQuery('mutation', createOrganisationMemberQuery, {
				userId: user_id,
				organisationId: this.props.uiStore.current_organisation.id
			});
			await this.props.appManager.executeQuery('mutation', createContentTeamQuery, {
				memberId: member.createOrganisationMember.organisationMember.id
			});
			open('success', 'Member Created and added!');
		} else {
			open('success', 'Member updated!');
		}
		this.setState({ add_member: null });
		this.calcMembers();
	};
	handleCancel = () => {
		this.setState({ add_member: null });
	};

	render() {
		if (this.state.visible === false) {
			return null;
		}
		if (this.state.add_member) {
			return <div>{this.state.add_member}</div>;
		}
		return (
			<div>
				<Modal backdrop="static" show={this.state.show_modal} onHide={this.close} size="xs">
					<Modal.Body>
						<Icon
							icon="remind"
							style={{
								color: '#ffb300',
								fontSize: 24
							}}
						/>
						{'  '}
						This will permanently delete this member, are you sure?
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.deleteTheMember} appearance="primary">
							Ok
						</Button>
						<Button onClick={this.closeModal} appearance="subtle">
							Cancel
						</Button>
					</Modal.Footer>
				</Modal>
				<Panel header={<h3>Current Members</h3>} bordered>
					<div style={{ maxHeight: 280, overflowY: 'auto' }}>
						<Grid fluid>
							<Col lg={24} xs={24}>
								{this.state.members}
							</Col>
						</Grid>
					</div>
				</Panel>
				<div>
					<IconButton
						onClick={this.addInvididual}
						appearance="primary"
						icon={<Icon icon="user" />}
						placement="right"
					>
						ADD MEMBER
					</IconButton>
				</div>
			</div>
		);
	}
}

AdminMembersController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	appManager: PropTypes.object.isRequired
};

MemberComponent.propTypes = {
	user: PropTypes.object.isRequired,
	member: PropTypes.object.isRequired,
	handleDeleteMember: PropTypes.func.isRequired,
	handleEditMember: PropTypes.func.isRequired
};
export default inject('uiStore', 'appManager')(AdminMembersController);

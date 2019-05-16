import React, { Component } from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line
// import injectSheet from 'react-jss';
import { Modal } from 'antd';
import { Table, Image, Icon, Checkbox, Card, Button, Header } from 'semantic-ui-react/dist/commonjs';
// import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import { toast } from 'react-toastify';
import {
	getOrganisationMembersQuery,
	deleteOrganisaionMemberQuery,
	createOrganisationMemberQuery
} from '../../../../queries/members';
import { createContentTeamQuery, deleteContentTeamQuery, getContentTeamQuery } from '../../../../queries/content_team'; // eslint-disable-line
import AdminAddIndividualController from './AdminAddIndividualController';
import { deleteIndQueryNew } from '../../../../queries/individuals';

const { confirm } = Modal;

// import OrganizationAdminBlogComponentRender from '../../../render_components/OrganizationAdminBlogComponentRender';

const MemberCharacter = ({ user, handleCheckbox, key_index }) => {
	return (
		<Table.Row style={{ height: 64 }}>
			<Table.Cell style={{ width: 64 }}>
				<Image style={{ marginLeft: 4 }} centered src={user.profileImageUrl} rounded size="mini" />
			</Table.Cell>
			<Table.Cell>
				{user.firstName} {user.lastName}
			</Table.Cell>
			<Table.Cell>
				<span style={{ color: 'grey' }}>{user.username}</span>
			</Table.Cell>
			<Table.Cell style={{ width: 96, textAlign: 'center' }}>
				<Checkbox
					key={`cbox_key_${key_index}`}
					defaultChecked={false}
					onChange={(e, data) => {
						handleCheckbox(e, data, user);
					}}
				/>
			</Table.Cell>
		</Table.Row>
	);
};

class AdminMembersController extends Component {
	state = {
		add_member: false, // eslint-disable-line
		visible: false,
		members: []
	};
	componentDidMount = () => {
		this.calcMembers();
		this.invite_array = [];
		this.key_index = 1;
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
	calcMembers = async () => {
		const members = await this.props.appManager.executeQuery('query', getOrganisationMembersQuery, {
			organisationId: this.props.uiStore.current_organisation.id
		});
		this.current_members = members.allOrganisationMembers.edges;
		const m_array = [];
		members.allOrganisationMembers.edges.forEach((m) => {
			m_array.push(
				<Table.Row>
					<Table.Cell>
						<Header
							style={{ cursor: 'pointer' }}
							onClick={() => {
								this.updateMember(m.node.individualUserByIndividalUserId);
							}}
							as="h4"
							image
						>
							<Image src={m.node.individualUserByIndividalUserId.profileImageUrl} rounded size="mini" />
							<Header.Content>{m.node.individualUserByIndividalUserId.username}</Header.Content>
						</Header>
					</Table.Cell>
					<Table.Cell>
						<Icon
							style={{ cursor: 'pointer' }}
							name="trash"
							onClick={() => {
								this.deleteMember(m.node.id, m.node.individualUserByIndividalUserId.id);
							}}
						/>
					</Table.Cell>
				</Table.Row>
			);
		});
		this.setState({ members: m_array, visible: true });
	};

	showDeleteConfirm = () => {
		return new Promise((resolve) => {
			confirm({
				title: 'Delete this Member',
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

	deleteMember = async (id, user_id) => {
		const f = await this.showDeleteConfirm();
		if (f) {
			const ct = await this.props.appManager.executeQuery('query', getContentTeamQuery, {
				memberId: id
			});
			if (ct.allContentTeams.nodes.length > 0) {
				await this.props.appManager.executeQuery('mutation', deleteContentTeamQuery, {
					id: ct.allContentTeams.nodes[0].id
				});
			}
			await this.props.appManager.executeQuery('mutation', deleteOrganisaionMemberQuery, {
				id
			});
			await this.props.appManager.executeQueryAuth('mutation', deleteIndQueryNew, {
				id: user_id
			});
			toast.success('Member deleted !', {
				position: toast.POSITION.TOP_LEFT
			});
		}
		this.calcMembers();
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
			toast.success('Member Created and added!', {
				position: toast.POSITION.TOP_LEFT
			});
		} else {
			toast.success('Member updated!', {
				position: toast.POSITION.TOP_LEFT
			});
		}
		this.setState({ add_member: null });
		this.calcMembers();
	};
	addInvididual = () => {
		this.setState({
			add_member: (
				<AdminAddIndividualController handleAddMember={this.handleAddMember} handleCancel={this.handleCancel} />
			)
		});
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
			<div style={{ height: '100vh', width: 'calc(100vw - 420px)' }}>
				<Card>
					<Table style={{ marginLeft: 8, marginTop: 12 }} basic="very" celled collapsing>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Current Members</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							<div style={{ height: 180, overflowY: 'auto' }}>{this.state.members}</div>
						</Table.Body>
					</Table>
				</Card>
				<Button onClick={this.addInvididual} type="primary">
					ADD MEMBER
				</Button>
			</div>
		);
	}
}

AdminMembersController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	appManager: PropTypes.object.isRequired
	// classes: PropTypes.object.isRequired
};

MemberCharacter.propTypes = {
	user: PropTypes.object.isRequired,
	handleCheckbox: PropTypes.func.isRequired,
	key_index: PropTypes.number.isRequired
};

export default inject('uiStore', 'appManager')(AdminMembersController);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import findIndex from 'lodash/findIndex';
import { inject } from 'mobx-react';
import { Container, Draggable } from 'react-smooth-dnd';
import {
	// Button,
	// ButtonToolbar,
	Panel,
	// Form,
	// FormGroup,
	// FormControl,
	// Modal,
	Icon,
	IconButton,
	// Uploader,
	// ControlLabel,
	// Notification,
	// HelpBlock,
	Grid,
	Col
} from 'rsuite';

import { deleteRosterUserQuery, createRosterUserQuery, getRosterQuery, createRosterQuery } from '../../../../queries/rosters.js';
import { getOrganisationMembersQuery } from '../../../../queries/members.js';
import imagePlaceholder from '../../../../assets/images/blank_person.png';
import open from './helpers/Notify';

const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];			// eslint-disable-line
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};
const TeamUserComponent = ({ user }) => {
	const profileImageUrl = user.profileImageUrl ? user.profileImageUrl : imagePlaceholder;
	return (
		<div>
			<div style={{ cursor: 'pointer', marginTop: 4, marginBottom: 4, border: '1px solid #e5e5ea', borderRadius: '6px' }}>
				<Grid style={{ paddingLeft: 0, paddingRight: 0 }} fluid>
					<Col style={{ backgroundColor: 'aquamarine', paddingLeft: 0, paddingRight: 0 }} lg={6} xs={24}>
						<img
							alt=""
							style={{
								borderRight: '1px solid #e5e5ea',
								width: '48px',
								height: '48px',
								objectFit: 'cover'
							}}
							src={profileImageUrl}
						/>
					</Col>
					<Col style={{ paddingRight: 0, paddingLeft: 0 }} lg={18} xs={24}>
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
							<h3>{user.username}</h3>
						</div>
					</Col>
				</Grid>
			</div>
		</div>
	);
};

class AdminAboutController extends Component {
	state = {
		visible: false
	};
	componentDidMount() {
		this.current_sub_domain = this.props.uiStore.current_organisation.subDomain;
		this.getData();
	}
	getData = async () => {
		let ContentTeam_data = await this.props.appManager.executeQueryAuth('query', getRosterQuery, {
			rosterType: 'content_team',
			organisationId: this.props.uiStore.current_organisation.id
		});
		if (ContentTeam_data.allCombinedRosters.edges.length === 0) {
			ContentTeam_data = await this.props.appManager.executeQuery('mutation', createRosterQuery, {
				rosterType: 'content_team',
				organisationId: this.props.uiStore.current_organisation.id
			});
			this.current_roster_users =
				ContentTeam_data.createCombinedRoster.combinedRoster.combinedRosterIndividualsByRosterId.edges;
			this.current_roster = ContentTeam_data.createCombinedRoster.combinedRoster;
		} else {
			this.current_roster_users =
				ContentTeam_data.allCombinedRosters.edges[0].node.combinedRosterIndividualsByRosterId.edges;
			this.current_roster = ContentTeam_data.allCombinedRosters.edges[0].node;
		}
		const users = await this.props.appManager.executeQueryAuth('query', getOrganisationMembersQuery, {
			organisationId: this.props.uiStore.current_organisation.id
		});
		const edges = users.allOrganisationMembers.edges.slice(0);
		const s_array = [];
		this.current_roster_users.forEach((x) => {
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
		this.current_roster_users.forEach((p) => {
			t_array.push(<TeamUserComponent user={p.node.individualUserByIndividualId} />);
		});
		this.setState({
			target: t_array,
			source: s_array,
			visible: true
		});
	};
	handleUserSubmit = async (t) => {
        const add_array = [];
        const delete_array = [];
        t.forEach((u) => {
            const p = findIndex(this.current_roster_users, (o) => {
				return o.node.individualUserByIndividualId.id === u.props.user.id;
            });
            if (p === -1) {
                add_array.push(u.props.user);
            }
        });
        this.current_roster_users.forEach((u) => {
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
        for (let a in add_array) {          // eslint-disable-line
			const x = add_array[a];
            await this.props.appManager.executeQuery('mutation', createRosterUserQuery, { rosterId: this.current_roster.id, individualId: x.id });         // eslint-disable-line
        }
        for (let a in delete_array) {          // eslint-disable-line
			const x = delete_array[a];
            await this.props.appManager.executeQuery('mutation', deleteRosterUserQuery, { id: x.id });         // eslint-disable-line
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

        // here we calculate a list of id's to add or delete..
        // first found the add id's
    }

	render() {
		if (this.state.visible === false) {
			return null;
		}
		return (
			<div>
				<Panel bordered>
					<Grid fluid>
						<Col lg={11} xs={24}>
							<h3>Available Users</h3>
							<Container
								groupName="1"
								getChildPayload={(i) => this.state.source[i]}
								onDrop={(e) => this.setState({ source: applyDrag(this.state.source, e) })}
							>
								{this.state.source.map((p) => {
									return (
										<Draggable key={p.props.user.id}>
											<div className="draggable-item">{p}</div>
										</Draggable>
									);
								})}
							</Container>
						</Col>
						<Col lg={2} />
						<Col lg={11} xs={24}>
							<h3>Added Users</h3>
							<Container
								groupName="1"
								getChildPayload={(i) => this.state.target[i]}
								onDrop={(e) => this.setState({ target: applyDrag(this.state.target, e) })}
							>
								{this.state.target.map((p) => {
									return (
										<Draggable key={p.props.user.id}>
											<div className="draggable-item">{p}</div>
										</Draggable>
									);
								})}
							</Container>
						</Col>
					</Grid>
				</Panel>
				<IconButton
						onClick={() => { this.handleUserSubmit(this.state.target); }}
						appearance="primary"
						icon={<Icon icon="user" />}
						placement="right"
					>
						UPDATE CONTENT TEAM
					</IconButton>
			</div>
		);
	}
}

TeamUserComponent.propTypes = {
	user: PropTypes.object.isRequired
};

AdminAboutController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(AdminAboutController);

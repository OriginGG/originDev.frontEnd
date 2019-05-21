import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import {
	Button,
	Panel,
	Modal,
	Icon,
	IconButton,
	Grid,
	Col
} from 'rsuite';
import { createSponsorsQuery, getSponsorsQuery, deleteSponsorQuery } from '../../../../queries/sponsors';
import AdminSponsorBlockController from './AdminSponsorBlockController';
import open from './helpers/Notify';

class AdminSponsorController extends Component {
	state = {
		element_array: [],
        modal_open: false,
        modal_open2: false,
	};
	componentDidMount = async () => {
		this.grabSponsors();
	};

	grabSponsors = async () => {
		const sponsor_data = await this.props.appManager.executeQueryAuth('query', getSponsorsQuery, {
			organisationId: this.props.uiStore.current_organisation.id
		});
		const { nodes } = sponsor_data.allOrgSponsors;
		const p_array = [];
		nodes.forEach((n, i) => {
			let allow_delete = true;
			if (i < 4) {
				allow_delete = false;
			}
            p_array.push(<AdminSponsorBlockController allow_delete={allow_delete} handleDelete={this.deleteSponsor} sponsor={n} />);
		});
		this.setState({ element_array: p_array });
    };
    deleteSponsor = (sponsor) => {
        this.sponsor_id = sponsor.id;
        this.setState({ modal_open2: true });
    }
    deleteTheSponsor = async () => {
        this.setState({ modal_open2: false });
		await this.props.appManager.executeQueryAuth('mutation', deleteSponsorQuery, {
			id: this.sponsor_id
		});
        open('success', 'Sponsor Deleted!');
		this.grabSponsors();
	};
	openModal = () => {
		this.setState({ modal_open: true });
	};
	closeModal = () => {
		this.setState({ modal_open: false, modal_open2: false });
	};
	addNewSponsor = async () => {
		this.setState({ modal_open: false });
		await this.props.appManager.executeQueryAuth('mutation', createSponsorsQuery, {
			// eslint-disable-line
			organisationId: this.props.uiStore.current_organisation.id,
			imageUrl: 'https://res.cloudinary.com/origingg/image/upload/f_auto/v1548889692/logoSameColor.png',
			hrefLink: 'https://origin.gg',
			name: 'Origin.GG',
			description:
				'Building an Esports team is difficult. Recruiting players, practicing, and getting your teams to events is a full-time job. Allow us to handle the rest. Origin.gg makes it easy for you to set up a pro style organization.'
        });
        open('success', 'Sponsor Added!');
		this.grabSponsors();
	};
	render() {
		return (
			<div>
				<Modal backdrop="static" show={this.state.modal_open} onHide={this.closeModal} size="xs">
					<Modal.Body>
						<Icon
							icon="remind"
							style={{
								color: '#ffb300',
								fontSize: 24
							}}
						/>
						{'  '}
						Are you sure you want to add a new sponsor?
					</Modal.Body>
					<Modal.Footer>
						<Button
							onClick={() => {
								this.addNewSponsor();
							}}
							appearance="primary"
						>
							Ok
						</Button>
						<Button onClick={this.closeModal} appearance="subtle">
							Cancel
						</Button>
					</Modal.Footer>
                </Modal>{' '}
                <Modal backdrop="static" show={this.state.modal_open2} onHide={this.closeModal} size="xs">
					<Modal.Body>
						<Icon
							icon="remind"
							style={{
								color: '#ffb300',
								fontSize: 24
							}}
						/>
						{'  '}
						Are you sure you want to delete this sponsor?
					</Modal.Body>
					<Modal.Footer>
						<Button
							onClick={() => {
								this.deleteTheSponsor();
							}}
							appearance="primary"
						>
							Ok
						</Button>
						<Button onClick={this.closeModal} appearance="subtle">
							Cancel
						</Button>
					</Modal.Footer>
				</Modal>{' '}
				<Panel header={<h3>Current Sponsors</h3>} bordered>
					<div>
						<Grid fluid>
							<Col lg={24} xs={24}>
								<div style={{ height: 'calc(100vh - 340px)', overflowY: 'auto' }}>
									{this.state.element_array}
								</div>
							</Col>
						</Grid>
					</div>
				</Panel>
				<div>
					<IconButton
						onClick={this.openModal}
						appearance="primary"
						icon={<Icon icon="star" />}
						placement="right"
					>
						ADD SPONSOR
					</IconButton>
				</div>
			</div>
		);
	}
}

AdminSponsorController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(AdminSponsorController);

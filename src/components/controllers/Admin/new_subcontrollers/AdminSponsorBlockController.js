import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import injectSheet from 'react-jss';
// import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
// import axios from 'axios';
import {
	Button,
	ButtonToolbar,
	Panel,
	Form,
	FormGroup,
	FormControl,
	Uploader,
	Modal,
	Icon,
	// Uploader,
	ControlLabel,
	Notification,
	// HelpBlock,
	Grid,
	Col
} from 'rsuite';

import UploaderButton from './helpers/UploaderButton';
import blankImage from '../../../../assets/images/new_image_placeholder.png';
import { updateSponsorsQuery } from '../../../../queries/sponsors';

function open(funcName, description) {
	Notification[funcName]({
		title: funcName,
		description
	});
}

class AdminSponsorBlockController extends Component {
	state = {
		modal_open: false,
		file_list: [],
		file_list2: [],
		submit_disabled: true,
		visible: false,
		imageUrl: null,
		bgImages: null,
		input_values: {
			description: '', // eslint-disable-line
			name: '', // eslint-disable-line
			hrefLink: '' // eslint-disable-line
		}
	};
	componentDidMount = () => {
		const bgImages = this.props.sponsor.bgImages ? this.props.sponsor.bgImages : blankImage;
		this.setState(
			{
				visible: true,
				imageUrl: this.props.sponsor.imageUrl,
				input_values: {
					name: this.props.sponsor.name,
					description: this.props.sponsor.description,
					hrefLink: this.props.sponsor.hrefLink
				},
				bgImages
			},
			() => {
				this.previous_input_values = this.state.input_values;
			}
		);
	};
	handleFileChange = (value) => {
		this.file_mode = 0;
		this.setState({ file_list: value });
	};
	handleFileChange2 = (value) => {
		this.file_mode = 1;
		this.setState({ file_list2: value });
	};
	handleFileSuccess = (f) => {
		this.chooseFile(f);
	};
	handleFileError = (f) => {
		console.log(f);
	};
	chooseFile = (f) => {
		this.current_file = f;
		this.openModal();
	};
	confirmFile = async () => {
		this.setState({ modal_open: false });
		if (this.file_mode === 0) {
			await this.props.appManager.executeQueryAuth('mutation', updateSponsorsQuery, {
				id: this.props.sponsor.id,
				imageUrl: this.current_file.secure_url
			});
			this.setState({ imageUrl: this.current_file.secure_url });
			open('success', 'Image updated.');
		} else {
			await this.props.appManager.executeQueryAuth('mutation', updateSponsorsQuery, {
				id: this.props.sponsor.id,
				bgImages: this.current_file.secure_url
			});
			this.setState({ bgImages: this.current_file.secure_url });
			open('success', 'Image updated.');
		}
	};
	openModal = () => {
		this.setState({ modal_open: true });
	};
	closeModal = () => {
		this.setState({ file_list: [], file_list2: [], modal_open: false });
	};
	handleInputChange = (input_values) => {
		this.setState({ input_values }, () => {
			this.checkChange(this.state.input_values);
		});
	};
	checkChange = (input_values) => {
		let dis = true;
		for (const key in input_values) {
			if (input_values[key] !== this.previous_input_values[key]) {
				dis = false;
			}
		}
		this.setState({ submit_disabled: dis });
	};
	handleSubmit = async () => {
		await this.props.appManager.executeQueryAuth('mutation', updateSponsorsQuery, {
			id: this.props.sponsor.id,
			description: this.state.input_values.description,
			name: this.state.input_values.name,
			hrefLink: this.state.input_values.hrefLink
		});
		this.previous_input_values = this.state.input_values;
		this.setState({ submit_disabled: true });
		open('success', 'Sponsor Information Updated.');
	};
	render() {
		if (this.state.visible === false) {
			return null;
		}
		const formValue = this.state.input_values;
		const fn = `sponsor_fg_${this.props.sponsor.id}`;
		const fn_b = `sponsor_bg_${this.props.sponsor.id}`;
		const subDomain = `_${this.props.uiStore.current_organisation.id}_`;
		const theme = '';

		return (
			<div style={{ marginBottom: 8 }}>
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
						This will replace the current image. Are you sure you want to proceed?
					</Modal.Body>
					<Modal.Footer>
						<Button
							onClick={() => {
								this.confirmFile();
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
				<Panel bordered>
					<div>
						<Grid fluid>
							<Col lg={8} xs={24}>
								<img
									alt="sponsor"
									style={{ objectPosition: 'left', objectFit: 'contain', width: 150, height: 100 }}
									src={this.state.imageUrl}
								/>
								<Uploader
									toggleComponentClass={(props) => {
										return <UploaderButton ButtonText="Upload New Sponsor Image" {...props} />;
									}}
									accept="image/x-png,image/gif,image/jpeg"
									listType="picture-text"
									onSuccess={this.handleFileSuccess}
									onError={this.handleFileError}
									fileList={this.state.file_list}
									name="images"
									action={`${process.env
										.REACT_APP_API_SERVER}/c_upload?sub_domain=${subDomain}&theme=${theme}&force_name=${fn}`}
									onChange={this.handleFileChange}
								/>
							</Col>
							<Col lg={8} xs={24}>
								<img
									alt="sponsor_bg"
									style={{ objectPosition: 'left', objectFit: 'contain', width: 300, height: 100 }}
									src={this.state.bgImages}
								/>
								<Uploader
									toggleComponentClass={(props) => {
										return <UploaderButton ButtonText="Upload New Sponsor BG Image" {...props} />;
									}}
									accept="image/x-png,image/gif,image/jpeg"
									listType="picture-text"
									onSuccess={this.handleFileSuccess}
									onError={this.handleFileError}
									fileList={this.state.file_list2}
									name="images"
									action={`${process.env
										.REACT_APP_API_SERVER}/c_upload?sub_domain=${subDomain}&theme=${theme}&force_name=${fn_b}`}
									onChange={this.handleFileChange2}
								/>
							</Col>
							<Col lg={8} xs={24}>
								<div>
									<Form
										style={{ paddingBottom: 0, marginBottom: 0 }}
										formValue={formValue}
										onChange={this.handleInputChange}
										fluid
									>
										<FormGroup>
											<ControlLabel>Name</ControlLabel>
											<FormControl name="name" />
											<ControlLabel>Link</ControlLabel>
											<FormControl name="hrefLink" />
											<ControlLabel>Description</ControlLabel>
											<FormControl rows={5} componentClass="textarea" name="description" />
										</FormGroup>
									</Form>
									<ButtonToolbar>
										<Button
											size="xs"
											disabled={this.state.submit_disabled}
											onClick={this.handleSubmit}
											appearance="primary"
										>
											Submit
										</Button>
										{this.props.allow_delete && (
											<Button
												style={{ float: 'right' }}
												size="xs"
												onClick={() => {
													this.props.handleDelete(this.props.sponsor);
												}}
												color="red"
											>
												Delete
											</Button>
										)}
									</ButtonToolbar>
								</div>
							</Col>
						</Grid>
					</div>
				</Panel>
			</div>
		);
	}
}

AdminSponsorBlockController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	handleDelete: PropTypes.func.isRequired,
	appManager: PropTypes.object.isRequired,
	sponsor: PropTypes.object.isRequired,
	allow_delete: PropTypes.bool.isRequired
};

export default inject('uiStore', 'appManager')(AdminSponsorBlockController);

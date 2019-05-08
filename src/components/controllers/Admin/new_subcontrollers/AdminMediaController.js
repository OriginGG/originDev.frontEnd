import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import injectSheet from 'react-jss';
// import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import {
	Panel,
	Form,
	FormGroup,
	FormControl,
    ControlLabel,
    Button,
	ButtonToolbar,
	Icon,
	Notification,
	// HelpBlock,
	Grid,
	Col
} from 'rsuite';
import {
	getYouTubeChannelsQuery,
	updateYouTubeChannelQuery,
	createYouTubeChannelQuery
} from '../../../../queries/youtube_channels';

function open(funcName, description) {
	Notification[funcName]({
		title: funcName,
		description
	});
}

class AdminMediaController extends Component {
	state = {
		input_values: {
			link1_value: '',
			link2_value: '',
			link3_value: '',
			link4_value: ''
		}
	};
	componentDidMount = async () => {
		this.create = false;
		const youTubeChannels = await this.props.appManager.executeQueryAuth('query', getYouTubeChannelsQuery, {
			organisationId: this.props.uiStore.current_organisation.id
		});
		if (youTubeChannels.resultData.edges.length === 0) {
			this.create = true;
		} else {
			this.c_id = youTubeChannels.resultData.edges[0].node.id;
			this.setState({
				input_values: {
					link1_value: youTubeChannels.resultData.edges[0].node.youtubeVideo1,
					link2_value: youTubeChannels.resultData.edges[0].node.youtubeVideo2,
					link3_value: youTubeChannels.resultData.edges[0].node.youtubeVideo3,
					link4_value: youTubeChannels.resultData.edges[0].node.youtubeVideo4
				}
			});
		}
	};

	handleChange = (field, e) => {
		const v = e.target.value;
		const p = this.state.input_values;
		p[field] = v;
		this.setState({
			input_values: p
		});
	};

	isURL = (str) => {
		// console.log(`string is ${str}`);
		return str.includes('http');
	};

	handleSubmit = async () => {
		if (!this.isURL(this.state.input_values.link1_value) && this.state.input_values.link1_value) {
			open('error', 'Link 1 is not a valid URL');
			return;
		}
		if (!this.isURL(this.state.input_values.link2_value) && this.state.input_values.link2_value) {
			open('error', 'Link 1 is not a valid URL');
			return;
		}
		if (!this.isURL(this.state.input_values.link3_value) && this.state.input_values.link3_value) {
			open('error', 'Link 1 is not a valid URL');
			return;
		}
		if (!this.isURL(this.state.input_values.link4_value) && this.state.input_values.link4_value) {
			open('error', 'Link 1 is not a valid URL');
			return;
		}
		if (this.create) {
			await this.props.appManager.executeQueryAuth('mutation', createYouTubeChannelQuery, {
				organisationId: this.props.uiStore.current_organisation.id,
				link1: this.state.input_values.link1_value,
				link2: this.state.input_values.link2_value,
				link3: this.state.input_values.link3_value,
				link4: this.state.input_values.link4_value
			});
			open('success', 'Media Updated!');
		} else {
			await this.props.appManager.executeQueryAuth('mutation', updateYouTubeChannelQuery, {
				id: this.c_id,
				link1: this.state.input_values.link1_value,
				link2: this.state.input_values.link2_value,
				link3: this.state.input_values.link3_value,
				link4: this.state.input_values.link4_value
			});
			open('success', 'Media Updated!');
		}
	};
	render() {
		const formValue = this.state.input_values;
		return (
			<div>
				<Panel
					header={
						<div style={{ display: 'flex' }}>
							<h3>Add YouTube Video Links</h3> <Icon style={{ marginLeft: 8 }} icon="youtube" size="lg" />
						</div>
					}
					bordered
				>
					<Grid fluid>
						<Col lg={12} xs={24}>
							<div>
								<Form
									style={{ paddingBottom: 0, marginBottom: 0 }}
									formValue={formValue}
									onChange={(input_values) => {
										console.log();
										this.setState({ input_values });
									}}
									fluid
								>
									<FormGroup>
										<ControlLabel>Link 1</ControlLabel>
										<FormControl name="link1_value" />
									</FormGroup>
									<FormGroup>
										<ControlLabel>Link 2</ControlLabel>
										<FormControl name="link2_value" />
									</FormGroup>
								</Form>
							</div>
						</Col>
						<Col lg={12} xs={24}>
							<div>
								<Form
									style={{ paddingBottom: 0, marginBottom: 0 }}
									formValue={formValue}
									onChange={(input_values) => {
										console.log();
										this.setState({ input_values });
									}}
									fluid
								>
									<FormGroup>
										<ControlLabel>Link 3</ControlLabel>
										<FormControl name="link3_value" />
									</FormGroup>
									<FormGroup>
										<ControlLabel>Link 4</ControlLabel>
										<FormControl name="link4_value" />
									</FormGroup>
								</Form>
							</div>
						</Col>
					</Grid>
                </Panel>
                <div style={{ marginTop: 8, textAlign: 'center' }}>
					<ButtonToolbar>
						<Button onClick={this.handleSubmit} appearance="primary">
							Submit
						</Button>
						<Button appearance="default">Cancel</Button>
					</ButtonToolbar>
				</div>

				{/* <OrganizationAdminMediaComponentRender
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    link1_value={this.state.input_values.link1_value}
                    link2_value={this.state.input_values.link2_value}
                    link3_value={this.state.input_values.link3_value}
                    link4_value={this.state.input_values.link4_value}
                /> */}
			</div>
		);
	}
}

AdminMediaController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(AdminMediaController);

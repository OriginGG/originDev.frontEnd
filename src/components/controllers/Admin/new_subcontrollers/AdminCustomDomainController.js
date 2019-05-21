import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { inject } from 'mobx-react';
import {
	// Button,
	// ButtonToolbar,
	Panel,
	Form,
	FormGroup,
	FormControl,
	// Modal,
	Icon,
	IconButton,
	// Uploader,
	ControlLabel,
	// Notification,
	// HelpBlock,
	Grid,
	Col
} from 'rsuite';

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
import open from './helpers/Notify';

const CheckIsValidDomain = (domain) => {
	const re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/); // eslint-disable-line
	return domain.match(re);
};

class AdminCustomDomainController extends Component {
	state = {
		visible: false,
		sent: false,
		input_values: {
			domain_name: ''
		}
	};
	componentDidMount() {
		this.current_sub_domain = this.props.uiStore.current_organisation.subDomain;
		this.setState({
			visible: true
		});
	}
	handleSubmit = async () => {
		if (!CheckIsValidDomain(this.state.input_values.domain_name)) {
			open('error', "That doesn't appear to be a valid domain name, please check the name you supplied!");
		} else {
			const o = this.props.uiStore.current_organisation;
			const payload = {
				text: `*Organization:* ${o.name}\n*Domain Request name:* ${this.state.input_values.domain_name}\n*Owner Email:* ${o
					.usersByOrganisationId.edges[0].node.email}\n`
			};
			axios.post(process.env.REACT_APP_SLACK_NEW_PRODUCT_WEBHOOK, JSON.stringify(payload), {
				withCredentials: false,
				transformRequest: [
					(data, headers) => {
						delete headers.post['Content-Type']; // eslint-disable-line
						return data;
					}
				]
			});
			const full_url = `${process.env.REACT_APP_API_SERVER}/emails/request_custom_domain`;
			await axios.post(
				full_url,
				{
					payload: o
				},
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			this.setState({ sent: true });
		}
	}
	render() {
		const formValue = this.state.input_values;
		if (this.state.visible === false) {
			return null;
		}
		return (
			<div>
				<Panel header={<h3>Send Domain Request</h3>} bordered>
					<Grid fluid>
						<Col lg={12} xs={24}>
							As a subscribed member you can request a custom domain be linked to your Organizations page. Simply enter the domain name you wish to use, and this will send a support request to our team. Once we have received your request, our team will contact you via email to begin the process.
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
										<ControlLabel>Domain Name</ControlLabel>
										<FormControl name="domain_name" />
									</FormGroup>
								</Form>
								{this.state.sent &&
									<h2>Request Sent!</h2>
								}
								{!this.state.sent &&
									<IconButton
										disabled={this.state.sent}
										style={{ marginTop: 40 }}
										onClick={() => {
											this.handleSubmit();
										}}
										appearance="primary"
										icon={<Icon icon="arrow-right" />}
										placement="right"
									>
										SEND DOMAIN REQUEST
								</IconButton>
								}
							</div>
						</Col>
					</Grid>
				</Panel>
			</div>
		);
	}
}

AdminCustomDomainController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	// appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(AdminCustomDomainController);

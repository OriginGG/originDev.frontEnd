import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import {
	// Button,
	// ButtonToolbar,
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

class AdminAboutController extends Component {
	state = {
		visible: false
	};
	componentDidMount() {
		this.current_sub_domain = this.props.uiStore.current_organisation.subDomain;
		this.setState({
			visible: true
		});
	}
	render() {
		if (this.state.visible === false) {
			return null;
		}
		return (
			<div>
				<Panel header={<h3>Template</h3>} bordered>
					<Grid fluid>
						<Col lg={12} xs={24}>
							Placeholder
						</Col>
					</Grid>
				</Panel>
			</div>
		);
	}
}

AdminAboutController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	// appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(AdminAboutController);

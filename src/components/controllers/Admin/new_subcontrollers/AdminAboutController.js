import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import {
	Button,
	ButtonToolbar,
	Panel,
	Form,
	FormGroup,
	FormControl,
	// Modal,
	// Icon,
	// Uploader,
	ControlLabel,
	// Notification,
	// HelpBlock,
	Grid,
	Col,
	Row
} from 'rsuite';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import open from './helpers/Notify';

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

import { getPagesQuery, updatePageQuery } from '../../../../queries/pages';

const setEditorReference = (ref) => {
	if (ref) {
		ref.focus();
	}
};

class AdminAboutController extends Component {
	state = {
		submit_disabled: true,
		visible: false,
		aboutPageInfo: null,
		editorState: EditorState.createEmpty()
	};
	componentDidMount = async () => {
		this.current_sub_domain = this.props.uiStore.current_organisation.subDomain;
		await this.calcRows();
		this.setState({
			visible: true
		});
	};
	calcRows = async () => {
		const pages = await this.props.appManager.executeQuery('query', getPagesQuery, {
			organisationId: this.props.uiStore.current_organisation.id
		});
		const { edges } = pages.allPages;
		const contentBlock = htmlToDraft(edges[0].node.pageContent);
		const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
		const editorState = EditorState.createWithContent(contentState);
		this.setState({ aboutPageInfo: edges[0].node, editorState });
		this.previous_input_values = edges[0].node;
	};
	handleQuillChange = (editorState) => {
		const page_content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
		const { aboutPageInfo } = this.state;
		const p = Object.assign({}, aboutPageInfo);
		p.pageContent = page_content;
		this.setState(
			{
				editorState,
				aboutPageInfo: p
			},
			() => {
				this.checkChange(this.state.aboutPageInfo);
			}
		);
	};
	// handleQuillChange = (value) => {
	// 	const { aboutPageInfo } = this.state;
	// 	const p = Object.assign({}, aboutPageInfo);
	// 	p.pageContent = value;
	// 	this.setState({ aboutPageInfo: p }, () => {
	// 		this.checkChange(this.state.aboutPageInfo);
	// 	});
	// };
	handleSubmit = async () => {
		await this.props.appManager.executeQueryAuth('mutation', updatePageQuery, {
			id: this.state.aboutPageInfo.id,
			pageContent: this.state.aboutPageInfo.pageContent,
			pageTitle: this.state.aboutPageInfo.pageTitle,
			pageSubtitle: this.state.aboutPageInfo.pageSubtitle
		});
		open('success', 'About page updated');
		this.setState({ submit_disabled: true });
		this.calcRows();
	};
	handleInputChange = (aboutPageInfo) => {
		this.setState({ aboutPageInfo }, () => {
			this.checkChange(this.state.aboutPageInfo);
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

	render() {
		if (this.state.visible === false) {
			return null;
		}
		const formValue = this.state.aboutPageInfo;
		const { editorState } = this.state;
		return (
			<div>
				<Panel bordered>
					<Grid fluid>
						<Row>
							<Col lg={24} xs={24}>
								<div>
									<Form
										style={{ paddingBottom: 0, marginBottom: 0 }}
										formValue={formValue}
										onChange={this.handleInputChange}
										fluid
									>
										<FormGroup>
											<ControlLabel>Title</ControlLabel>
											<FormControl name="pageTitle" />
											<ControlLabel>Sub Title</ControlLabel>
											<FormControl name="pageSubtitle" />
										</FormGroup>
									</Form>
								</div>
							</Col>
						</Row>
						<Row>
							<Col lg={24} xs={24}>
								<div id="quill_container">
									<Editor
										placeholder="Enter Some Text..."
										editorRef={setEditorReference}
										editorState={editorState}
										wrapperClassName="demo-wrapper"
										editorClassName="demo-editor"
										onEditorStateChange={this.handleQuillChange}
									/>
								</div>
							</Col>
						</Row>
						<ButtonToolbar>
							<Button
								size="xs"
								disabled={this.state.submit_disabled}
								onClick={this.handleSubmit}
								appearance="primary"
							>
								Submit
							</Button>
						</ButtonToolbar>
					</Grid>
				</Panel>
			</div>
		);
	}
}

AdminAboutController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(AdminAboutController);

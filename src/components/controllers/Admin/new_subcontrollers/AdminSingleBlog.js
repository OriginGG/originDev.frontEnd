import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import ReactQuill from 'react-quill';

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
	Uploader,
	ControlLabel,
	// Notification,
	// HelpBlock,
	Grid,
	Row,
	Col
} from 'rsuite';

import { createBlogPostQuery, updateBlogPostQuery } from '../../../../queries/blogs';
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
import UploaderButton from './helpers/UploaderButton';
import blankImage from '../../../../assets/images/new_image_placeholder.png';

class AdminSingleBlog extends Component {
	state = {
		visible: false,
		input_values: {
			blog_title: ''
		},
		blog_content: null, // eslint-disable-line
		blog_image: null,
		file_list: []
	};
	componentDidMount() {
		this.current_sub_domain = this.props.uiStore.current_organisation.subDomain;
		if (this.props.blog) {
			this.setState({
				visible: true,
				input_values: {
					blog_title: this.props.blog.blogTitle
				},
				blog_content: this.props.blog.blogContent,
				blog_image: this.props.blog.blogMedia
			});
		}
		this.setState({ visible: true });
	}
	handleFileChange = (value) => {
		this.setState({ file_list: value });
	};
	handleFileSuccess = (f) => {
		this.setState({ file_list: [], blog_image: f.secure_url });
	};
	handleFileError = (f) => {
		console.log(f);
	};
	handleQuillChange = (blog_content) => {
		this.setState({ blog_content });
	};
	handleSubmit = async () => {
		if (!this.state.input_values.blog_title) {
			open('error', 'You must supply a title!');
			return;
		}
		if (!this.props.blog) {
			await this.props.appManager.executeQueryAuth('mutation', createBlogPostQuery, {
				organisationId: this.props.uiStore.current_organisation.id,
				blogTitle: this.state.input_values.blog_title,
				blogContent: this.state.blog_content,
				blogMedia: this.state.blog_image
			});
			open('success', 'Blog Added');
		} else {
			await this.props.appManager.executeQueryAuth('mutation', updateBlogPostQuery, {
				id: this.props.blog.id,
				blogTitle: this.state.input_values.blog_title,
				blogContent: this.state.blog_content,
				blogMedia: this.state.blog_image
			});
			open('success', 'Blog Updated');
		}
		this.props.handleBack();
	};
	render() {
		if (this.state.visible === false) {
			return null;
		}
		const theme = '';
		const formValue = this.state.input_values;
		const image_src = this.state.blog_image ? this.state.blog_image : blankImage;
		const btext = !this.props.blog ? 'ADD BLOG' : 'UPDATE BLOG';
		return (
			<div>
				<Panel header={<h3>Blog</h3>} bordered>
					<Grid fluid>
						<Col lg={24} xs={24}>
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
									<ControlLabel>Title</ControlLabel>
									<FormControl name="blog_title" />
								</FormGroup>
							</Form>
						</Col>
						<Col lg={12} xs={24}>
							<div
								style={{
									textAlign: 'center',
									minHeight: 200,
									display: 'flex',
									alignItems: 'center'
								}}
							>
								<img
									src={image_src}
									alt=""
									style={{
										backgroundSize: 'contain',
										backgroundRepeat: 'no-repeat',
										maxHeight: 200,
										maxWidth: 372
									}}
								/>
							</div>
						</Col>
						<Col lg={12} xs={24}>
							<ControlLabel>Media</ControlLabel>
							<Uploader
								toggleComponentClass={(props) => {
									return <UploaderButton ButtonText="Upload Media" {...props} />;
								}}
								accept="image/x-png,image/gif,image/jpeg"
								listType="picture-text"
								onSuccess={this.handleFileSuccess}
								onError={this.handleFileError}
								fileList={this.state.file_list}
								name="images"
								action={`${process.env.REACT_APP_API_SERVER}/c_upload?sub_domain=${this
									.current_sub_domain}&theme=${theme}`}
								onChange={this.handleFileChange}
							/>
						</Col>
						<Col style={{ marginTop: 16 }} lg={24} xs={24}>
							<ControlLabel>Content</ControlLabel>
							<ReactQuill
								modules={{
									clipboard: {
										matchVisual: false
									}
								}}
								theme="snow"
								value={this.state.blog_content}
								onChange={this.handleQuillChange}
							/>
						</Col>
						<Row>
							<Col style={{ marginTop: 16 }} lg={24} xs={24}>
								<IconButton
									style={{ marginTop: 40 }}
									onClick={() => {
										this.handleSubmit();
									}}
									appearance="primary"
									icon={<Icon icon="flag" />}
									placement="right"
								>
									{btext}
								</IconButton>
								<IconButton
									style={{ float: 'right', marginTop: 40 }}
									onClick={() => {
										this.props.handleBack();
									}}
									appearance="secondary"
									icon={<Icon icon="arrow-left" />}
									placement="right"
								>
									GO BACK
								</IconButton>
							</Col>
						</Row>
					</Grid>
				</Panel>
			</div>
		);
	}
}

AdminSingleBlog.propTypes = {
	uiStore: PropTypes.object.isRequired,
	blog: PropTypes.object,
	handleBack: PropTypes.func.isRequired,
	appManager: PropTypes.object.isRequired
};

AdminSingleBlog.defaultProps = {
	blog: null
};

export default inject('uiStore', 'appManager')(AdminSingleBlog);

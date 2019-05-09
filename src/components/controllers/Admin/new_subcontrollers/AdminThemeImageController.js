import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import ReactSwipe from 'react-swipe';

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
	Icon,
	// Icon,
	Notification,
	Uploader,
	// HelpBlock,
	Grid,
	Col,
	Row
} from 'rsuite';

import { updateOrganisationQuery } from '../../../../queries/organisation';
import imagePlaceholder from '../../../../assets/images/new_image_placeholder.png';

const slide_array = [
	{
		src: 'https://res.cloudinary.com/origingg/image/upload/f_auto/v1548889070/section1-bg1.jpg'
	},
	{
		src: 'https://res.cloudinary.com/origingg/image/upload/f_auto/v1548889158/section1-bg2.jpg'
	},
	{
		src: 'https://res.cloudinary.com/origingg/image/upload/f_auto/v1548889175/section1-bg3.jpg'
	}
];

function open(funcName, description) {
	Notification[funcName]({
		title: funcName,
		description
	});
}
class AdminThemeImageController extends Component {
	state = {
		current_slide_src: slide_array[0],
		galleryItems: [],
		visible: false,
		file_list: [],
		modal_open: false
	};

	componentDidMount = () => {
		const galleryItems = [];
		slide_array.forEach((s, i) => {
			galleryItems.push(
				<img
					style={{
						display: 'block',
						marginLeft: 'auto',
						marginRight: 'auto',
						maxHeight: 300
					}}
					alt="test"
					key={`i_${i}`}
					src={s.src}
				/>
			);
		});
		this.setState({
			image_src: this.props.image_src,
			current_slide_src: slide_array[0],
			galleryItems,
			visible: true
		});
	};
	componentWillReceiveProps = (newProps) => {
		if (newProps.image_src !== this.props.image_src) {
			this.setState({ image_src: newProps.image_src });
		}
	};
	responsive = {
		0: { items: 1 },
		1024: { items: 4 }
	};
	handleSubmit = async () => {
		// if (this.new_theme !== this.selected_theme) {
		await this.props.appManager.executeQueryAuth('mutation', updateOrganisationQuery, {
			id: this.props.uiStore.current_organisation.id,
			themeId: this.state.current_slide_src.theme_variant,
			themeBaseId: this.state.current_slide_src.theme_name
		});
		this.props.uiStore.current_organisation.themeId = this.state.current_slide_src.theme_variant;
		this.props.uiStore.current_organisation.themeBaseId = this.state.current_slide_src.theme_name;
		open('success', 'Theme chosen !');
		// }
	};
	slideCallBack = (e) => {
		this.setState({ current_slide_src: slide_array[e] });
	};
	handleFileChange = (value) => {
		this.setState({ file_list: value });
	};
	handleFileSuccess = (f) => {
		this.chooseFile(f);
	};
	handleFileError = (f) => {
		console.log(f);
	};
	confirmPreset = async () => {
		this.closeModal();
		await this.props.fileCallBack(this.current_file);
		this.setState({ file_list: [] });
	};
	chooseFile = (f) => {
		this.current_file = f;
		this.openModal();
	};
	openModal = () => {
		this.setState({ modal_open: true });
	};
	closeModal = () => {
		this.setState({ file_list: [], modal_open: false });
	};
	render() {
		if (this.state.visible === false) {
			return null;
		}
		const image_src = this.state.image_src ? this.state.image_src : imagePlaceholder;
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
						This will replace the current image. Are you sure you want to proceed?
					</Modal.Body>
					<Modal.Footer>
						<Button
							onClick={() => {
								this.confirmPreset();
							}}
							appearance="primary"
						>
							Ok
						</Button>
						<Button onClick={this.closeModal} appearance="subtle">
							Cancel
						</Button>
					</Modal.Footer>
				</Modal>
				<Panel header={<h3>{this.props.title}</h3>} bordered>
					<Grid fluid>
						<Col lg={6} xs={24}>
							<Panel bordered>
								<ReactSwipe
									className="carousel"
									swipeOptions={{
										continuous: true,
										callback: this.slideCallBack
									}}
									ref={(el) => (this.reactSwipeEl = el)} // eslint-disable-line
								>
									{this.state.galleryItems}
								</ReactSwipe>
								<ButtonToolbar style={{ textAlign: 'center', marginTop: 12 }}>
									<IconButton
										onClick={() => this.reactSwipeEl.prev()}
										icon={<Icon icon="arrow-left" />}
										placement="left"
									/>
									<IconButton
										onClick={() => this.reactSwipeEl.next()}
										icon={<Icon icon="arrow-right" />}
										placement="right"
									/>
								</ButtonToolbar>
								<ButtonToolbar style={{ textAlign: 'center', marginTop: 8 }}>
									<Button
										size="xs"
										appearance="primary"
										onClick={() => {
											this.chooseFile({ secure_url: this.state.current_slide_src.src });
										}}
									>
										Choose Preset
									</Button>
								</ButtonToolbar>
							</Panel>
						</Col>
						<Col lg={18} xs={24}>
							<Panel bordered>
								<div style={{ minHeight: 200 }}>
									<Grid fluid>
										<Row>
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
														alt="jumbotron"
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
												<div
													style={{
														minHeight: 200,
														display: 'flex',
														alignItems: 'center'
													}}
												>
													<Uploader
														accept="image/x-png,image/gif,image/jpeg"
														listType="picture-text"
														onSuccess={this.handleFileSuccess}
														onError={this.handleFileError}
														fileList={this.state.file_list}
														action={`http://127.0.0.1:3333/c_upload?sub_domain=${this.props
															.uiStore.current_organisation
															.subDomain}&theme=enigma&force_name=sponsor`}
														onChange={this.handleFileChange}
													/>
												</div>
											</Col>
										</Row>
									</Grid>
								</div>
							</Panel>
						</Col>
					</Grid>
				</Panel>
			</div>
		);
	}
}

AdminThemeImageController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	appManager: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	image_src: PropTypes.string.isRequired,
	fileCallBack: PropTypes.func.isRequired
};

export default inject('uiStore', 'appManager')(AdminThemeImageController);
